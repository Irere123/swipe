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
    "secewkqwp320",
    {
      expiresIn: "14d",
    }
  );
  const accessToken = sign({ userId: user.id }, "iuewew", {
    expiresIn: "15min",
  });

  return { refreshToken, accessToken };
};
