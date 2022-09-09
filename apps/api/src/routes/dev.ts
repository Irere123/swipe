import { Router } from "express";
import { prisma } from "../main";
import { createTokens } from "../lib/createTokens";

const router = Router();

router.get("/test-info", async (req, res) => {
  const username = req.query.username as string;
  let user = await prisma.user.findFirst({ where: { username } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        username: username.split(" ").join("_"),
        displayName: username.toUpperCase(),
        avatarUrl: "http://placekitten.com/200/200",
        bio: "This is my cool bio as the founder of this whole thing hope you are having fun",
        gender: "male",
        goal: "love",
        googleId: `id:${username}`,
        googleAccessToken: `${username}'s accesstoken`,
        birthday: new Date(),
      },
    });

    return res.json(createTokens(user));
  }

  return res.json(createTokens(user));
});

export default router;
