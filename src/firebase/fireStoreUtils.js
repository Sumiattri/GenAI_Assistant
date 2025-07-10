import { db } from "./firebase";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

export const saveMessageToFirestore = async (userId, chatId, message) => {
  const msgRef = collection(db, "users", userId, "chats", chatId, "messages");
  await addDoc(msgRef, {
    ...message,
    timestamp: serverTimestamp(),
  });
};
