import fetch from "node-fetch";

async function callAI(prompt) {
  const API_KEY = process.env.OPENROUTER_API_KEY;

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5174",
        "X-Title": "Last Minute Life Saver",
      },
      body: JSON.stringify({
        model: "openrouter/auto",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    }
  );

  const data = await response.json();

  console.log("STATUS:", response.status);
  console.log("DATA:", JSON.stringify(data, null, 2));

  if (!response.ok) {
    throw new Error(data.error?.message || "OpenRouter Error");
  }

  return data.choices[0].message.content;
}

export async function generateChat(tasks, message) {
  const question = message.toLowerCase();

  let prompt = "";

  if (
    question.includes("plan") ||
    question.includes("schedule") ||
    question.includes("today")
  ) {
    prompt = `
You are an AI Productivity Planner.

Current Tasks:
${JSON.stringify(tasks, null, 2)}

Create a practical timetable.

Include:

Morning

Afternoon

Evening

Breaks

One productivity tip.
`;
  }

  else if (
    question.includes("urgent") ||
    question.includes("priority")
  ) {
    prompt = `
Current Tasks:
${JSON.stringify(tasks, null, 2)}

Identify urgent tasks.

Explain why.

Give one recommendation.
`;
  }

  else if (
    question.includes("break") ||
    question.includes("subtask")
  ) {
    prompt = `
Current Tasks:
${JSON.stringify(tasks, null, 2)}

Break every task into actionable subtasks.
`;
  }

  else if (
    question.includes("motivate") ||
    question.includes("motivation")
  ) {
    prompt = `
Current Tasks:
${JSON.stringify(tasks, null, 2)}

Write a motivational message.

Maximum 120 words.
`;
  }

  else if (
    question.includes("productivity") ||
    question.includes("analyze")
  ) {
    prompt = `
Current Tasks:
${JSON.stringify(tasks, null, 2)}

Analyze productivity.

Mention:

Strengths

Weaknesses

Suggestions
`;
  }

  else {
    prompt = `
You are Last Minute Life Saver AI.

Current Tasks:
${JSON.stringify(tasks, null, 2)}

User Question:

${message}

Answer naturally.

Maximum 200 words.
`;
  }

  return await callAI(prompt);
}

export async function generateStudyPlan(tasks) {
  const prompt = `
You are an expert productivity coach.

Tasks:

${JSON.stringify(tasks, null, 2)}

Create a realistic study plan.

Requirements:

Prioritize High Priority tasks.

Consider due dates.

Use estimated time.

Suggest breaks.

Give three productivity tips.

Keep under 250 words.
`;

  return await callAI(prompt);
}