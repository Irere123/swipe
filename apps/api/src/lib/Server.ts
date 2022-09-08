import {
  ConnectionListener,
  RequestValidator,
  WSServer,
  WSServerOptions,
} from "../types/WSServer";
import { connection, request, server as WebSocketServer } from "websocket";
import socketConnection from "./socketConnection";

export default function Server({ httpServer }: WSServerOptions): WSServer {
  const ws = new WebSocketServer({ httpServer });

  let requestValidator: RequestValidator = () => true;
  let connectionListeners: ConnectionListener[] = [];

  const newConnection = (connection: connection, request: request) => {
    connectionListeners.map((cL) => {
      setTimeout(() => {
        const sco = socketConnection({
          connection,
          host: request.host,
          origin: request.origin,
          remoteAddress: request.remoteAddress,
        });
        cL(sco);
      }, 2);
    });
  };

  ws.on("request", (request) => {
    if (!requestValidator(request)) return request.reject();
    const connection = request.accept(null, request.origin);
    newConnection(connection, request);
  });

  return {
    httpServer,
    onConnection(connection) {
      connectionListeners.push(connection);
    },
  };
}
