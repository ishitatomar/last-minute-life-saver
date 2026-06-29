import { getAuth } from "firebase/auth";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function chatWithAI(tasks, message) {
  const auth = getAuth();

  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not logged in.");
  }

  const token = await user.getIdToken();

  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      tasks,
      message,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.response;
}