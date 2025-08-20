import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Message router works!");
});

export default router;
