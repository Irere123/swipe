import { Router } from "express";
import { validate as validateUUID } from "uuid";
import { isAuth } from "../lib/isAuth";
import { prisma } from "../main";

const router = Router();

router.get("/profile/:id", async (req, res) => {
  const id = req.params.id;
  if (validateUUID(id)) {
    res.json({ user: null, error: "That's not a uuid" });
  }
  const user = await prisma.user.findFirst({ where: { id } });
  if (!user) {
    res.json({ user: null, error: "The user you looking for does not exist" });
  }

  res.json({ user });
});

router.post("/delete", isAuth(), async (req, res) => {
  if (validateUUID(req.userId!)) {
    await prisma.user.delete({ where: { id: req.userId } });
  }

  res.json({
    ok: true,
  });
});

router.post("/edit", isAuth(), async (req, res) => {
  const { id, username, displayName, bio, location, birthday }: any = req.body;
  let user;
  try {
    user = await prisma.user.update({
      data: {
        username,
        displayName,
        bio,
        location,
        birthday,
        hasLoggedIn: true,
      },
      where: { id },
    });
  } catch (err) {
    console.log(err);
    res.json(err).status(500);
  }

  res.json(user).status(200);
});

export default router;
