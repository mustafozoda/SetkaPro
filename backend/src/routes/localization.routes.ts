import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Localization routes will be here soon." });
});

export default router;
