import { FaSun } from "react-icons/fa";

export default function DashboardHeader() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <div className="bg-slate-900 rounded-2xl p-8 shadow-lg flex justify-between items-center">

      <div>

        <h1 className="text-4xl font-bold text-white flex items-center gap-3">
          <FaSun className="text-yellow-400" />
          {greeting}, Ishita 👋
        </h1>

        <p className="text-gray-400 mt-3 text-lg">
          Stay focused. Every small step counts.
        </p>

      </div>

      <div className="text-right">

        <p className="text-cyan-400 font-semibold text-xl">
          Last Minute Life Saver
        </p>

        <p className="text-gray-500 mt-2">
          AI Productivity Companion
        </p>

      </div>

    </div>
  );
}