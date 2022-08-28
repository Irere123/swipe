import * as React from "react";
import { Modal } from "./Modal";
import create from "zustand";
import { combine } from "zustand/middleware";
import { Button } from "./Button";

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
      <div className=" text-primary-100">{message}</div>
      <div className={`flex mt-12`}>
        <Button
          onClick={() => {
            close();
            onConfirm?.();
          }}
          type="submit"
          className={`mr-1.5`}
        >
          Yes
        </Button>
        <Button
          type="button"
          onClick={close}
          className={`ml-1.5`}
          color="secondary"
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};
