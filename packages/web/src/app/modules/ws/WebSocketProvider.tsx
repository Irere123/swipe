import React, { useEffect, useMemo, useRef, useState } from "react";
import { User } from "./types";
import { connect, Connection } from "./conn";
import { useTokenStore } from "../auth/useTokenStore";
import { apiBaseUrl } from "../../lib/constants";
import { useLocation, useNavigate, Navigator, useHref } from "react-router-dom";
import { showErrorToast } from "../../lib/showErrorToast";

type V = Connection | null;

export const WebSocketContext = React.createContext<{
  conn: V;
  setUser: (u: User) => void;
  setConn: (u: Connection | null) => void;
}>({
  conn: null,
  setUser: () => {},
  setConn: () => {},
});

export const WebSocketProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const hasTokens = useTokenStore((s) => s.accessToken && s.refreshToken);
  const [conn, setConn] = useState<V>(null);
  const isConnecting = useRef(false);

  useEffect(() => {
    if (!conn && hasTokens && !isConnecting.current) {
      isConnecting.current = true;
      connect("", "", {
        url: apiBaseUrl.replace("http", "ws") + "/socket",
        getAuthOptions: () => {
          const { accessToken, refreshToken } = useTokenStore.getState();

          return {
            accessToken,
            refreshToken,
          };
        },
        onConnectionTaken: () => {
          window.location.href = "/connection-taken";
        },
        onClearTokens: () => {
          console.log("clearing tokens...");
          useTokenStore
            .getState()
            .setTokens({ accessToken: "", refreshToken: "" });
          setConn(null);
          window.location.href = "/logout";
        },
      })
        .then((x) => {
          setConn(x);
        })
        .catch((err) => {
          console.log(err);
          showErrorToast(err);
        })
        .finally(() => {
          isConnecting.current = false;
        });
    }
  }, [conn, hasTokens]);

  useEffect(() => {
    if (!conn) {
      return;
    }

    return conn.addListener<{
      refreshToken: string;
      accessToken: string;
    }>("new-tokens", ({ refreshToken, accessToken }) => {
      useTokenStore.getState().setTokens({
        accessToken,
        refreshToken,
      });
    });
  }, [conn]);

  return (
    <WebSocketContext.Provider
      value={useMemo(
        () => ({
          conn,
          setConn,
          setUser: (u: User) => {
            if (conn) {
              setConn({
                ...conn,
                user: u,
              });
            }
          },
        }),
        [conn]
      )}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
