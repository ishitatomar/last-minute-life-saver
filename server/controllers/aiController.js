import { auth } from "../firebase/firebaseAdmin.js";
import {
  generateChat,
  generateStudyPlan,
} from "../services/geminiService.js";

export async function chat(req, res) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing.",
      });
    }

    const token = authHeader.split("Bearer ")[1];

    await auth.verifyIdToken(token);

    const { tasks, message } = req.body;

    const response = await generateChat(tasks, message);

    return res.json({
      success: true,
      response,
      remaining: 999,
    });

  } catch (error) {
    console.error("AI Chat Error:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "AI Error",
    });
  }
}

export async function studyPlan(req, res) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing.",
      });
    }

    const token = authHeader.split("Bearer ")[1];

    await auth.verifyIdToken(token);

    const { tasks } = req.body;

    const response = await generateStudyPlan(tasks);

    return res.json({
      success: true,
      response,
      remaining: 999,
    });

  } catch (error) {
    console.error("Study Plan Error:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "AI Error",
    });
  }
}