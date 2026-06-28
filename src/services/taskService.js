import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

import { getAuth } from "firebase/auth";

import { db } from "../firebase/firebase";

const taskCollection = collection(db, "tasks");

/* ================= ADD TASK ================= */

export async function addTask(task) {
  return await addDoc(taskCollection, task);
}

/* ================= GET TASKS ================= */

export async function getTasks() {

  const auth = getAuth();

  const user = auth.currentUser;

  if (!user) return [];

  const q = query(
    taskCollection,
    where("userId", "==", user.uid)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
}

/* ================= DELETE TASK ================= */

export async function deleteTask(id) {
  return await deleteDoc(doc(db, "tasks", id));
}

/* ================= TOGGLE TASK ================= */

export async function toggleTask(id, completed) {

  const taskRef = doc(db, "tasks", id);

  await updateDoc(taskRef, {
    completed,
  });

}