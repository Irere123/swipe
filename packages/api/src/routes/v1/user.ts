import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { __prod__ } from "../../constants";
import { verify } from "jsonwebtoken";
import { createTokens, RefreshTokenData } from "../../auth/createTokens";

const router = Router();
const prisma = new PrismaClient();

router.get("/auth", async (req, res) => {
  const { refreshToken } = req.body;

  const verified = <RefreshTokenData>(
    verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
  );

  const user = await prisma.user.findFirst({ where: { id: verified.userId } });

  if (user) {
    return res.json({ user, tokens: createTokens(user) });
  }

  return res.json({ ok: false, error: "not authenticated" });
});

router.get("/:id", async (req, res) => {
  const user = await prisma.user.findFirst({ where: { id: req.params.id } });

  if (user) {
    return res.json({ user });
  }

  return res.json({ user });
});

export default router;
