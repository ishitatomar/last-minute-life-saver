import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AIPlanner from "./pages/AIPlanner";
import CalendarPage from "./pages/Calendar";
import Analytics from "./pages/Analytics";
import AIChat from "./pages/AIChat";
import Profile from "./pages/Profile";

export default function App() {

  return (

    <Routes>

      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/planner" element={<AIPlanner />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/chat" element={<AIChat />} />
      <Route path="/profile" element={<Profile />} />
     

    </Routes>

  );

}