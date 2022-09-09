import { RequestHandler, Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import {
  createTokens,
  RefreshTokenData,
  AccessTokenData,
} from "./createTokens";
import { prisma } from "../main";

export const isAuth: (st?: boolean) => RequestHandler<{}, any, any, {}> =
  (shouldThrow = true) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accessToken = req.headers["access-token"];
    if (typeof accessToken !== "string") {
      return next(
        shouldThrow && res.json({ error: "not authenticated" }).status(401)
      );
    }

    try {
      const data = <AccessTokenData>(
        verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
      );
      req.userId = data.userId;
      return next();
    } catch {}

    const refreshToken = req.headers["refresh-token"];
    if (typeof refreshToken !== "string") {
      return next(
        shouldThrow && res.json({ error: "not authenticated" }).status(401)
      );
    }

    let data;
    try {
      data = <RefreshTokenData>(
        verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
      );
    } catch {
      return next(
        shouldThrow && res.json({ error: "not authenticated" }).status(401)
      );
    }

    const user = await prisma.user.findFirst({ where: { id: data.userId } });
    // token has been invalidated or user deleted
    if (!user || user.tokenVersion !== data.tokenVersion) {
      return next(
        shouldThrow && res.json({ error: "not authenticated" }).status(401)
      );
    }

    const tokens = createTokens(user);

    res.setHeader("refresh-token", tokens.refreshToken);
    res.setHeader("access-token", tokens.accessToken);
    req.userId = data.userId;

    next();
  };
