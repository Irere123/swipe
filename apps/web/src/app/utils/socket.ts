import ReconnectingWebSocket from "reconnecting-websocket";
import { useTokenStore } from "../../global-stores/useTokenStore";
import { apiBaseUrl } from "../constants";

let socket: ReconnectingWebSocket | null = null;

export const getSocket = () => {
  const { accessToken, refreshToken } = useTokenStore.getState();

  if (!socket) {
    socket = new ReconnectingWebSocket(
      () =>
        (apiBaseUrl.includes("https")
          ? apiBaseUrl.replace("https", "wss")
          : apiBaseUrl.replace("http", "ws")) +
        `?accessToken=${accessToken}&refreshToken=${refreshToken}`
    );
  }

  return socket;
};
