import React from "react";
import { QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { ConfirmModal } from "./app/components/ConfirmModal";
import { queryClient } from "./app/lib/queryClient";
import { WebSocketProvider } from "./app/modules/ws/WebSocketProvider";
import { MainWsHandlerProvider } from "./app/shared-hooks/useMainWsHandler";

export const Providers: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <WebSocketProvider>
      <MainWsHandlerProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ConfirmModal />
          <ToastContainer />
        </QueryClientProvider>
      </MainWsHandlerProvider>
    </WebSocketProvider>
  );
};
