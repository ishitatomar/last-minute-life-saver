import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 text-white overflow-hidden">

      {/* Background glow */}
      <div className="absolute w-[600px] h-[600px] bg-cyan-500/20 blur-3xl rounded-full top-[-150px] left-[-150px]" />
      <div className="absolute w-[500px] h-[500px] bg-violet-500/20 blur-3xl rounded-full bottom-[-150px] right-[-150px]" />

      {/* subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* main container */}
      <div className="relative max-w-6xl w-full px-6 grid md:grid-cols-2 gap-14 items-center">

        {/* LEFT */}
        <div className="space-y-6">

          {/* badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-900 border border-slate-700 text-sm text-cyan-400">
            ⚡ AI Productivity Companion
          </div>

          {/* title */}
          <h1 className="text-6xl font-extrabold leading-tight">
            Last Minute{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
              Life Saver
            </span>
          </h1>

          {/* subtitle */}
          <p className="text-lg text-gray-400 leading-relaxed">
            Stop wasting time. Let AI prioritize your tasks, build schedules,
            and guide your productivity in seconds.
          </p>

          {/* small tagline */}
          <p className="text-sm text-gray-500">
            Built for students, developers, and last-minute warriors ⚡
          </p>

          {/* CTA buttons */}
          <div className="flex gap-4 pt-4">

            <Link to="/login">
              <button className="px-36 py-4 bg-cyan-500 rounded-xl hover:bg-cyan-600 transition font-semibold text-lg">
                Get Started
              </button>
            </Link>

            

          </div>

          {/* mini stats */}
          <div className="flex gap-6 pt-6 text-sm text-gray-400">
            <div>⚡ Instant planning</div>
            <div>🧠 AI powered</div>
            <div>📅 Task scheduling</div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="relative">

          {/* main preview card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 backdrop-blur-xl shadow-2xl hover:scale-[1.02] transition">

            <img
              src="/landing.png"
              alt="preview"
              className="rounded-xl w-full"
            />

          </div>

          {/* floating badge 1 */}
          <div className="absolute -top-6 -left-6 bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl shadow-lg">
            <p className="text-cyan-400 text-sm font-semibold">🔥 Smart Planning</p>
            <p className="text-xs text-gray-400">AI organizes chaos</p>
          </div>

          {/* floating badge 2 */}
          <div className="absolute -bottom-6 -right-6 bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl shadow-lg">
            <p className="text-violet-400 text-sm font-semibold">⏱ Time Saver</p>
            <p className="text-xs text-gray-400">Boost productivity</p>
          </div>

        </div>

      </div>
    </div>
  );
}