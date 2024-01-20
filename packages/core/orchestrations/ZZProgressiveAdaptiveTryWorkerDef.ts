import { CheckSpec, ZZJobSpec } from "../jobs/ZZJobSpec";
import { ZZWorkerDef } from "../jobs/ZZWorker";
import { z } from "zod";
import _ from "lodash";
import { InferStreamSetType } from "@livestack/shared/StreamDefSet";
import { ZZEnv } from "../jobs/ZZEnv";
export interface AttemptDef<ParentP, ParentO, P, OMap> {
  jobSpec: ZZJobSpec<P, unknown, OMap>;
  timeout: number;
  transformInput: (params: ParentP) => Promise<P> | P;
  transformOutput: <K extends keyof OMap>(
    // TODO: fix this type
    // output: OMap[K]
    output: any
  ) => Promise<ParentO> | ParentO;
}

export class ZZProgressiveAdaptiveTryWorkerDef<
  ParentP,
  ParentO,
  Specs
> extends ZZWorkerDef<ParentP, { default: {} }, { default: ParentO }> {
  attempts: {
    [K in keyof Specs]: AttemptDef<
      ParentP,
      ParentO,
      z.infer<CheckSpec<Specs[K]>["jobOptions"]>,
      InferStreamSetType<CheckSpec<Specs[K]>["outputDefSet"]>
    >;
  };
  constructor({
    zzEnv,
    attempts,
    ultimateFallback,
    jobSpec,
  }: {
    zzEnv?: ZZEnv;
    jobSpec: ZZJobSpec<ParentP, { default: {} }, { default: ParentO }>;
    attempts: {
      [K in keyof Specs]: AttemptDef<
        ParentP,
        ParentO,
        z.infer<CheckSpec<Specs[K]>["jobOptions"]>,
        InferStreamSetType<CheckSpec<Specs[K]>["outputDefSet"]>
      >;
    };
    ultimateFallback?: () => Promise<ParentO>;
  }) {
    super({
      jobSpec,
      zzEnv,
      processor: async ({ logger, jobOptions, jobId }) => {
        const genRetryFunction = <P, O>({
          jobSpec,
          transformInput,
          transformOutput,
        }: AttemptDef<ParentP, ParentO, P, O>) => {
          const fn = async () => {
            const childJobId = `${jobId}/${jobSpec.name}`;

            const jo = await jobSpec.enqueueJob({
              jobId: childJobId,
              jobOptions: await transformInput(jobOptions),
            });

            const o = await jo.output.nextValue();
            if (!o) {
              throw new Error("no output");
            }

            const result = await transformOutput(o);

            return {
              timeout: false as const,
              error: false as const,
              result,
            };
          };
          return fn;
        };

        const restToTry = (
          attempts as AttemptDef<ParentP, ParentO, any, any>[]
        ).map((a) => ({
          fn: genRetryFunction(a),
          timeout: a.timeout,
          name: a.jobSpec.name,
        }));

        let promises: {
          promise: Promise<
            | Awaited<ReturnType<(typeof restToTry)[0]["fn"]>>
            | { error: true; timeout: false }
          >;
          timeout: number;
        }[] = [];

        while (restToTry.length > 0) {
          const m = restToTry.shift()!;
          logger.info(
            `Trying ${m.name}(${restToTry.length} more to attempt)...`
          );
          promises.push({
            promise: m.fn().catch((e) => {
              console.log(e);

              logger.warn("");
              return {
                timeout: false,
                error: true as const,
              };
            }),
            timeout: m.timeout,
          });

          const r = await Promise.race([
            ...promises.map((p) => p.promise),
            genTimeoutPromise(m.timeout),
          ]);
          if (!r.timeout && !r.error) {
            return r.result;
          } else if (r.timeout) {
            logger.info(`Timeout for ${m.name}. Moving on...`);
          }
        }

        if (ultimateFallback) {
          return await ultimateFallback();
        } else {
          throw new Error("All retries failed.");
        }
      },
    });

    this.attempts = attempts;
  }
}

export const genTimeoutPromise = async (timeout: number) => {
  const timeoutPromise = new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
  await timeoutPromise;
  return { timeout: true as const, error: false as const };
};