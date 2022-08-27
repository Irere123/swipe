import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { __prod__ } from "../../constants";

const router = Router();
const prisma = new PrismaClient();

router.get("/:id", async (req, res) => {
  const user = await prisma.user.findFirst({ where: { id: req.params.id } });

  if (user) {
    return res.json({ user });
  }

  return res.json({ user });
});

export default router;
