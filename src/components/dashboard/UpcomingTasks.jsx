import { FaCalendarAlt, FaFlag } from "react-icons/fa";

export default function UpcomingTasks({ tasks }) {
  const upcoming = tasks
    .filter((task) => !task.completed)
    .sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;

      return new Date(a.dueDate) - new Date(b.dueDate);
    })
    .slice(0, 3);

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg mt-8">

      <h2 className="text-2xl font-bold mb-6">
        📅 Upcoming Tasks
      </h2>

      {upcoming.length === 0 ? (

        <p className="text-gray-400">
          No upcoming tasks.
        </p>

      ) : (

        <div className="space-y-5">

          {upcoming.map((task) => (

            <div
              key={task.id}
              className="bg-slate-800 rounded-xl p-5 flex justify-between items-center hover:bg-slate-700 transition"
            >

              <div>

                <h3 className="text-xl font-semibold">
                  {task.title}
                </h3>

                <p className="text-gray-400 mt-2">
                  {task.description}
                </p>

              </div>

              <div className="text-right">

                <div className="flex items-center gap-2 justify-end text-cyan-400">

                  <FaCalendarAlt />

                  {task.dueDate || "No Date"}

                </div>

                <div className="mt-3">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${
                      task.priority === "High"
                        ? "bg-red-500"
                        : task.priority === "Medium"
                        ? "bg-yellow-500 text-black"
                        : "bg-green-500"
                    }`}
                  >
                    <FaFlag className="inline mr-1" />
                    {task.priority}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}