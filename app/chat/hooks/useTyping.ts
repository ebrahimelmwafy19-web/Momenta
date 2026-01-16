"use client";

import { useEffect, useState } from "react";
import {
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/app/login/firebase";
import { auth } from "@/app/login/firebase";

export function useTyping(chatId: string) {
  const user = auth.currentUser;
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  // 👂 اسمع مين بيكتب
  useEffect(() => {
    if (!chatId || !user) return;

    const typingRef = doc(db, "chats", chatId, "typing", "state");

    return onSnapshot(typingRef, (snap) => {
      if (!snap.exists()) {
        setTypingUsers([]);
        return;
      }

      const data = snap.data() || {};
      const others = Object.keys(data).filter(
        (uid) => uid !== user.uid && data[uid]?.isTyping
      );

      setTypingUsers(others);
    });
  }, [chatId, user]);

  // ✍️ لما المستخدم يكتب
  async function setTyping(isTyping: boolean) {
    if (!user) return;

    const ref = doc(db, "chats", chatId, "typing", "state");

    if (isTyping) {
      await setDoc(
        ref,
        {
          [user.uid]: {
            isTyping: true,
            updatedAt: serverTimestamp(),
          },
        },
        { merge: true }
      );
    } else {
      await setDoc(
        ref,
        {
          [user.uid]: {
            isTyping: false,
          },
        },
        { merge: true }
      );
    }
  }

  return { typingUsers, setTyping };
}
