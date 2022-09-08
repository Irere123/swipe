import { PayloadObject } from "../types/Payload";
import * as uuid from "uuid";

export default function createPayload(
  op: string,
  payload?: any,
  ref?: string
): PayloadObject {
  return {
    op: op,
    p: payload,
    ref: ref ?? uuid.v4(),
  };
}
