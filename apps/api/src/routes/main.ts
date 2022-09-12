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

router.get("/matches/:cursor", async (req, res) => {
  const matches = await prisma.$queryRaw`
      select
      case
        when u.id = ma."userId1" then ma.read2
        else ma.read1
      end "read",
      ma.id "matchId",
      u.id "userId", u."avatarUrl",u."online", u."lastOnline", u."displayName", date_part('epoch', ma."createdAt") * 1000 "createdAt",
      (select json_build_object('text',
      case when char_length(text) > 40
      then substr(text, 0, 40) || '...'
      else text
      end
      , 'createdAt', date_part('epoch', m."createdAt")*1000)
      from messages m
      where (m."receiverId" = ma."userId1" and m."senderId" = ma."userId2")
      or
      (m."senderId" = ma."userId1" and m."receiverId" = ma."userId2")
      order by m."createdAt" desc limit 1) message
      from matches ma
      inner join users u on u.id != ${req.userId}::UUID and (u.id = ma."userId1" or u.id = ma."userId2")
      where (ma."userId1" = ${req.userId}::UUID or ma."userId2" = ${req.userId}::UUID) and ma.unmatched = false
      limit 150
   `;

  res.json({ matches });
});

router.get("/match/:userId", async (req, res) => {
  const { userId } = req.params;
  const match: any = await prisma.$queryRaw`
    select 
    case
      when u.id = ma."userId1" then ma.read2
      else ma.read1
    end "read",
    ma.id "matchId",
    u.id "userId", u."avatarUrl",u."online", u."lastOnline", u."displayName"
    from matches ma
    inner join users u on u.id != ${req.userId}::UUID and (u.id = ma."userId1" or u.id = ma."userId2")
    where (ma."userId1" = ${userId}::UUID or ma."userId2" = ${userId}::UUID) and ma.unmatched = false
    limit 1
   `;

  res.json(match[0]);
});

export default router;
