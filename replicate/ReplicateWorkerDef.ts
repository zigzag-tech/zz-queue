import Replicate from "replicate";
import { ZZJobSpec } from "../core/microworkers/ZZJobSpec";
import { z } from "zod";
import { ZZWorkerDef } from "../core/microworkers/ZZWorker";
import { ZZEnv } from "../core/microworkers/ZZEnv";
if (!process.env.REPLICATE_API_TOKEN) {
  throw new Error("REPLICATE_API_TOKEN not found");
}

const TIMEOUT_IN_SECONDS = 60 * 15; // 15 minutes

export class ReplicateWorkerDef<P extends object, O> extends ZZWorkerDef<
  P,
  unknown,
  { default: O }
> {
  protected _endpoint: `${string}/${string}:${string}`;
  public jobSpec: ZZJobSpec<P, unknown, { default: O }>;
  constructor({
    endpoint,
    concurrency = 3,
    input,
    output,
    zzEnv,
  }: {
    input: z.ZodType<P>;
    output: z.ZodType<O>;
    endpoint: `${string}/${string}:${string}`;
    concurrency?: number;
    zzEnv: ZZEnv;
  }) {
    const jobSpec = new ZZJobSpec({
      name: endpoint,
      jobParamsDef: input,
      output: {
        default: output,
      },
    });

    super({
      jobSpec,
      concurrency,
      processor: async ({ jobParams }) => {
        const replicate = new Replicate({
          auth: process.env.REPLICATE_API_TOKEN,
        });
        const repR = replicate.run(this._endpoint, {
          input: jobParams,
        }) as Promise<unknown> as Promise<O>;

        const result = await Promise.race([
          repR,
          timeout(TIMEOUT_IN_SECONDS * 1000),
        ]);

        if (!result) {
          throw new Error(
            `no result returned from replicate endpoint: ${this._endpoint}`
          );
        }

        return result;
      },
    });
    this.jobSpec = jobSpec;
    this._endpoint = endpoint;
  }
}

function timeout(timeoutInMilliseconds: number) {
  return new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), timeoutInMilliseconds)
  );
}