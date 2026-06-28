import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

/* ================= CREATE PROFILE ================= */

export async function createUserProfile(user) {
  const ref = doc(db, "users", user.uid);

  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      displayName: user.displayName || "",
      email: user.email || "",
      photoURL: user.photoURL || "",

      college: "",
      branch: "",
      semester: "",
      goal: "",
      bio: "",
      studyHours: "",

      theme: "dark",
      notifications: true,

      createdAt: new Date(),
    });
  }
}

/* ================= GET PROFILE ================= */

export async function getUserProfile(uid) {
  const ref = doc(db, "users", uid);

  const snap = await getDoc(ref);

  if (snap.exists()) {
    return snap.data();
  }

  return null;
}

/* ================= UPDATE PROFILE ================= */

export async function updateUserProfile(uid, data) {
  const ref = doc(db, "users", uid);

  await updateDoc(ref, data);
}