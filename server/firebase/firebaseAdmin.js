import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    : undefined,
};

let db, auth;

if (
  serviceAccount.projectId &&
  serviceAccount.clientEmail &&
  serviceAccount.privateKey
) {
  const app = initializeApp({
    credential: cert(serviceAccount),
  });

  db = getFirestore(app);
  auth = getAuth(app);

  console.log("🔥 Firebase initialized");
} else {
  console.warn("⚠️ Firebase not configured - skipping Firebase init");
}

export { db, auth };