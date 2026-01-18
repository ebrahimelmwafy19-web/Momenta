"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/app/login/firebase";
import { doc, deleteDoc } from "firebase/firestore";

interface MessageBubbleProps {
  id: string;
  roomId: string;          // ⭐ موجود ومُستخدم في التعريف
  text?: string;
  audioUrl?: string;
  isMe: boolean;
  type: "text" | "audio";
  time: any;
  senderId: string;
}

export default function MessageBubble({
  id,
  roomId,                  // ⭐ مستلم هنا
  text,
  senderId,
  audioUrl,
  isMe,
  type,
  time,
}: MessageBubbleProps) {
  const [isVisible, setIsVisible] = useState(true);

  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${senderId}`;

  useEffect(() => {
    // 🛑 حماية نهائية
    if (!id || !roomId) return;

    const timer = setTimeout(async () => {
      try {
        setIsVisible(false);

        // حذف الرسالة باستخدام id (Firestore لا يحتاج roomId هنا)
       // الحذف لازم يكون من نفس المكان اللي سجلنا فيه (جوه الـ chats)
const docRef = doc(db, "chats", roomId, "messages", id);
        await deleteDoc(docRef);
      } catch (e) {
        console.log("Delete skipped or error:", e);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [id, roomId]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={`flex gap-2 mb-4 ${
            isMe ? "flex-row-reverse" : "flex-row"
          }`}
        >
          {/* Avatar */}
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-8 h-8 rounded-full border border-white/20"
          />

          {/* Message bubble */}
          <div
            className={`p-3 rounded-2xl ${
              isMe ? "bg-blue-500 text-white" : "bg-white/10 text-white"
            }`}
          >
            {type === "audio" ? (
              audioUrl ? (
                <audio
                  src={audioUrl}
                  controls
                  className="h-8 w-40"
                />
              ) : null
            ) : (
              <p className="text-sm">{text}</p>
            )}

            <span className="block text-[8px] opacity-40 mt-1">
              {time}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
