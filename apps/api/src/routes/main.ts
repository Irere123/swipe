import { Router } from "express";
import { View } from "@prisma/client";
import { prisma, wsSend, wsUsers } from "../main";
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
    console.log("Error", err);
    if (err.message.includes("Unique constraint failed")) {
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

router.post("/unmatch", async (req, res) => {
  const { userId } = req.body;
  const { userId1, userId2 } = getUserIdOrder(req.userId!, userId);

  await prisma.$queryRaw`
    delete from matches m where m."userId1"=${userId1}::UUID 
    and m."userId2" =${userId2}::UUID
  `;
  wsSend(userId, { type: "unmatch", userId: req.userId });

  res.json({ ok: true });
});

router.post("/message", async (req, res) => {
  const m = await prisma.message.create({
    data: {
      ...req.body,
      senderId: req.userId,
    },
  });

  wsSend(m.receiverId!, { type: "new-message", message: m });

  res.send({ message: m });

  if (
    !(m.receiverId! in wsUsers) ||
    wsUsers[m.receiverId!].openChatUserId !== req.userId
  ) {
    const userIdOrder = getUserIdOrder(req.userId!, m.receiverId!);
    await prisma.$queryRaw`
     UPDATE matches m SET ${
       userIdOrder.userId1 === m.receiverId ? "read1" : "read2"
     } = false where m."userId1"=${userIdOrder.userId1}::UUID and 
     m."userId2"=${userIdOrder.userId2}::UUID
    `;
  }
});

export default router;
