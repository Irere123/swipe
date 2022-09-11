import { apiBaseUrl } from "../constants";

export const query = async (path: string) => {
  try {
    const r = await fetch(apiBaseUrl + path);

    if (r.status !== 200) {
      throw new Error(await r.text());
    }
    const d = await r.json();
    return d;
  } catch (err) {
    throw err;
  }
};
