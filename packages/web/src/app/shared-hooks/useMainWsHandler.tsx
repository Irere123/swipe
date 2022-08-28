import { FC, ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../lib/showErrorToast";
import { WebSocketContext } from "../modules/ws/WebSocketProvider";

export const useMainWsHandler = () => {
  const { conn } = useContext(WebSocketContext);

  useEffect(() => {
    if (!conn) {
      return;
    }

    const unsubs = [
      conn.addListener<any>("error", (msg) => {
        showErrorToast(msg);
      }),
    ];

    return () => {
      unsubs.forEach((u) => u());
    };
  }, [conn]);
};

export const MainWsHandlerProvider: FC<{ children?: ReactNode }> = ({
  children,
}) => {
  useMainWsHandler();
  return <>{children}</>;
};
