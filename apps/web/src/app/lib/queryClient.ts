import { QueryClient } from "react-query";
import { useTokenStore } from "../../global-store/useTokenStore";
import { apiBaseUrl } from "./constants";

export const defaultQueryFn = async ({ queryKey }: { queryKey: string }) => {
  const { accessToken, refreshToken } = useTokenStore.getState();

  const r = await fetch(`${apiBaseUrl}${queryKey[0]}`, {
    headers: {
      "access-token": accessToken,
      "refresh-token": refreshToken,
    },
  });

  if (r.status !== 200) {
    throw new Error(await r.text());
  }
  const _accessToken = r.headers.get("access-token");
  const _refreshToken = r.headers.get("refresh-token");
  console.log(_accessToken);

  if (_accessToken && _refreshToken) {
    useTokenStore.getState().setTokens({
      accessToken: _accessToken,
      refreshToken: _refreshToken,
    });
  }

  return await r.json();
};

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (e) => {
        if ("message" in (e as Error)) {
          console.log(e);
        }
      },
    },
    queries: {
      retry: false,
      staleTime: 60 * 1000 * 5,
      onError: (e) => {
        if ("message" in (e as Error)) {
          console.log(e);
        }
      },
      queryFn: defaultQueryFn as any,
    },
  },
});
