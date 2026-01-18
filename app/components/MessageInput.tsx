"use client";

import { useState } from "react";
import { db, auth } from "@/app/login/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface MessageInputProps {
  roomId: string;
}

export default function MessageInput({ roomId }: MessageInputProps) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendText = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanText = text.trim();

    // 🛑 حمايات أساسية
    if (!cleanText) return;
    if (!roomId) {
      console.error("roomId is undefined");
      return;
    }
    if (!auth.currentUser) {
      console.error("User not authenticated");
      return;
    }

    try {
      setLoading(true);

      // 📩 إرسال الرسالة داخل sub-collection خاصة بالغرفة
      await addDoc(collection(db, "chats", roomId, "messages"), {
        text: cleanText,
        senderId: auth.currentUser.uid,
        type: "text",
        timestamp: serverTimestamp(),
      });

      setText(""); // تفريغ الإدخال بعد الإرسال
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSendText}
      dir="rtl"
      className="flex items-center gap-3 bg-[#1a1c22] p-2 rounded-full border border-white/5"
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="اكتب رسالة..."
        disabled={loading}
        className="flex-1 bg-transparent border-none outline-none text-white text-sm px-4 disabled:opacity-50"
      />

      <button
        type="submit"
        disabled={loading || !text.trim()}
        className="bg-[#FFFC00] text-black px-6 py-2 rounded-full font-bold text-xs uppercase disabled:opacity-50"
      >
        إرسال
      </button>
    </form>
  );
}
