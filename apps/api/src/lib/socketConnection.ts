import { Collection } from "@discordjs/collection";
import {
  ClientMessageCallback,
  ClientOperatorCallback,
  ConnectionCloseCallback,
  SocketConnectionObject,
  SocketConnectionOptions,
} from "../types/Connection";
import { PayloadType, RawPayloadObject } from "../types/Payload";
import {
  messagePayloadManager,
  operatorPayloadManager,
} from "../helpers/payloadManagers";
import createRawPayload from "../helpers/createRawPayload";
import createPayload from "../helpers/createPayload";

export default function socketConnection({
  connection,
  host,
  origin,
  remoteAddress,
}: SocketConnectionOptions): SocketConnectionObject {
  let payloadEventCallbacks: ClientMessageCallback[] = [];
  let operatorEventCallbacks = new Collection<string, ClientOperatorCallback>();
  let connectionCloseEventCallbacks: ConnectionCloseCallback[] = [];

  connection.on("message", (data: any) => {
    const json: RawPayloadObject = JSON.parse(data.utf8Data ?? "");

    operatorEventCallbacks.map((cb, operator) => {
      const manager = operatorPayloadManager(connection, json);
      if (manager.op !== operator || manager.type !== PayloadType.Operator)
        return;

      return cb(manager);
    });

    payloadEventCallbacks.map((cb) => {
      const json: RawPayloadObject = JSON.parse(data.utf8Data);
      const manager = messagePayloadManager(connection, json);

      if (json.meta.type !== PayloadType.Message) return;
      return cb(manager);
    });
  });

  connection.on("close", () => {
    connectionCloseEventCallbacks.map((e) => {
      e();
    });
  });

  return {
    host,
    origin,
    remoteAddress,
    onOperator(operator: string, event) {
      operatorEventCallbacks.set(operator, event);
    },
    onPayload(event) {
      payloadEventCallbacks.push(event);
    },
    onClose(event) {
      connectionCloseEventCallbacks.push(event);
    },
    sendOp(operator: string, args: any) {
      return new Promise(async (resolve, reject) => {
        const payload = createRawPayload(createPayload(operator, args), {
          type: PayloadType.Operator,
        });
        const payloadString = JSON.stringify(payload, null, 2);

        connection.send(payloadString, (err) => {
          if (err) return reject(err);
          return resolve(operatorPayloadManager(connection, payload));
        });
      });
    },
    send(args: any) {
      return new Promise((resolve, reject) => {
        const payload = createRawPayload(createPayload("swipe:message", args), {
          type: PayloadType.Message,
        });
        const payloadString = JSON.stringify(payload, null, 2);

        connection.send(payloadString, (err) => {
          if (err) return reject(err);
          return resolve(messagePayloadManager(connection, payload));
        });
      });
    },
  };
}
