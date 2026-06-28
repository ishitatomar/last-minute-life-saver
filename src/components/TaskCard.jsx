import { toggleTask } from "../services/taskService";

export default function TaskCard({ task, onDelete, refresh }) {
     async function handleComplete() {
  await toggleTask(task.id, !task.completed);
  await refresh();
}

  return (
    <div className="bg-slate-900 rounded-xl p-5 flex justify-between items-center">

      <div>

        <h2
          className={`text-2xl font-bold ${
            task.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {task.title}
        </h2>

        <p className="text-gray-400 mt-2">
          {task.description}
        </p>

        <div className="flex gap-3 mt-3 text-sm">

          <span className="bg-cyan-600 px-3 py-1 rounded-full">
            {task.category}
          </span>

          <span className="bg-red-600 px-3 py-1 rounded-full">
            {task.priority}
          </span>

          <span className="bg-green-600 px-3 py-1 rounded-full">
            {task.dueDate}
          </span>

        </div>

      </div>

      <div className="flex gap-3">

        <button
          onClick={handleComplete}
          className={`px-4 py-2 rounded-lg ${
            task.completed
              ? "bg-yellow-500"
              : "bg-green-600"
          }`}
        >
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 px-4 py-2 rounded-lg"
        >
          Delete
        </button>

      </div>

    </div>
  );
}