import React from "react";
import { QueryClientProvider } from "react-query";
import { ConfirmModal } from "./app/components/ComfirmModal";
import { PromptModal } from "./app/components/PromptModal";
import { queryClient } from "./app/utils/queryClient";
import { ReactQueryDevtools } from "react-query/devtools";
import { UserProvider } from "./app/utils/UserProvider";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        {children}
        <PromptModal />
        <ConfirmModal />
      </UserProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
