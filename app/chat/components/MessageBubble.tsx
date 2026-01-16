"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/app/login/firebase";
import { doc, deleteDoc } from "firebase/firestore";

// ده الـ interface اللي هيشيل الخطأ اللي في الصورة رقم 3
interface MessageBubbleProps {
  id: string;      
  text?: string;
  audioUrl?: string;
  isMe: boolean;
  type: "text" | "audio";
  time: any;
}

export default function MessageBubble({ id, text, audioUrl, isMe, type, time }: MessageBubbleProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // المسح التلقائي بعد 10 ثواني (سناب شات ستايل)
    const timer = setTimeout(async () => {
      setIsVisible(false);
      try {
        await deleteDoc(doc(db, "messages", id));
      } catch (e) { console.error(e); }
    }, 10000);

    return () => clearTimeout(timer);
  }, [id]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div exit={{ opacity: 0, scale: 0.5 }} className={`mb-4 ${isMe ? "text-right" : "text-left"}`}>
           <div className={`p-3 rounded-2xl inline-block ${isMe ? "bg-yellow-400 text-black" : "bg-white/10 text-white"}`}>
              {type === "audio" ? <audio src={audioUrl} controls className="h-8" /> : <p>{text}</p>}
              <span className="block text-[8px] opacity-50 mt-1">{time}</span>
           </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}