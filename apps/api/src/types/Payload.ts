export interface RawPayloadObject {
  payload: PayloadObject;
  meta: RawPayloadMeta;
}

export enum PayloadType {
  Message = "type:message",
  Operator = "type:operator",
  MessageResponse = "type:message_response",
  OperatorResponse = "type:operator_response",
}

interface PayloadManagerBase {
  readonly op: string;
  readonly data: any;
  readonly parsed: PayloadObject;
  readonly reference: string;
  readonly type: string;
  readonly timestamp: number;
}

export interface MessagePayloadManager extends PayloadManagerBase {
  reply(data: any, op?: string): void;
  onResponse(callback: (payload: MessagePayloadManager) => void): void;
}

export interface OperatorPayloadManager extends PayloadManagerBase {
  reply(data: any, op?: string): void;
  onResponse(callback: (payload: OperatorPayloadManager) => void): void;
}

export interface RawPayloadMeta {
  type: PayloadType;
  timestamp: number;
}

export interface CreateRawPayloadOpts {
  type: PayloadType;
}

export interface PayloadObject {
  op: string; // Operator code;
  d: any | null; // Payload data;
  ref: string; // Reference ID;
}
