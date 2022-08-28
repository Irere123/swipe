import { Connection } from "./conn";

type Handler<Data> = (data: Data) => void;

export type Wrapper = ReturnType<typeof wrap>;

export const wrap = (connection: Connection) => ({
  connection,
  subscribe: {},
  query: {},
  mutation: {},
});
