import { PayloadObject } from "../types/Payload";
import * as uuid from "uuid";

export default function createPayload(
  op: string,
  payload?: any,
  ref?: string
): PayloadObject {
  return {
    op: op,
    d: payload,
    ref: ref ?? uuid.v4(),
  };
}
