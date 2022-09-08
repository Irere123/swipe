export const __prod__ = process.env.NODE_ENV === "production";
export const frontendUrl = !__prod__
  ? "http://localhost:3002"
  : "https://swipereal.vercel.app";
