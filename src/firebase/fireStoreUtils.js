import { db } from "./firebase";
import { query } from "firebase/firestore";
import { orderBy } from "firebase/firestore";

import {
  collection,
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

export const createNewChat = async (userId, firstMessageContent = "") => {
  try {
    const chatRef = collection(db, "users", userId, "chats");

    const trimmedText = firstMessageContent
      .split(" ")
      .slice(0, 6)
      .join(" ")
      .trim();

    const title = trimmedText.length > 0 ? trimmedText : "New Chat";

    const newChat = await addDoc(chatRef, {
      title,
      createdAt: serverTimestamp(),
    });

    return newChat.id;
  } catch (error) {
    console.error("Failed to create chat:", error);
    throw error;
  }
};

export const getMessagesFromFirestore = async (userId, chatId) => {
  try {
    const msgRef = collection(db, "users", userId, "chats", chatId, "messages");

    const q = query(msgRef, orderBy("timestamp", "asc")); // Sort by timestamp ascending

    const querySnapshot = await getDocs(q);

    const messages = querySnapshot.docs.map((doc) => {
      const { timestamp, ...rest } = doc.data(); // explicitly remove timestamp
      return rest;
    });

    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};
export const getUserChats = async (userId) => {
  try {
    const chatsRef = collection(db, "users", userId, "chats");
    const q = query(chatsRef, orderBy("createdAt", "desc")); // newest chat first
    const snapshot = await getDocs(q);

    const chats = snapshot.docs.map((doc) => {
      const { createdAt, ...rest } = doc.data();
      return {
        id: doc.id,
        ...rest,
        // createdAt: createdAt?.toMillis(), // if needed
      };
    });

    return chats;
  } catch (error) {
    console.error("Error fetching chats:", error);
    return [];
  }
};
