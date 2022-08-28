import { Connection } from "./conn";
import { User } from "./types";

type Handler<Data> = (data: Data) => void;

export type Wrapper = ReturnType<typeof wrap>;

export const wrap = (connection: Connection) => ({
  connection,
  subscribe: {},
  query: {
    getUserProfile: (
      username: string
    ): Promise<{ user: User } | { error: string }> =>
      connection.fetch("get_user_profile", { username }) as any,
  },
  mutation: {},
});
