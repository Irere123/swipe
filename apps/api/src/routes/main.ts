import { Router } from "express";

const router = Router();

router.post("/view", (_req, res) => {
  res.send("hello world");
});

export default router;
