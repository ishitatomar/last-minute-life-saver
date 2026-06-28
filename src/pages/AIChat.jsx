import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { chatWithAI } from "../services/chatService";
import { getTasks } from "../services/taskService";
import remarkGfm from "remark-gfm";

export default function AIChat() {
  const navigate = useNavigate();
  const bottomRef = useRef(null);

  const prompts = [
    {
      icon: "📅",
      label: "Plan my day",
      prompt: "Plan my day",
    },
    {
      icon: "🔥",
      label: "What is urgent?",
      prompt: "What is urgent?",
    },
    {
      icon: "📚",
      label: "Study Schedule",
      prompt: "Create study schedule",
    },
    {
      icon: "📝",
      label: "Break Tasks",
      prompt: "Break my tasks into subtasks",
    },
    {
      icon: "⏰",
      label: "2 Hour Focus",
      prompt: "Give me a 2-hour focus plan",
    },
    {
      icon: "📊",
      label: "Productivity",
      prompt: "Analyze my productivity",
    },
    {
      icon: "💪",
      label: "Motivate Me",
      prompt: "Motivate me",
    },
  ];

  const [tasks, setTasks] = useState([]);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text:
        "👋 Welcome to Last Minute Life Saver!\n\nI can help you plan your day, prioritize tasks, create study schedules and improve productivity.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        console.log(err);
      }
    }

    loadTasks();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function askAI(question) {
    if (!question.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: question,
      },
    ]);

    setLoading(true);

    try {
      const reply = await chatWithAI(tasks, question);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: reply,
        },
      ]);
    } catch (err) {
  console.error(err);

  let errorMessage =
    "❌ Something went wrong. Please try again later.";

  // Daily quota exceeded
  if (
    err.message?.includes("429") ||
    err.message?.includes("quota") ||
    err.message?.includes("Quota exceeded")
  ) {
    errorMessage =
      "🚫 Today's free AI request limit has been reached.\n\n" +
      "Please try again tomorrow when the quota resets.";
  }

  // Invalid API key
  else if (
    err.message?.includes("API_KEY") ||
    err.message?.includes("API key")
  ) {
    errorMessage =
      "🔑 Gemini API key is invalid or missing.";
  }

  // Network error
  else if (
    err.message?.includes("Failed to fetch") ||
    err.message?.includes("Network")
  ) {
    errorMessage =
      "🌐 Unable to connect to Gemini.\nPlease check your internet connection.";
  }

  setMessages((prev) => [
    ...prev,
    {
      sender: "ai",
      text: errorMessage,
    },
  ]);
}

    setLoading(false);
  }

  async function sendMessage() {
    if (!input.trim()) return;

    const question = input;

    setInput("");

    await askAI(question);
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      {/* Sidebar */}

      <div className="w-72 bg-slate-900 border-r border-slate-800 p-6">

        <h1 className="text-3xl font-bold text-cyan-400 mb-10">
          🤖 AI Assistant
        </h1>

        <div className="space-y-3">

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full text-left bg-slate-800 hover:bg-cyan-600 rounded-xl p-3 transition"
          >
            🏠 Dashboard
          </button>

          <button
            onClick={() => navigate("/calendar")}
            className="w-full text-left bg-slate-800 hover:bg-cyan-600 rounded-xl p-3 transition"
          >
            📅 Calendar
          </button>

          <button
            onClick={() => navigate("/analytics")}
            className="w-full text-left bg-slate-800 hover:bg-cyan-600 rounded-xl p-3 transition"
          >
            📊 Analytics
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="w-full text-left bg-slate-800 hover:bg-cyan-600 rounded-xl p-3 transition"
          >
            👤 Profile
          </button>

        </div>

        <hr className="my-8 border-slate-700" />

        <h2 className="text-xl font-semibold mb-5">
          ⚡ Quick Prompts
        </h2>

        <div className="space-y-3">

          {prompts.map((item) => (
            <button
              key={item.label}
              onClick={() => askAI(item.prompt)}
              className="w-full text-left bg-slate-800 hover:bg-violet-600 rounded-xl p-3 transition"
            >
              {item.icon} {item.label}
            </button>
          ))}

        </div>

        <button
          onClick={() =>
            setMessages([
              {
                sender: "ai",
                text:
                  "👋 Welcome back! How can I help you today?",
              },
            ])
          }
          className="mt-10 w-full bg-red-600 hover:bg-red-700 rounded-xl py-3 font-semibold"
        >
          🔄 New Chat
        </button>

      </div>

      {/* Chat Section */}

      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          🤖 AI Productivity Assistant
        </h1>

        <div className="bg-slate-900 rounded-2xl h-[650px] overflow-y-auto p-8">
                      {messages.map((msg, index) => (

            msg.sender === "user" ? (

              <div
                key={index}
                className="flex justify-end mb-8"
              >

                <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 max-w-lg rounded-2xl px-6 py-4 shadow-lg">

                  <p className="text-white">
                    {msg.text}
                  </p>

                </div>

              </div>

            ) : (

              <div
                key={index}
                className="flex justify-start mb-8"
              >

                <div className="bg-slate-800 w-[90%] rounded-2xl border border-slate-700 shadow-lg overflow-hidden">

                  {/* AI Header */}

                  <div className="flex items-center gap-4 px-6 py-4 bg-slate-850 border-b border-slate-700">

                    <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center text-xl">
                      🤖
                    </div>

                    <div>

                      <h3 className="font-bold">
                        Last Minute Life Saver AI
                      </h3>

                      <p className="text-sm text-gray-400">
                        Productivity Assistant
                      </p>

                    </div>

                  </div>

                  {/* AI Message */}

                  <div className="px-8 py-6">

                    <div className="prose prose-invert max-w-none leading-8">

                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                         {msg.text}
                    </ReactMarkdown>

                    </div>

                  </div>

                </div>

              </div>

            )

          ))}

          {loading && (

            <div className="flex justify-start mb-8">

              <div className="bg-slate-800 rounded-2xl px-6 py-5 border border-slate-700 animate-pulse">

                🤖 Thinking...

              </div>

            </div>

          )}

          <div ref={bottomRef}></div>

        </div>

        {/* Input Area */}

        <div className="mt-6">

          <div className="flex gap-4">

            <input
              type="text"
              placeholder="Ask AI anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500"
            />

            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-cyan-500 to-violet-600 px-10 rounded-2xl font-semibold hover:scale-105 transition"
            >
              🚀 Send
            </button>

          </div>
                    </div>

          {/* Footer */}

          <div className="flex items-center justify-between mt-5 text-sm text-gray-400">

            <p>
              💡 Tip: Try asking "Plan my day", "Motivate me", or "Break my tasks into subtasks".
            </p>

            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-full">
              Powered by Gemini AI ✨
            </span>

          </div>

        </div>

      

    </div>

  );
}