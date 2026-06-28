import { Link } from "react-router-dom";


export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white p-6">

      <h1 className="text-2xl font-bold text-cyan-400 mb-10">
        Last Minute
      </h1>

      <nav className="space-y-5">

        <Link to="/dashboard" className="block hover:text-cyan-400">
            🏠 Dashboard
        </Link>

        <Link to="/chat" className="block py-2 hover:text-cyan-400">
            🤖 AI Assistant
        </Link>

        <Link to="/calendar" className="block hover:text-cyan-400">
            📅 Calendar
        </Link>

       <Link to="/analytics" className="block hover:text-cyan-400">
            📊 Analytics
        </Link> 

        <Link className="block hover:text-cyan-400" to="/profile">
          👤 Profile
        </Link>

      </nav>

    </div>
  );
}