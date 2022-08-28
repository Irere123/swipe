import React, { useContext } from "react";
import { WebSocketContext } from "../ws/WebSocketProvider";

interface WaitForWsConnectProps {
  children?: React.ReactNode;
}

export const WaitForWsConnect: React.FC<WaitForWsConnectProps> = ({
  children,
}) => {
  const { conn } = useContext(WebSocketContext);

  if (!conn) {
    // @todo make this better
    return <div className="flex">loading...</div>;
  }

  return <>{children}</>;
};
