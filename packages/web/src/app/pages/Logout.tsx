import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTokenStore } from "../modules/auth/useTokenStore";

export const Logout: React.FC = () => {
  const navigate = useNavigate();
  const hasTokens = useTokenStore((x) => !!x.accessToken && !!x.refreshToken);

  if (hasTokens) {
    useTokenStore.getState().setTokens({ accessToken: "", refreshToken: "" });
  }
  useEffect(() => {
    navigate("/");
  });
  return null;
};
