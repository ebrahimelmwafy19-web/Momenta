import { db } from "@/app/login/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

export async function sendMessage(
  chatId: string,
  text: string,
  userId: string
) {
  return addDoc(collection(db, "chats", chatId, "messages"), {
    text,
    senderId: userId,
    createdAt: Timestamp.now(),
    expiresAt: Timestamp.fromMillis(
      Date.now() + 48 * 60 * 60 * 1000
    ),
  });
}
