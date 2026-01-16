"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/app/login/firebase";

export function useMessages(chatId: string) {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "desc") // 👈 الأحدث فوق
    );

    return onSnapshot(q, (snapshot) => {
      const now = Date.now();

      const filtered = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((msg: any) => {
          if (!msg.expiresAt) return true;
          return msg.expiresAt.toMillis() > now; // 👈 لسه صالح
        });

      setMessages(filtered);
    });
  }, [chatId]);

  return messages;
}
