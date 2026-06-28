const express = require("express");
const { chat, studyPlan } = require("../controllers/aiController");

const router = express.Router();

router.post("/chat", chat);
router.post("/study-plan", studyPlan);

module.exports = router;