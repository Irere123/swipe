import { useTokenStore } from "../../global-stores/useTokenStore";
import { apiBaseUrl } from "../constants";

export const mutation = async (
  path: string,
  body: any,
  { method }: { method: "POST" | "PUT" } = { method: "POST" }
) => {
  const { accessToken, refreshToken } = useTokenStore.getState();
  try {
    const r = await fetch(apiBaseUrl + path, {
      method,
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
        "access-token": accessToken,
        "refresh-token": refreshToken,
      },
    });
    if (r.status !== 200) {
      throw new Error(await r.text());
    }
    const _accessToken = r.headers.get("access-token");
    const _refreshToken = r.headers.get("refresh-token");
    if (_accessToken && _refreshToken) {
      useTokenStore.getState().setTokens({
        accessToken: _accessToken,
        refreshToken: _refreshToken,
      });
    }
    const d = await r.json();
    return d;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
