import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHprN1H_NcMK5eJT_wVFqwhKhz8e9zjP0",
  authDomain: "last-minute-life-saver-926b1.firebaseapp.com",
  projectId: "last-minute-life-saver-926b1",
  storageBucket: "last-minute-life-saver-926b1.firebasestorage.app",
  messagingSenderId: "604290075583",
  appId: "1:604290075583:web:0264330b91d4fe00906f0a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;