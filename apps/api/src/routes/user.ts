import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router();
const prisma = new PrismaClient();

router.get("/:id", async (req, res) => {
  const id = req.query.id as string;
  const user = await prisma.user.findFirst({ where: { id } });

  res.json(user);
});

export default router;
