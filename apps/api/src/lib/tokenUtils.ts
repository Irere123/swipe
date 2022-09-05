import { sign } from "jsonwebtoken";
import { User } from "@prisma/client";

export type RefreshTokenData = {
  userId: string;
  tokenVersion?: number;
};

export type AccessTokenData = {
  userId: string;
};

export const createTokens = (
  user: User
): { refreshToken: string; accessToken: string } => {
  const refreshToken = sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "30d",
    }
  );
  const accessToken = sign(
    { userId: user.id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "60min",
    }
  );

  return { refreshToken, accessToken };
};
