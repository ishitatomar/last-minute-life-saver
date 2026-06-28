import express from "express";

import {
  chat,
  studyPlan,
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/chat", chat);

router.post("/study-plan", studyPlan);

export default router;