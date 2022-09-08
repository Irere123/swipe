import { connection } from "websocket";
import { MessagePayloadManager, OperatorPayloadManager } from "./Payload";

export type ClientOperatorCallback = (event: OperatorPayloadManager) => void;
export type ClientMessageCallback = (event: MessagePayloadManager) => void;
export type ConnectionCloseCallback = () => {};

export interface SocketConnectionOptions {
  connection: connection; // Raw connection object;
  origin: string; // origin of the socket connection;
  host: string; // The host of the socket connection;
  remoteAddress: string; // The remote address of the socket connection;
}

export interface SocketConnectionObject {
  host: string;
  remoteAddress: string;
  origin: string;
  onOperator(op: string, event: ClientOperatorCallback): void;
  onPayload(event: ClientMessageCallback): void;

  sendOp(op: string, payload: any): Promise<OperatorPayloadManager>;
  send(payload: any): Promise<MessagePayloadManager>;
  onClose(event: ConnectionCloseCallback): void;
}
