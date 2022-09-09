import * as React from "react";
import create from "zustand";
import { combine } from "zustand/middleware";
import { Button } from "./Button";
import { Modal } from "./Modal";

interface Props {}

type Fn = () => void;

const useConfirmModalStore = create(
  combine(
    {
      message: "",
      onConfirm: undefined as undefined | Fn,
    },
    (set) => ({
      close: () => set({ onConfirm: undefined, message: "" }),
      set,
    })
  )
);

export const modalConfirm = (message: string, onConfirm: Fn) => {
  useConfirmModalStore.getState().set({ onConfirm, message });
};

export const ConfirmModal: React.FC<Props> = () => {
  const { onConfirm, message, close } = useConfirmModalStore();
  return (
    <Modal isOpen={!!onConfirm} onRequestClose={() => close()}>
      <div className="flex flex-col">
        <div className={`flex text-primary-100`}>{message}</div>
        <div className={`flex  mt-6 items-center`}>
          <Button
            onClick={() => {
              close();
              onConfirm?.();
            }}
            type="submit"
          >
            Yes
          </Button>
          <Button
            type="button"
            onClick={close}
            className={`ml-4`}
            color="transparent"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
