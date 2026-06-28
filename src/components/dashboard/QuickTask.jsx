export default function QuickTask() {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 mt-8">

      <h2 className="text-2xl font-bold">
        ⚡ Quick Actions
      </h2>

      <div className="grid md:grid-cols-4 gap-4 mt-6">

        <button className="bg-cyan-600 rounded-xl p-4 hover:bg-cyan-700 transition">
          ➕ Add Task
        </button>

        <button className="bg-violet-600 rounded-xl p-4 hover:bg-violet-700 transition">
          🤖 AI Planner
        </button>

        <button className="bg-green-600 rounded-xl p-4 hover:bg-green-700 transition">
          📅 Calendar
        </button>

        <button className="bg-orange-600 rounded-xl p-4 hover:bg-orange-700 transition">
          📊 Analytics
        </button>

      </div>

    </div>
  );
}