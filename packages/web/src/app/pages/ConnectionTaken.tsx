import React from "react";
import { Button } from "../components/Button";
import { MainLayout } from "../components/MainLayout";
import { Codicon } from "../icons";

export const ConnectionTaken: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-3 m-auto">
      <h4 className="text-center text-primary-100">
        Connection has been close by server.This usually happens when you open
        another tab.
      </h4>
      <div>
        <Button
          onClick={() => {
            window.location.pathname = "/";
          }}
          icon={<Codicon name="refresh" />}
        >
          Reconnect
        </Button>
      </div>
    </div>
  );
};
