import { FaBullseye, FaClock, FaCalendarAlt } from "react-icons/fa";

export default function FocusCard({ tasks }) {
  const pending = tasks.filter((task) => !task.completed);

  if (pending.length === 0) {
    return (
      <div className="bg-slate-900 rounded-2xl p-6 shadow-lg mt-8">
        <h2 className="text-2xl font-bold text-white">
          🎯 Today's Focus
        </h2>

        <p className="text-gray-400 mt-4">
          Great job! You have no pending tasks.
        </p>
      </div>
    );
  }

  const priorityOrder = {
    High: 3,
    Medium: 2,
    Low: 1,
  };

  const focusTask = pending.sort(
    (a, b) =>
      (priorityOrder[b.priority] || 0) -
      (priorityOrder[a.priority] || 0)
  )[0];

  return (
    <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-2xl p-8 shadow-xl mt-8">

      <h2 className="text-3xl font-bold flex items-center gap-3">
        <FaBullseye />
        Today's Focus
      </h2>

      <h1 className="text-4xl font-bold mt-6">
        {focusTask.title}
      </h1>

      <p className="mt-4 text-lg text-cyan-100">
        {focusTask.description}
      </p>

      <div className="flex flex-wrap gap-6 mt-6">

        <div className="flex items-center gap-2">
          <FaClock />
          {focusTask.estimatedTime || "Not Specified"}
        </div>

        <div className="flex items-center gap-2">
          <FaCalendarAlt />
          {focusTask.dueDate || "No Due Date"}
        </div>

        <div className="bg-white text-blue-700 px-4 py-2 rounded-full font-semibold">
          {focusTask.priority}
        </div>

      </div>

      <button className="mt-8 bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:scale-105 transition">
        🚀 Start Focus
      </button>

    </div>
  );
}