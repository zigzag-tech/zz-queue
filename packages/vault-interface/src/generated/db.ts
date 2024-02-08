/* eslint-disable */
import type { CallContext, CallOptions } from "nice-grpc-common";
import _m0 from "protobufjs/minimal";
import { Any } from "./google/protobuf/any";
import { Empty } from "./google/protobuf/empty";
import { Struct } from "./google/protobuf/struct";
import { Timestamp } from "./google/protobuf/timestamp";

export const protobufPackage = "livestack";

export interface JobRec {
  project_id: string;
  /** Align with jobs.ts */
  spec_name: string;
  job_id: string;
  time_created: Date | undefined;
  job_params: { [key: string]: any } | undefined;
}

export interface GetJobRecRequest {
  projectId: string;
  specName: string;
  jobId: string;
}

export interface JobRecAndStatus {
  rec: JobRec | undefined;
  status: string;
}

export interface GetJobRecResponse {
  /** The actual response data */
  rec?:
    | JobRecAndStatus
    | undefined;
  /** Signal that the response is null */
  null_response?: Empty | undefined;
}

export interface GetZZJobTestRequest {
  id: string;
}

export interface GetZZJobTestResponse {
  projectId: string;
  pipeName: string;
  jobId: string;
}

export interface EnsureStreamRecRequest {
  project_id: string;
  stream_id: string;
}

export interface EnsureJobStreamConnectorRecRequest {
  project_id: string;
  stream_id: string;
  job_id: string;
  key: string;
  connector_type: string;
}

export interface GetJobStreamConnectorRecsRequest {
  project_id: string;
  job_id: string;
  key: string;
  connector_type: string;
}

export interface JobStreamConnectorRecord {
  project_id: string;
  job_id: string;
  time_created: Date | undefined;
  stream_id: string;
  key: string;
  connector_type: string;
}

export interface GetJobDatapointsRequest {
  project_id: string;
  pipe_name: string;
  job_id: string;
  io_type: string;
  order: string;
  limit: number;
  key: string;
}

export interface DatapointRecord {
  datapoint_id: string;
  data: { [key: string]: any } | undefined;
}

export interface JobInfo {
  job_id: string;
  job_output_key: string;
}

export interface AddDatapointRequest {
  project_id: string;
  stream_id: string;
  datapoint_id: string;
  job_info: JobInfo | undefined;
  data: Any | undefined;
}

export interface AddDatapointResponse {
  datapoint_id: string;
}

function createBaseJobRec(): JobRec {
  return { project_id: "", spec_name: "", job_id: "", time_created: undefined, job_params: undefined };
}

