import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { createTokens } from "../lib/tokenUtils";

const router = Router();
const prisma = new PrismaClient();

router.get("/test-info", async (req, res) => {
  const username = req.query.username as string;
  const user = await prisma.user.findFirst({ where: { username } });

  if (!user) {
    const u = await prisma.user.create({
      data: {
        username: username,
        bio: "This my dating cool bio if you would like to chat with me match me",
        gender: "Male",
        schoolName: "DIS",
        location: "Musanze, Rwanda",
        birthday: new Date() as any,
        avatarUrl: "http://placekitten.com/200/200",
      },
    });

    res.json(createTokens(u));
  }

  res.json(createTokens(user));
});

export default router;
