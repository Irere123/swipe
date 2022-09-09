import {
  CreateRawPayloadOpts,
  PayloadObject,
  RawPayloadObject,
} from "../types/Payload";

export default function CreateRawPayload(
  payload: PayloadObject,
  { type }: CreateRawPayloadOpts
): RawPayloadObject {
  return {
    payload,
    meta: {
      type,
      timestamp: new Date().getTime(),
    },
  };
}
