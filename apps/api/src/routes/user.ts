import { Router } from "express";
import { prisma } from "../main";

const router = Router();

router.get("/:id", async (req, res) => {
  const user = await prisma.user.findFirst({ where: { id: req.params.id } });
  if (!user) {
    res.json({ user: null, error: "The user you looking for does not exist" });
  }

  res.json({ user });
});

export default router;
