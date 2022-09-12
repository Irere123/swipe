import { Router } from "express";
import { View } from "@prisma/client";
import { prisma, wsSend } from "../main";
import { getUserIdOrder } from "../lib/getUserIdOrder";

const router = Router();

router.post("/view", async (req, res) => {
  const { userId, liked } = req.body;
  let fav: View | undefined | null = undefined;
  try {
    const [_fav] = await Promise.all([
      liked
        ? await prisma.view.findFirst({
            where: { viewerId: userId, targetId: req.userId, liked: true },
          })
        : Promise.resolve(undefined),
      await prisma.view.create({
        data: { viewerId: req.userId, targetId: userId, liked },
      }),
    ]);
    fav = _fav;
  } catch (err: any) {
    if (err.message.includes("duplicate key")) {
      res.json({
        match: false,
        ok: false,
      });
      return;
    } else {
      throw err;
    }
  }

  let match = false;
  if (fav) {
    await prisma.match.create({ data: getUserIdOrder(userId, req.userId!) });
    match = true;
  }

  res.json({
    match,
    ok: true,
  });

  if (liked) {
    await prisma.$queryRaw`
      UPDATE "users" u SET "numLikes"  = u."numLikes" + 1 WHERE u."id" IN (${userId}::UUID)
    `;
    wsSend(userId, { type: "new-like" });
  }
});

export default router;
