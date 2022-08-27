export const __prod__ = process.env.NODE_ENV === "production";
export const apiBaseUrl = __prod__
  ? "https://api-swipe.herokuapp.com"
  : "http://localhost:4000";
