import ReconnectingWebSocket from "reconnecting-websocket";
import { toast } from "react-toastify";
import { useTokenStore } from "../../global-stores/useTokenStore";
import { apiBaseUrl } from "../constants";

let socket: ReconnectingWebSocket | null = null;

export const auth_query = "auth";

window.addEventListener("online", () => {
  if (socket && socket.readyState === socket.CLOSED) {
    toast("reconnecting...", { type: "info" });
    console.log("online triggered, calling ws.reconnect()");
    socket.reconnect();
  }
});

export const closeWebSocket = () => {
  socket?.close();
};

export const createWebSocket = () => {
  const { accessToken, refreshToken } = useTokenStore.getState();

  if (!accessToken || !refreshToken) {
    return;
  }

  socket = new ReconnectingWebSocket(
    () =>
      (apiBaseUrl.includes("https")
        ? apiBaseUrl.replace("https", "wss")
        : apiBaseUrl.replace("http", "ws")) +
      `?accessToken=${accessToken}&refreshToken=${refreshToken}`
  );

  socket.addEventListener("close", ({ code, reason }) => {
    if (code === 4001) {
      console.log("clearing tokens");
      useTokenStore.getState().setTokens({ accessToken: "", refreshToken: "" });
      socket?.close();
      socket = null;
    } else if (code === 4003) {
      socket?.close();
      socket = null;
    } else if (code === 4004) {
      socket?.close();
      socket = null;
    }
    console.log("WEBSOCKET CLOSE", code, reason);
  });

  socket.addEventListener("open", () => {
    console.log("ws open");
  });
};

export const wsend = (d: { type: string; d?: any; userId: string }) => {
  if (!socket || socket.readyState !== socket.OPEN) {
    console.log("ws not ready");
  } else {
    socket?.send(JSON.stringify(d));
  }
};
