import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { __prod__ } from "../../constants";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (_, res) => {
  const users = await prisma.user.findMany();

  return res.json({ users });
});

router.get("/test-info", async (req, res) => {
  if (!__prod__) {
    const { username } = req.query as any;
    const user = await prisma.user.findFirst({ where: { username } });

    if (!user) {
      const user = await prisma.user.create({
        data: {
          username,
          displayName: String(username).toUpperCase(),
          avatarUrl: "https://placekitten.com/200/200",
          bannerUrl: "https://placekitten.com/1000/300",
          birthday: new Date(),
          class: "Year2",
          schoolName: "MIT",
          bio: "This is some interesting info about the ex-founder of nothing, welcome to the bio of such cool person!",
          gender: "Male",
          goal: "Friendship",
          location: "Rwanda",
        },
      });

      return res.json({ user });
    }

    return res.json({ user: user });
  } else {
    return res.json({ error: "no" });
  }
});

export default router;
