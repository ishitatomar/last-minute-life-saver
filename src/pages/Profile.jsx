import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getTasks } from "../services/taskService";

export default function Profile() {
  const navigate = useNavigate();

  const auth = getAuth();
  const user = auth.currentUser;

  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getTasks();
      setTasks(data);
    }

    load();
  }, []);

  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.filter((t) => !t.completed).length;

  const recentTasks = [...tasks].reverse().slice(0, 5);

  const achievements = [
    {
      icon: "🥇",
      title: "First Task",
      description: "Create your first task.",
      unlocked: tasks.length >= 1,
    },
    {
      icon: "🏆",
      title: "Task Master",
      description: "Complete 10 tasks.",
      unlocked: completed >= 10,
    },
    {
      icon: "🔥",
      title: "Productivity Streak",
      description: "Complete 20 tasks.",
      unlocked: completed >= 20,
    },
    {
      icon: "🤖",
      title: "AI Planner",
      description: "Used AI Study Planner.",
      unlocked: true,
    },
  ];

  async function logout() {
    await signOut(auth);
    navigate("/");
  }

  function editProfile() {
    window.open("https://myaccount.google.com/", "_blank");
  }

  function securitySettings() {
    window.open(
      "https://myaccount.google.com/security",
      "_blank"
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar />

      <div className="flex-1 p-8">

        

        <h1 className="text-4xl font-bold mb-8">
          👤 My Profile
        </h1>

        {/* ================= TOP ================= */}

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Profile */}

          <div className="bg-slate-900 rounded-3xl p-8 shadow-xl">

            <div className="flex flex-col items-center">

              <img
                src={user?.photoURL}
                alt="profile"
                className="w-36 h-36 rounded-full border-4 border-cyan-500 shadow-lg"
              />

              <h2 className="text-3xl font-bold mt-6">
                {user?.displayName}
              </h2>

              <p className="text-gray-400 mt-2">
                Google Account
              </p>

              <button
                onClick={editProfile}
                className="mt-8 w-full bg-gradient-to-r from-cyan-500 to-violet-600 rounded-xl py-3 font-semibold hover:scale-105 transition"
              >
                ✏ Edit Google Profile
              </button>

            </div>

          </div>

          {/* Account */}

          <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-8 shadow-xl">

            <h2 className="text-2xl font-bold mb-8">
              Account Details
            </h2>

            <div className="grid md:grid-cols-2 gap-8">

              <div>

                <p className="text-gray-400">
                  Name
                </p>

                <h3 className="text-xl font-semibold mt-2">
                  {user?.displayName}
                </h3>

              </div>

              <div>

                <p className="text-gray-400">
                  Email
                </p>

                <h3 className="text-xl font-semibold mt-2 break-all">
                  {user?.email}
                </h3>

              </div>

              <div>

                <p className="text-gray-400">
                  Member Since
                </p>

                <h3 className="text-xl font-semibold mt-2">
                  {user?.metadata?.creationTime
                    ? new Date(
                        user.metadata.creationTime
                      ).toLocaleDateString()
                    : "N/A"}
                </h3>

              </div>

              <div>

                <p className="text-gray-400">
                  Email Status
                </p>

                <h3 className="text-xl font-semibold mt-2 text-green-400">
                  {user?.emailVerified
                    ? "✅ Verified"
                    : "❌ Not Verified"}
                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* ================= ACHIEVEMENTS ================= */}

        <div className="mt-10">

          <div className="bg-slate-900 rounded-3xl p-8 shadow-xl">

            <h2 className="text-3xl font-bold mb-8">
              🏆 Achievements
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              {achievements.map((item, index) => (

                <div
                  key={index}
                  className={`rounded-2xl p-5 transition ${
                    item.unlocked
                      ? "bg-slate-800 border border-cyan-500"
                      : "bg-slate-800 opacity-50"
                  }`}
                >

                  <div className="flex justify-between items-center">

                    <div className="text-4xl">
                      {item.icon}
                    </div>

                    <span>

                      {item.unlocked
                        ? "✅"
                        : "🔒"}

                    </span>

                  </div>

                  <h3 className="text-xl font-bold mt-4">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 mt-2">
                    {item.description}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>
        
                {/* ================= SETTINGS + RECENT ACTIVITY ================= */}

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          {/* Settings */}

          <div className="bg-slate-900 rounded-3xl p-8 shadow-xl">

            <h2 className="text-3xl font-bold mb-8">
              ⚙️ Account Settings
            </h2>

            <div className="space-y-5">

              {/* Google Profile */}

              <button
                onClick={editProfile}
                className="w-full bg-slate-800 hover:bg-cyan-600 rounded-xl p-5 transition flex justify-between items-center"
              >
                <span>👤 Edit Google Profile</span>

                <span>↗</span>

              </button>

              {/* Security */}

              <button
                onClick={securitySettings}
                className="w-full bg-slate-800 hover:bg-cyan-600 rounded-xl p-5 transition flex justify-between items-center"
              >
                <span>🔒 Google Security</span>

                <span>↗</span>

              </button>


              {/* Notifications */}

              <button
                onClick={() =>
                  setNotifications(!notifications)
                }
                className="w-full bg-slate-800 hover:bg-cyan-600 rounded-xl p-5 transition flex justify-between items-center"
              >
                <span>🔔 Notifications</span>

                <span
                  className={`font-bold ${
                    notifications
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {notifications
                    ? "Enabled"
                    : "Disabled"}
                </span>

              </button>

            </div>

          </div>

          {/* Recent Activity */}

          <div className="bg-slate-900 rounded-3xl p-8 shadow-xl">

            <h2 className="text-3xl font-bold mb-8">
              🕒 Recent Activity
            </h2>

            <div className="space-y-4">

              {recentTasks.length === 0 ? (

                <div className="bg-slate-800 rounded-xl p-6 text-center text-gray-400">

                  No recent activity.

                </div>

              ) : (

                recentTasks.map((task) => (

                  <div
                    key={task.id}
                    className="bg-slate-800 rounded-xl p-5 flex justify-between items-center"
                  >

                    <div>

                      <h3 className="font-semibold">

                        {task.completed
                          ? "✅"
                          : "📋"}{" "}

                        {task.title}

                      </h3>

                      <p className="text-gray-400 text-sm mt-1">

                        {task.category}

                      </p>

                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        task.completed
                          ? "bg-green-600"
                          : "bg-yellow-500"
                      }`}
                    >

                      {task.completed
                        ? "Completed"
                        : "Pending"}

                    </span>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>

        {/* ================= LOGOUT ================= */}

        <div className="mt-10 flex justify-end">

          <button
            onClick={logout}
            className="bg-gradient-to-r from-red-500 to-red-700 hover:scale-105 transition px-8 py-3 rounded-xl font-semibold shadow-lg"
          >
            🚪 Logout
          </button>

        </div>

      </div>

    </div>

  );
}
