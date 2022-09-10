import React, { useState } from "react";
import { SolidBug } from "@swipe/ui";
import { Input } from "../../components/Input";

interface ChatInputProps {}

export const ChatInput: React.FC<ChatInputProps> = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setMessage("");
  };
  return (
    <div className="sticky bottom-0 w-full bg-primary">
      <form onSubmit={handleSubmit} className={`pb-3 px-4 pt-2 flex flex-col`}>
        <div className={`flex mb-1`}></div>
        <div className="flex items-stretch">
          <div className="flex flex-1 mr-2 lg:mr-0 items-center bg-primary-dark rounded-lg">
            <Input
              placeholder={"Send message"}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              id="chat-input"
              transparent
              autoComplete="off"
            />
            <div
              className={`right-12 cursor-pointer flex flex-row-reverse fill-current text-primary-200 mr-3`}
            >
              <SolidBug />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
