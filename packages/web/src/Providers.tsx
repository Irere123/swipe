import React from "react";
import { QueryClientProvider } from "react-query";
import { ConfirmModal } from "./app/components/ConfirmModal";
import { queryClient } from "./app/lib/queryClient";

export const Providers: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ConfirmModal />
    </QueryClientProvider>
  );
};
