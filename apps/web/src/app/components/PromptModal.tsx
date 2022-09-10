import React from "react";
import create from "zustand";
import { combine } from "zustand/middleware";
import { Button } from "@swipe/ui";
import { Modal } from "./Modal";

interface Props {}

type Fn = (v: string) => void;

const usePromptModalStore = create(
  combine(
    { message: "", value: "", onConfirm: undefined as undefined | Fn },
    (set) => ({
      close: () => set({ message: "", onConfirm: undefined, value: "" }),
      set,
    })
  )
);

export const modalPrompt = (
  message: string,
  onConfirm: Fn,
  defaultValue = ""
) => {
  usePromptModalStore
    .getState()
    .set({ message, onConfirm, value: defaultValue });
};

export const PromptModal: React.FC<Props> = () => {
  const { onConfirm, message, close, value, set } = usePromptModalStore();
  return (
    <Modal isOpen={!!onConfirm} onRequestClose={() => close()}>
      <div className={`mb-4`}>{message}</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          close();
          onConfirm?.(value);
        }}
      >
        {/* <Input
          autoFocus
          value={value}
          onChange={(e) => set({ value: e.target.value })}
        /> */}
        <div className={`flex mt-12`}>
          <Button
            type="button"
            onClick={close}
            className={`mr-3`}
            color="secondary"
          >
            Cancel
          </Button>
          <Button type="submit" className={`ml-3`}>
            Ok
          </Button>
        </div>
      </form>
    </Modal>
  );
};
