import create from "zustand";
import { combine } from "zustand/middleware";

export const useModalStore = create(
  combine({ openLoginModal: false }, (set) => ({
    setOpenLoginModal: (open: boolean) => {
      set({ openLoginModal: open });
    },
  }))
);
