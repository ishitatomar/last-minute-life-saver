import { useState } from "react";
import { generateStudyPlan } from "../services/geminiService";

export default function AIPlanner() {
  const [tasks, setTasks] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  async function generatePlan() {
    if (!tasks.trim()) return;

    setLoading(true);

    try {
      const result = await generateStudyPlan([
        {
          title: tasks,
        },
      ]);

      setPlan(result);
    } catch (error) {
      console.error(error);

      setPlan(
        error.message ||
          "❌ Failed to generate study plan."
      );
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        🤖 AI Planner
      </h1>

      <textarea
        rows="8"
        placeholder="Enter today's tasks..."
        value={tasks}
        onChange={(e) => setTasks(e.target.value)}
        className="w-full bg-slate-900 rounded-xl p-5"
      />

      <button
        onClick={generatePlan}
        disabled={loading}
        className="mt-5 bg-violet-600 px-6 py-3 rounded-xl disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Plan"}
      </button>

      {plan && (
        <div className="bg-slate-900 rounded-xl p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Today's Plan
          </h2>

          <div className="whitespace-pre-wrap">
            {plan}
          </div>
        </div>
      )}

    </div>
  );
}