export const JobRec = {
  encode(message: JobRec, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.project_id !== "") {
      writer.uint32(10).string(message.project_id);
    }
    if (message.spec_name !== "") {
      writer.uint32(18).string(message.spec_name);
    }
    if (message.job_id !== "") {
      writer.uint32(26).string(message.job_id);
    }
    if (message.time_created !== undefined) {
      Timestamp.encode(toTimestamp(message.time_created), writer.uint32(34).fork()).ldelim();
    }
    if (message.job_params !== undefined) {
      Struct.encode(Struct.wrap(message.job_params), writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JobRec {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJobRec();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.project_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.spec_name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.job_id = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.time_created = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.job_params = Struct.unwrap(Struct.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): JobRec {
    return {
      project_id: isSet(object.project_id) ? globalThis.String(object.project_id) : "",
      spec_name: isSet(object.spec_name) ? globalThis.String(object.spec_name) : "",
      job_id: isSet(object.job_id) ? globalThis.String(object.job_id) : "",
      time_created: isSet(object.time_created) ? fromJsonTimestamp(object.time_created) : undefined,
      job_params: isObject(object.job_params) ? object.job_params : undefined,
    };
  },

  toJSON(message: JobRec): unknown {
    const obj: any = {};
    if (message.project_id !== "") {
      obj.project_id = message.project_id;
    }
    if (message.spec_name !== "") {
      obj.spec_name = message.spec_name;
    }
    if (message.job_id !== "") {
      obj.job_id = message.job_id;
    }
    if (message.time_created !== undefined) {
      obj.time_created = message.time_created.toISOString();
    }
    if (message.job_params !== undefined) {
      obj.job_params = message.job_params;
    }
    return obj;
  },

  create(base?: DeepPartial<JobRec>): JobRec {
    return JobRec.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<JobRec>): JobRec {
    const message = createBaseJobRec();
    message.project_id = object.project_id ?? "";
    message.spec_name = object.spec_name ?? "";
    message.job_id = object.job_id ?? "";
    message.time_created = object.time_created ?? undefined;
    message.job_params = object.job_params ?? undefined;
    return message;
  },
};

function createBaseGetJobRecRequest(): GetJobRecRequest {
  return { projectId: "", specName: "", jobId: "" };
}

export const GetJobRecRequest = {
  encode(message: GetJobRecRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectId !== "") {
      writer.uint32(10).string(message.projectId);
    }
    if (message.specName !== "") {
      writer.uint32(18).string(message.specName);
    }
    if (message.jobId !== "") {
      writer.uint32(26).string(message.jobId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetJobRecRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetJobRecRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.projectId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.specName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.jobId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetJobRecRequest {
    return {
      projectId: isSet(object.projectId) ? globalThis.String(object.projectId) : "",
      specName: isSet(object.specName) ? globalThis.String(object.specName) : "",
      jobId: isSet(object.jobId) ? globalThis.String(object.jobId) : "",
    };
  },

  toJSON(message: GetJobRecRequest): unknown {
    const obj: any = {};
    if (message.projectId !== "") {
      obj.projectId = message.projectId;
    }
    if (message.specName !== "") {
      obj.specName = message.specName;
    }
    if (message.jobId !== "") {
      obj.jobId = message.jobId;
    }
    return obj;
  },

  create(base?: DeepPartial<GetJobRecRequest>): GetJobRecRequest {
    return GetJobRecRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetJobRecRequest>): GetJobRecRequest {
    const message = createBaseGetJobRecRequest();
    message.projectId = object.projectId ?? "";
    message.specName = object.specName ?? "";
    message.jobId = object.jobId ?? "";
    return message;
  },
};

function createBaseJobRecAndStatus(): JobRecAndStatus {
  return { rec: undefined, status: "" };
}

export const JobRecAndStatus = {
  encode(message: JobRecAndStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rec !== undefined) {
      JobRec.encode(message.rec, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== "") {
      writer.uint32(18).string(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JobRecAndStatus {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJobRecAndStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rec = JobRec.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.status = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): JobRecAndStatus {
    return {
      rec: isSet(object.rec) ? JobRec.fromJSON(object.rec) : undefined,
      status: isSet(object.status) ? globalThis.String(object.status) : "",
    };
  },

  toJSON(message: JobRecAndStatus): unknown {
    const obj: any = {};
    if (message.rec !== undefined) {
      obj.rec = JobRec.toJSON(message.rec);
    }
    if (message.status !== "") {
      obj.status = message.status;
    }
    return obj;
  },

  create(base?: DeepPartial<JobRecAndStatus>): JobRecAndStatus {
    return JobRecAndStatus.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<JobRecAndStatus>): JobRecAndStatus {
    const message = createBaseJobRecAndStatus();
    message.rec = (object.rec !== undefined && object.rec !== null) ? JobRec.fromPartial(object.rec) : undefined;
    message.status = object.status ?? "";
    return message;
  },
};

function createBaseGetJobRecResponse(): GetJobRecResponse {
  return { rec: undefined, null_response: undefined };
}

export const GetJobRecResponse = {
  encode(message: GetJobRecResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rec !== undefined) {
      JobRecAndStatus.encode(message.rec, writer.uint32(10).fork()).ldelim();
    }
    if (message.null_response !== undefined) {
      Empty.encode(message.null_response, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetJobRecResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetJobRecResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.rec = JobRecAndStatus.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.null_response = Empty.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetJobRecResponse {
    return {
      rec: isSet(object.rec) ? JobRecAndStatus.fromJSON(object.rec) : undefined,
      null_response: isSet(object.null_response) ? Empty.fromJSON(object.null_response) : undefined,
    };
  },

  toJSON(message: GetJobRecResponse): unknown {
    const obj: any = {};
    if (message.rec !== undefined) {
      obj.rec = JobRecAndStatus.toJSON(message.rec);
    }
    if (message.null_response !== undefined) {
      obj.null_response = Empty.toJSON(message.null_response);
    }
    return obj;
  },

  create(base?: DeepPartial<GetJobRecResponse>): GetJobRecResponse {
    return GetJobRecResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetJobRecResponse>): GetJobRecResponse {
    const message = createBaseGetJobRecResponse();
    message.rec = (object.rec !== undefined && object.rec !== null)
      ? JobRecAndStatus.fromPartial(object.rec)
      : undefined;
    message.null_response = (object.null_response !== undefined && object.null_response !== null)
      ? Empty.fromPartial(object.null_response)
      : undefined;
    return message;
  },
};

function createBaseGetZZJobTestRequest(): GetZZJobTestRequest {
  return { id: "" };
}

export const GetZZJobTestRequest = {
  encode(message: GetZZJobTestRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetZZJobTestRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetZZJobTestRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetZZJobTestRequest {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: GetZZJobTestRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create(base?: DeepPartial<GetZZJobTestRequest>): GetZZJobTestRequest {
    return GetZZJobTestRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetZZJobTestRequest>): GetZZJobTestRequest {
    const message = createBaseGetZZJobTestRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseGetZZJobTestResponse(): GetZZJobTestResponse {
  return { projectId: "", pipeName: "", jobId: "" };
}

export const GetZZJobTestResponse = {
  encode(message: GetZZJobTestResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.projectId !== "") {
      writer.uint32(10).string(message.projectId);
    }
    if (message.pipeName !== "") {
      writer.uint32(18).string(message.pipeName);
    }
    if (message.jobId !== "") {
      writer.uint32(26).string(message.jobId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetZZJobTestResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetZZJobTestResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.projectId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pipeName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.jobId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetZZJobTestResponse {
    return {
      projectId: isSet(object.projectId) ? globalThis.String(object.projectId) : "",
      pipeName: isSet(object.pipeName) ? globalThis.String(object.pipeName) : "",
      jobId: isSet(object.jobId) ? globalThis.String(object.jobId) : "",
    };
  },

  toJSON(message: GetZZJobTestResponse): unknown {
    const obj: any = {};
    if (message.projectId !== "") {
      obj.projectId = message.projectId;
    }
    if (message.pipeName !== "") {
      obj.pipeName = message.pipeName;
    }
    if (message.jobId !== "") {
      obj.jobId = message.jobId;
    }
    return obj;
  },

  create(base?: DeepPartial<GetZZJobTestResponse>): GetZZJobTestResponse {
    return GetZZJobTestResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetZZJobTestResponse>): GetZZJobTestResponse {
    const message = createBaseGetZZJobTestResponse();
    message.projectId = object.projectId ?? "";
    message.pipeName = object.pipeName ?? "";
    message.jobId = object.jobId ?? "";
    return message;
  },
};

function createBaseEnsureStreamRecRequest(): EnsureStreamRecRequest {
  return { project_id: "", stream_id: "" };
}

export const EnsureStreamRecRequest = {
  encode(message: EnsureStreamRecRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.project_id !== "") {
      writer.uint32(10).string(message.project_id);
    }
    if (message.stream_id !== "") {
      writer.uint32(18).string(message.stream_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EnsureStreamRecRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEnsureStreamRecRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.project_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.stream_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EnsureStreamRecRequest {
    return {
      project_id: isSet(object.project_id) ? globalThis.String(object.project_id) : "",
      stream_id: isSet(object.stream_id) ? globalThis.String(object.stream_id) : "",
    };
  },

  toJSON(message: EnsureStreamRecRequest): unknown {
    const obj: any = {};
    if (message.project_id !== "") {
      obj.project_id = message.project_id;
    }
    if (message.stream_id !== "") {
      obj.stream_id = message.stream_id;
    }
    return obj;
  },

  create(base?: DeepPartial<EnsureStreamRecRequest>): EnsureStreamRecRequest {
    return EnsureStreamRecRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<EnsureStreamRecRequest>): EnsureStreamRecRequest {
    const message = createBaseEnsureStreamRecRequest();
    message.project_id = object.project_id ?? "";
    message.stream_id = object.stream_id ?? "";
    return message;
  },
};

function createBaseEnsureJobStreamConnectorRecRequest(): EnsureJobStreamConnectorRecRequest {
  return { project_id: "", stream_id: "", job_id: "", key: "", connector_type: "" };
}

export const EnsureJobStreamConnectorRecRequest = {
  encode(message: EnsureJobStreamConnectorRecRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.project_id !== "") {
      writer.uint32(10).string(message.project_id);
    }
    if (message.stream_id !== "") {
      writer.uint32(18).string(message.stream_id);
    }
    if (message.job_id !== "") {
      writer.uint32(26).string(message.job_id);
    }
    if (message.key !== "") {
      writer.uint32(34).string(message.key);
    }
    if (message.connector_type !== "") {
      writer.uint32(42).string(message.connector_type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EnsureJobStreamConnectorRecRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEnsureJobStreamConnectorRecRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.project_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.stream_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.job_id = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.key = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.connector_type = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EnsureJobStreamConnectorRecRequest {
    return {
      project_id: isSet(object.project_id) ? globalThis.String(object.project_id) : "",
      stream_id: isSet(object.stream_id) ? globalThis.String(object.stream_id) : "",
      job_id: isSet(object.job_id) ? globalThis.String(object.job_id) : "",
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      connector_type: isSet(object.connector_type) ? globalThis.String(object.connector_type) : "",
    };
  },

  toJSON(message: EnsureJobStreamConnectorRecRequest): unknown {
    const obj: any = {};
    if (message.project_id !== "") {
      obj.project_id = message.project_id;
    }
    if (message.stream_id !== "") {
      obj.stream_id = message.stream_id;
    }
    if (message.job_id !== "") {
      obj.job_id = message.job_id;
    }
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.connector_type !== "") {
      obj.connector_type = message.connector_type;
    }
    return obj;
  },

  create(base?: DeepPartial<EnsureJobStreamConnectorRecRequest>): EnsureJobStreamConnectorRecRequest {
    return EnsureJobStreamConnectorRecRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<EnsureJobStreamConnectorRecRequest>): EnsureJobStreamConnectorRecRequest {
    const message = createBaseEnsureJobStreamConnectorRecRequest();
    message.project_id = object.project_id ?? "";
    message.stream_id = object.stream_id ?? "";
    message.job_id = object.job_id ?? "";
    message.key = object.key ?? "";
    message.connector_type = object.connector_type ?? "";
    return message;
  },
};

function createBaseGetJobStreamConnectorRecsRequest(): GetJobStreamConnectorRecsRequest {
  return { project_id: "", job_id: "", key: "", connector_type: "" };
}

export const GetJobStreamConnectorRecsRequest = {
  encode(message: GetJobStreamConnectorRecsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.project_id !== "") {
      writer.uint32(10).string(message.project_id);
    }
    if (message.job_id !== "") {
      writer.uint32(18).string(message.job_id);
    }
    if (message.key !== "") {
      writer.uint32(26).string(message.key);
    }
    if (message.connector_type !== "") {
      writer.uint32(34).string(message.connector_type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetJobStreamConnectorRecsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetJobStreamConnectorRecsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.project_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.job_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.key = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.connector_type = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetJobStreamConnectorRecsRequest {
    return {
      project_id: isSet(object.project_id) ? globalThis.String(object.project_id) : "",
      job_id: isSet(object.job_id) ? globalThis.String(object.job_id) : "",
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      connector_type: isSet(object.connector_type) ? globalThis.String(object.connector_type) : "",
    };
  },

  toJSON(message: GetJobStreamConnectorRecsRequest): unknown {
    const obj: any = {};
    if (message.project_id !== "") {
      obj.project_id = message.project_id;
    }
    if (message.job_id !== "") {
      obj.job_id = message.job_id;
    }
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.connector_type !== "") {
      obj.connector_type = message.connector_type;
    }
    return obj;
  },

  create(base?: DeepPartial<GetJobStreamConnectorRecsRequest>): GetJobStreamConnectorRecsRequest {
    return GetJobStreamConnectorRecsRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetJobStreamConnectorRecsRequest>): GetJobStreamConnectorRecsRequest {
    const message = createBaseGetJobStreamConnectorRecsRequest();
    message.project_id = object.project_id ?? "";
    message.job_id = object.job_id ?? "";
    message.key = object.key ?? "";
    message.connector_type = object.connector_type ?? "";
    return message;
  },
};

function createBaseJobStreamConnectorRecord(): JobStreamConnectorRecord {
  return { project_id: "", job_id: "", time_created: undefined, stream_id: "", key: "", connector_type: "" };
}

export const JobStreamConnectorRecord = {
  encode(message: JobStreamConnectorRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.project_id !== "") {
      writer.uint32(10).string(message.project_id);
    }
    if (message.job_id !== "") {
      writer.uint32(18).string(message.job_id);
    }
    if (message.time_created !== undefined) {
      Timestamp.encode(toTimestamp(message.time_created), writer.uint32(26).fork()).ldelim();
    }
    if (message.stream_id !== "") {
      writer.uint32(34).string(message.stream_id);
    }
    if (message.key !== "") {
      writer.uint32(42).string(message.key);
    }
    if (message.connector_type !== "") {
      writer.uint32(50).string(message.connector_type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JobStreamConnectorRecord {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJobStreamConnectorRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.project_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.job_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.time_created = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.stream_id = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.key = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.connector_type = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): JobStreamConnectorRecord {
    return {
      project_id: isSet(object.project_id) ? globalThis.String(object.project_id) : "",
      job_id: isSet(object.job_id) ? globalThis.String(object.job_id) : "",
      time_created: isSet(object.time_created) ? fromJsonTimestamp(object.time_created) : undefined,
      stream_id: isSet(object.stream_id) ? globalThis.String(object.stream_id) : "",
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      connector_type: isSet(object.connector_type) ? globalThis.String(object.connector_type) : "",
    };
  },

  toJSON(message: JobStreamConnectorRecord): unknown {
    const obj: any = {};
    if (message.project_id !== "") {
      obj.project_id = message.project_id;
    }
    if (message.job_id !== "") {
      obj.job_id = message.job_id;
    }
    if (message.time_created !== undefined) {
      obj.time_created = message.time_created.toISOString();
    }
    if (message.stream_id !== "") {
      obj.stream_id = message.stream_id;
    }
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.connector_type !== "") {
      obj.connector_type = message.connector_type;
    }
    return obj;
  },

  create(base?: DeepPartial<JobStreamConnectorRecord>): JobStreamConnectorRecord {
    return JobStreamConnectorRecord.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<JobStreamConnectorRecord>): JobStreamConnectorRecord {
    const message = createBaseJobStreamConnectorRecord();
    message.project_id = object.project_id ?? "";
    message.job_id = object.job_id ?? "";
    message.time_created = object.time_created ?? undefined;
    message.stream_id = object.stream_id ?? "";
    message.key = object.key ?? "";
    message.connector_type = object.connector_type ?? "";
    return message;
  },
};

function createBaseGetJobDatapointsRequest(): GetJobDatapointsRequest {
  return { project_id: "", pipe_name: "", job_id: "", io_type: "", order: "", limit: 0, key: "" };
}

export const GetJobDatapointsRequest = {
  encode(message: GetJobDatapointsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.project_id !== "") {
      writer.uint32(10).string(message.project_id);
    }
    if (message.pipe_name !== "") {
      writer.uint32(18).string(message.pipe_name);
    }
    if (message.job_id !== "") {
      writer.uint32(26).string(message.job_id);
    }
    if (message.io_type !== "") {
      writer.uint32(34).string(message.io_type);
    }
    if (message.order !== "") {
      writer.uint32(42).string(message.order);
    }
    if (message.limit !== 0) {
      writer.uint32(48).int32(message.limit);
    }
    if (message.key !== "") {
      writer.uint32(58).string(message.key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetJobDatapointsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetJobDatapointsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.project_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pipe_name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.job_id = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.io_type = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.order = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.limit = reader.int32();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.key = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetJobDatapointsRequest {
    return {
      project_id: isSet(object.project_id) ? globalThis.String(object.project_id) : "",
      pipe_name: isSet(object.pipe_name) ? globalThis.String(object.pipe_name) : "",
      job_id: isSet(object.job_id) ? globalThis.String(object.job_id) : "",
      io_type: isSet(object.io_type) ? globalThis.String(object.io_type) : "",
      order: isSet(object.order) ? globalThis.String(object.order) : "",
      limit: isSet(object.limit) ? globalThis.Number(object.limit) : 0,
      key: isSet(object.key) ? globalThis.String(object.key) : "",
    };
  },

  toJSON(message: GetJobDatapointsRequest): unknown {
    const obj: any = {};
    if (message.project_id !== "") {
      obj.project_id = message.project_id;
    }
    if (message.pipe_name !== "") {
      obj.pipe_name = message.pipe_name;
    }
    if (message.job_id !== "") {
      obj.job_id = message.job_id;
    }
    if (message.io_type !== "") {
      obj.io_type = message.io_type;
    }
    if (message.order !== "") {
      obj.order = message.order;
    }
    if (message.limit !== 0) {
      obj.limit = Math.round(message.limit);
    }
    if (message.key !== "") {
      obj.key = message.key;
    }
    return obj;
  },

  create(base?: DeepPartial<GetJobDatapointsRequest>): GetJobDatapointsRequest {
    return GetJobDatapointsRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GetJobDatapointsRequest>): GetJobDatapointsRequest {
    const message = createBaseGetJobDatapointsRequest();
    message.project_id = object.project_id ?? "";
    message.pipe_name = object.pipe_name ?? "";
    message.job_id = object.job_id ?? "";
    message.io_type = object.io_type ?? "";
    message.order = object.order ?? "";
    message.limit = object.limit ?? 0;
    message.key = object.key ?? "";
    return message;
  },
};

function createBaseDatapointRecord(): DatapointRecord {
  return { datapoint_id: "", data: undefined };
}

export const DatapointRecord = {
  encode(message: DatapointRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.datapoint_id !== "") {
      writer.uint32(10).string(message.datapoint_id);
    }
    if (message.data !== undefined) {
      Struct.encode(Struct.wrap(message.data), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DatapointRecord {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDatapointRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.datapoint_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.data = Struct.unwrap(Struct.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DatapointRecord {
    return {
      datapoint_id: isSet(object.datapoint_id) ? globalThis.String(object.datapoint_id) : "",
      data: isObject(object.data) ? object.data : undefined,
    };
  },

  toJSON(message: DatapointRecord): unknown {
    const obj: any = {};
    if (message.datapoint_id !== "") {
      obj.datapoint_id = message.datapoint_id;
    }
    if (message.data !== undefined) {
      obj.data = message.data;
    }
    return obj;
  },

  create(base?: DeepPartial<DatapointRecord>): DatapointRecord {
    return DatapointRecord.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<DatapointRecord>): DatapointRecord {
    const message = createBaseDatapointRecord();
    message.datapoint_id = object.datapoint_id ?? "";
    message.data = object.data ?? undefined;
    return message;
  },
};

function createBaseJobInfo(): JobInfo {
  return { job_id: "", job_output_key: "" };
}

export const JobInfo = {
  encode(message: JobInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.job_id !== "") {
      writer.uint32(10).string(message.job_id);
    }
    if (message.job_output_key !== "") {
      writer.uint32(18).string(message.job_output_key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JobInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJobInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.job_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.job_output_key = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): JobInfo {
    return {
      job_id: isSet(object.job_id) ? globalThis.String(object.job_id) : "",
      job_output_key: isSet(object.job_output_key) ? globalThis.String(object.job_output_key) : "",
    };
  },

  toJSON(message: JobInfo): unknown {
    const obj: any = {};
    if (message.job_id !== "") {
      obj.job_id = message.job_id;
    }
    if (message.job_output_key !== "") {
      obj.job_output_key = message.job_output_key;
    }
    return obj;
  },

  create(base?: DeepPartial<JobInfo>): JobInfo {
    return JobInfo.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<JobInfo>): JobInfo {
    const message = createBaseJobInfo();
    message.job_id = object.job_id ?? "";
    message.job_output_key = object.job_output_key ?? "";
    return message;
  },
};

function createBaseAddDatapointRequest(): AddDatapointRequest {
  return { project_id: "", stream_id: "", datapoint_id: "", job_info: undefined, data: undefined };
}

export const AddDatapointRequest = {
  encode(message: AddDatapointRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.project_id !== "") {
      writer.uint32(10).string(message.project_id);
    }
    if (message.stream_id !== "") {
      writer.uint32(18).string(message.stream_id);
    }
    if (message.datapoint_id !== "") {
      writer.uint32(26).string(message.datapoint_id);
    }
    if (message.job_info !== undefined) {
      JobInfo.encode(message.job_info, writer.uint32(34).fork()).ldelim();
    }
    if (message.data !== undefined) {
      Any.encode(message.data, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddDatapointRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddDatapointRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.project_id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.stream_id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.datapoint_id = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.job_info = JobInfo.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.data = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddDatapointRequest {
    return {
      project_id: isSet(object.project_id) ? globalThis.String(object.project_id) : "",
      stream_id: isSet(object.stream_id) ? globalThis.String(object.stream_id) : "",
      datapoint_id: isSet(object.datapoint_id) ? globalThis.String(object.datapoint_id) : "",
      job_info: isSet(object.job_info) ? JobInfo.fromJSON(object.job_info) : undefined,
      data: isSet(object.data) ? Any.fromJSON(object.data) : undefined,
    };
  },

  toJSON(message: AddDatapointRequest): unknown {
    const obj: any = {};
    if (message.project_id !== "") {
      obj.project_id = message.project_id;
    }
    if (message.stream_id !== "") {
      obj.stream_id = message.stream_id;
    }
    if (message.datapoint_id !== "") {
      obj.datapoint_id = message.datapoint_id;
    }
    if (message.job_info !== undefined) {
      obj.job_info = JobInfo.toJSON(message.job_info);
    }
    if (message.data !== undefined) {
      obj.data = Any.toJSON(message.data);
    }
    return obj;
  },

  create(base?: DeepPartial<AddDatapointRequest>): AddDatapointRequest {
    return AddDatapointRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<AddDatapointRequest>): AddDatapointRequest {
    const message = createBaseAddDatapointRequest();
    message.project_id = object.project_id ?? "";
    message.stream_id = object.stream_id ?? "";
    message.datapoint_id = object.datapoint_id ?? "";
    message.job_info = (object.job_info !== undefined && object.job_info !== null)
      ? JobInfo.fromPartial(object.job_info)
      : undefined;
    message.data = (object.data !== undefined && object.data !== null) ? Any.fromPartial(object.data) : undefined;
    return message;
  },
};

function createBaseAddDatapointResponse(): AddDatapointResponse {
  return { datapoint_id: "" };
}

export const AddDatapointResponse = {
  encode(message: AddDatapointResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.datapoint_id !== "") {
      writer.uint32(10).string(message.datapoint_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddDatapointResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddDatapointResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.datapoint_id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AddDatapointResponse {
    return { datapoint_id: isSet(object.datapoint_id) ? globalThis.String(object.datapoint_id) : "" };
  },

  toJSON(message: AddDatapointResponse): unknown {
    const obj: any = {};
    if (message.datapoint_id !== "") {
      obj.datapoint_id = message.datapoint_id;
    }
    return obj;
  },

  create(base?: DeepPartial<AddDatapointResponse>): AddDatapointResponse {
    return AddDatapointResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<AddDatapointResponse>): AddDatapointResponse {
    const message = createBaseAddDatapointResponse();
    message.datapoint_id = object.datapoint_id ?? "";
    return message;
  },
};

export type DBServiceDefinition = typeof DBServiceDefinition;
export const DBServiceDefinition = {
  name: "DBService",
  fullName: "livestack.DBService",
  methods: {
    /**
     * rpc EnsureStreamRec(EnsureStreamRecRequest) returns (google.protobuf.Empty);
     * rpc EnsureJobStreamConnectorRec(EnsureJobStreamConnectorRecRequest) returns (google.protobuf.Empty);
     * rpc GetJobStreamConnectorRecs(GetJobStreamConnectorRecsRequest) returns (stream JobStreamConnectorRecord);
     * rpc GetJobDatapoints(GetJobDatapointsRequest) returns (DatapointRecord);
     * rpc AddDatapoint(AddDatapointRequest) returns (AddDatapointResponse);
     */
    getJobRec: {
      name: "GetJobRec",
      requestType: GetJobRecRequest,
      requestStream: false,
      responseType: GetJobRecResponse,
      responseStream: false,
      options: {},
    },
  },
} as const;

export interface DBServiceImplementation<CallContextExt = {}> {
  /**
   * rpc EnsureStreamRec(EnsureStreamRecRequest) returns (google.protobuf.Empty);
   * rpc EnsureJobStreamConnectorRec(EnsureJobStreamConnectorRecRequest) returns (google.protobuf.Empty);
   * rpc GetJobStreamConnectorRecs(GetJobStreamConnectorRecsRequest) returns (stream JobStreamConnectorRecord);
   * rpc GetJobDatapoints(GetJobDatapointsRequest) returns (DatapointRecord);
   * rpc AddDatapoint(AddDatapointRequest) returns (AddDatapointResponse);
   */
  getJobRec(request: GetJobRecRequest, context: CallContext & CallContextExt): Promise<DeepPartial<GetJobRecResponse>>;
}

export interface DBServiceClient<CallOptionsExt = {}> {
  /**
   * rpc EnsureStreamRec(EnsureStreamRecRequest) returns (google.protobuf.Empty);
   * rpc EnsureJobStreamConnectorRec(EnsureJobStreamConnectorRecRequest) returns (google.protobuf.Empty);
   * rpc GetJobStreamConnectorRecs(GetJobStreamConnectorRecsRequest) returns (stream JobStreamConnectorRecord);
   * rpc GetJobDatapoints(GetJobDatapointsRequest) returns (DatapointRecord);
   * rpc AddDatapoint(AddDatapointRequest) returns (AddDatapointResponse);
   */
  getJobRec(request: DeepPartial<GetJobRecRequest>, options?: CallOptions & CallOptionsExt): Promise<GetJobRecResponse>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function toTimestamp(date: Date): Timestamp {
  const seconds = Math.trunc(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}