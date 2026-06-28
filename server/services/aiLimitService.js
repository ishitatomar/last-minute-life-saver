import { db } from "../firebase/firebaseAdmin.js";

const DAILY_LIMIT = 20;

export async function checkAILimit(uid) {

  const today = new Date().toISOString().split("T")[0];

  const ref = db.collection("aiUsage").doc(uid);

  const snap = await ref.get();

  if (!snap.exists) {

    await ref.set({
      count: 1,
      date: today,
    });

    return {
      allowed: true,
      remaining: DAILY_LIMIT - 1,
    };
  }

  const data = snap.data();

  if (data.date !== today) {

    await ref.set({
      count: 1,
      date: today,
    });

    return {
      allowed: true,
      remaining: DAILY_LIMIT - 1,
    };
  }

  if (data.count >= DAILY_LIMIT) {

    return {
      allowed: false,
      remaining: 0,
    };
  }

  await ref.update({
    count: data.count + 1,
  });

  return {
    allowed: true,
    remaining: DAILY_LIMIT - (data.count + 1),
  };

}