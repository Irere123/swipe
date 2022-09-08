import http from "http";
import { request } from "websocket";
import { SocketConnectionObject } from "./Connection";

export type RequestValidator = (request: request) => boolean;
export type ConnectionListener = (connection: SocketConnectionObject) => void;

export interface WSServer {
  httpServer: http.Server;
  onConnection(connection: ConnectionListener): void;
}

export interface WSServerEvents {
  connection: (connection: SocketConnectionObject) => void;
}

export interface WSServerOptions {
  httpServer: http.Server;
}
