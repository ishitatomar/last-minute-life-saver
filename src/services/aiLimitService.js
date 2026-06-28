import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { getAuth } from "firebase/auth";
import { db } from "../firebase/firebase";

const DAILY_LIMIT = 20;

export async function checkAILimit() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not logged in.");
  }

  const today = new Date().toISOString().split("T")[0];

  const ref = doc(db, "aiUsage", user.uid);

  const snap = await getDoc(ref);

  // First time using AI
  if (!snap.exists()) {
    await setDoc(ref, {
      count: 1,
      date: today,
    });

    return {
      allowed: true,
      remaining: DAILY_LIMIT - 1,
    };
  }

  const data = snap.data();

  // New day -> reset counter
  if (data.date !== today) {
    await updateDoc(ref, {
      count: 1,
      date: today,
    });

    return {
      allowed: true,
      remaining: DAILY_LIMIT - 1,
    };
  }

  // Daily limit reached
  if (data.count >= DAILY_LIMIT) {
    return {
      allowed: false,
      remaining: 0,
    };
  }

  // Increment counter
  await updateDoc(ref, {
    count: data.count + 1,
  });

  return {
    allowed: true,
    remaining: DAILY_LIMIT - (data.count + 1),
  };
}