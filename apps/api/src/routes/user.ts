import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const user = await prisma.user.findFirst({ where: { id: req.userId } });

  res.json(user);
});

export default router;
