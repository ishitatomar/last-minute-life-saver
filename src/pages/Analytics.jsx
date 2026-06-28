import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks } from "../services/taskService";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const STATUS_COLORS = [
  "#22C55E",
  "#FACC15",
  "#EF4444",
];

export default function Analytics() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getTasks();
      setTasks(data);
    }

    load();
  }, []);

  // =======================
  // Statistics
  // =======================

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    task => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    task => !task.completed
  ).length;

  const overdueTasks = tasks.filter(
    task =>
      !task.completed &&
      task.dueDate &&
      new Date(task.dueDate) < new Date()
  ).length;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  // =======================
  // Pie Chart
  // =======================

  const pieData = [
    {
      name: "Completed",
      value: completedTasks,
    },
    {
      name: "Pending",
      value: pendingTasks,
    },
    {
      name: "Overdue",
      value: overdueTasks,
    },
  ];

  // =======================
  // Categories
  // =======================

  const categoryMap = {};

  tasks.forEach(task => {
    const category =
      task.category || "Other";

    categoryMap[category] =
      (categoryMap[category] || 0) + 1;
  });

  const categoryData =
    Object.keys(categoryMap).map(
      category => ({
        category,
        tasks: categoryMap[category],
      })
    );

  // =======================
  // Upcoming Tasks
  // =======================

  const upcomingTasks = tasks
    .filter(task => !task.completed)
    .sort(
      (a, b) =>
        new Date(a.dueDate) -
        new Date(b.dueDate)
    )
    .slice(0, 5);
    return (
  <div className="flex min-h-screen bg-slate-950 text-white">

    {/* ================= SIDEBAR ================= */}

    <div className="w-72 bg-slate-900 border-r border-slate-800 p-6">

      <h1 className="text-3xl font-bold text-cyan-400 mb-10">
        📊 Analytics
      </h1>

      <div className="space-y-3">

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full text-left bg-slate-800 hover:bg-cyan-600 rounded-xl p-3 transition"
        >
          🏠 Dashboard
        </button>

        <button
          onClick={() => navigate("/calendar")}
          className="w-full text-left bg-slate-800 hover:bg-cyan-600 rounded-xl p-3 transition"
        >
          📅 Calendar
        </button>

        <button
          onClick={() => navigate("/chat")}
          className="w-full text-left bg-slate-800 hover:bg-cyan-600 rounded-xl p-3 transition"
        >
          🤖 AI Assistant
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="w-full text-left bg-slate-800 hover:bg-cyan-600 rounded-xl p-3 transition"
        >
          👤 Profile
        </button>

      </div>

      <hr className="my-8 border-slate-700" />

      <div className="space-y-5">
        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">
            Overdue Tasks
          </p>

          <h2 className="text-4xl font-bold mt-2 text-red-400">
            {overdueTasks}
          </h2>
        </div>

      </div>

    </div>

    {/* ================= MAIN CONTENT ================= */}

    <div className="flex-1 p-8">

      <h1 className="text-4xl font-bold mb-8">
        📊 Analytics Dashboard
      </h1>

      {/* ================= KPI CARDS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">
          <p className="text-gray-400">
            Total Tasks
          </p>

          <h2 className="text-4xl font-bold mt-2 text-cyan-400">
            {totalTasks}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">
          <p className="text-gray-400">
            Completed
          </p>

          <h2 className="text-4xl font-bold mt-2 text-green-400">
            {completedTasks}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">
          <p className="text-gray-400">
            Pending
          </p>

          <h2 className="text-4xl font-bold mt-2 text-yellow-400">
            {pendingTasks}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">
          <p className="text-gray-400">
            Completion
          </p>

          <h2 className="text-4xl font-bold mt-2 text-violet-400">
            {completionRate}%
          </h2>
        </div>

      </div>

      {/* ================= CHARTS ================= */}

      <div className="grid lg:grid-cols-2 gap-8 mb-8">

        {/* Pie Chart */}

        <div className="bg-slate-900 rounded-2xl p-6 shadow-xl">

          <h2 className="text-2xl font-bold mb-6">
            📌 Task Status
          </h2>

          <ResponsiveContainer width="100%" height={320}>

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={110}
                label
              >

                {pieData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={STATUS_COLORS[index]}
                  />

                ))}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* Category Chart */}

        <div className="bg-slate-900 rounded-2xl p-6 shadow-xl">

          <h2 className="text-2xl font-bold mb-6">
            📚 Tasks by Category
          </h2>

          <ResponsiveContainer width="100%" height={320}>

            <BarChart data={categoryData}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
              />

              <XAxis
                dataKey="category"
                stroke="#CBD5E1"
              />

              <YAxis
                stroke="#CBD5E1"
              />

              <Tooltip />

              <Bar
                dataKey="tasks"
                fill="#06B6D4"
                radius={[10,10,0,0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>
            {/* ================= PRODUCTIVITY ================= */}

      <div className="grid lg:grid-cols-2 gap-8 mb-8">

        <div className="bg-slate-900 rounded-2xl p-6 shadow-xl">

          <h2 className="text-2xl font-bold mb-6">
            ⭐ Productivity
          </h2>

          <div className="w-full bg-slate-700 rounded-full h-5 overflow-hidden">

            <div
              className="bg-gradient-to-r from-cyan-500 to-violet-500 h-5 rounded-full transition-all duration-500"
              style={{
                width: `${completionRate}%`,
              }}
            />

          </div>

          <div className="mt-6 flex justify-between text-lg">

            <span className="text-gray-300">
              Progress
            </span>

            <span className="font-bold text-cyan-400">
              {completionRate}%
            </span>

          </div>

          <p className="mt-5 text-gray-400">
            {completionRate >= 80
              ? "🔥 Excellent! You're completing most of your tasks."
              : completionRate >= 50
              ? "👍 Good progress. Keep going!"
              : "💡 Try completing pending tasks to improve your productivity."}
          </p>

        </div>

        {/* ================= UPCOMING TASKS ================= */}

        <div className="bg-slate-900 rounded-2xl p-6 shadow-xl">

          <h2 className="text-2xl font-bold mb-6">
            📅 Upcoming Deadlines
          </h2>

          {upcomingTasks.length === 0 ? (

            <div className="text-gray-400">
              No upcoming tasks.
            </div>

          ) : (

            upcomingTasks.map((task) => (

              <div
                key={task.id}
                className="flex justify-between items-center border-b border-slate-700 py-4"
              >

                <div>

                  <h3 className="font-semibold">
                    {task.title}
                  </h3>

                  <p className="text-sm text-gray-400">
                    {task.category}
                  </p>

                </div>

                <div className="text-cyan-400 font-semibold">
                  {task.dueDate}
                </div>

              </div>

            ))

          )}

        </div>

      </div>

      {/* ================= AI INSIGHTS ================= */}

      <div className="bg-slate-900 rounded-2xl p-6 shadow-xl">         

          <div className="bg-slate-800 rounded-xl p-4">
            💡 Recommendation:
            <br />
            Focus on completing high-priority and overdue tasks first to
            improve your productivity score.
          </div>

        

      </div>

    </div>

  </div>
);
}