import create from "zustand";
import { combine } from "zustand/middleware";
import { __prod__ } from "../app/constants";

const accessTokenKey = "@eboo/token" + (__prod__ ? "" : "dev");
const refreshTokenKey = "@eboo/refresh-token" + (__prod__ ? "" : "dev");

const getDefaultValues = () => {
  try {
    return {
      accessToken: localStorage.getItem(accessTokenKey) || "",
      refreshToken: localStorage.getItem(refreshTokenKey) || "",
    };
  } catch {
    return {
      accessToken: "",
      refreshToken: "",
    };
  }
};

export const useTokenStore = create(
  combine(getDefaultValues(), (set) => ({
    setTokens: (x: { accessToken: string; refreshToken: string }) => {
      try {
        localStorage.setItem(accessTokenKey, x.accessToken);
        localStorage.setItem(refreshTokenKey, x.refreshToken);
      } catch {}

      set(x);
    },
  }))
);
