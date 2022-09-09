export const __prod__ = process.env.NODE_ENV === "production";
export const apiBaseUrl = !__prod__
  ? "http://localhost:4000"
  : "https://api.com";
