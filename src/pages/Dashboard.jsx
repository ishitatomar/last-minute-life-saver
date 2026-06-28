import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import StatsSection from "../components/dashboard/StatsSection";

import {
  addTask,
  getTasks,
  deleteTask,
} from "../services/taskService";

export default function Dashboard() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [category, setCategory] = useState("Study");

  async function loadTasks() {
    const data = await getTasks();
    setTasks(data);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function createTask() {
    if (!title.trim()) return;

    await addTask({
  title,
  description,
  priority,
  dueDate,
  estimatedTime,
  category,
  completed: false,
  createdAt: new Date(),
  userId: auth.currentUser.uid,
});

    setTitle("");
    setDescription("");
    setPriority("Medium");
    setDueDate("");
    setEstimatedTime("");
    setCategory("Study");

    loadTasks();
  }

  async function removeTask(id) {
    await deleteTask(id);
    loadTasks();
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">

        {/* Navbar */}
        <Navbar />

        {/* Statistics */}
        <div className="mt-6">
  <StatsSection tasks={tasks} />
</div>

        {/* Add Task */}

        <div className="bg-slate-900 rounded-2xl p-8 mt-8 shadow-lg">

          <h2 className="text-3xl font-bold mb-6">
            Add New Task
          </h2>

          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none"
          />

          <textarea
            rows="4"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="p-3 rounded-lg bg-slate-800 border border-slate-700"
            >
              <option value="High">🔴 High</option>
              <option value="Medium">🟡 Medium</option>
              <option value="Low">🟢 Low</option>
            </select>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="p-3 rounded-lg bg-slate-800 border border-slate-700"
            />

            <input
              type="text"
              placeholder="Estimated Time (Example: 2 Hours)"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
              className="p-3 rounded-lg bg-slate-800 border border-slate-700"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-3 rounded-lg bg-slate-800 border border-slate-700"
            >
              <option>Study</option>
              <option>Work</option>
              <option>Hackathon</option>
              <option>Meeting</option>
              <option>Health</option>
              <option>Personal</option>
              <option>Other</option>
            </select>

          </div>

          <div className="flex gap-4 mt-6">

            <button
              onClick={createTask}
              className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-semibold transition"
            >
              ➕ Add Task
            </button>

            <button
              onClick={() => navigate("/chat")}
              className="bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-xl font-semibold transition"
            >
              🤖 Open AI Assistant
            </button>

          </div>

        </div>

        {/* My Tasks */}

        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-5">
            My Tasks
          </h2>

          {tasks.length === 0 ? (

            <div className="bg-slate-900 rounded-xl p-8 text-center text-gray-400">
              No tasks available.
            </div>

          ) : (

            <div className="space-y-5">

              {tasks.map((task) => (

                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={removeTask}
                  refresh={loadTasks}
                />

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}