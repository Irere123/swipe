import { connection } from "websocket";
import {
  MessagePayloadManager,
  OperatorPayloadManager,
  PayloadType,
  RawPayloadObject,
} from "../types/Payload";
import createRawPayload from "./createRawPayload";

export function messagePayloadManager(
  connection: connection,
  { payload, meta: { timestamp, type } }: RawPayloadObject
): MessagePayloadManager {
  return {
    data: payload.p,
    op: payload.op,
    parsed: payload,
    reference: payload.ref,
    timestamp,
    type,
    reply(data) {
      const payloadBase = createRawPayload(
        { op: this.op, p: data, ref: this.reference },
        { type: PayloadType.MessageResponse }
      );

      connection.send(JSON.stringify(payloadBase));
    },
    onResponse(callback) {
      connection.on("message", (data: any) => {
        const jsonData: RawPayloadObject = JSON.parse(data.utf8Data ?? "");
        if (
          jsonData.payload.ref == this.reference &&
          jsonData.meta.type == PayloadType.MessageResponse
        )
          callback(messagePayloadManager(connection, jsonData));
      });
    },
  };
}

export function operatorPayloadManager(
  connection: connection,
  { meta: { timestamp, type }, payload }: RawPayloadObject
): OperatorPayloadManager {
  return {
    data: payload.p,
    op: payload.op,
    parsed: payload,
    reference: payload.ref,
    timestamp,
    type,
    reply(data) {
      const payloadBase = createRawPayload(
        { op: this.op, p: data, ref: this.reference },
        { type: PayloadType.OperatorResponse }
      );

      connection.send(JSON.stringify(payloadBase));
    },
    onResponse(callback) {
      connection.on("message", (data: any) => {
        const jsonData: RawPayloadObject = JSON.parse(data.utf8Data ?? "");
        if (
          jsonData.payload.ref == this.reference &&
          jsonData.meta.type == PayloadType.OperatorResponse
        )
          callback(messagePayloadManager(connection, jsonData));
      });
    },
  };
}
