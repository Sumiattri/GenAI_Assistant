import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2xuo6Ey7tqPxzLSmieO7GWXcC1WPQmys",
  authDomain: "genai-b6b2e.firebaseapp.com",
  projectId: "genai-b6b2e",
  storageBucket: "genai-b6b2e.firebasestorage.app",
  messagingSenderId: "653762837826",
  appId: "1:653762837826:web:264be0de7ac6640a76dcdb",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
