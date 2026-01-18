"use client";
import { useMessages } from "../hooks/useMessage"; 
import MessageBubble from "./MessageBubble";
import { auth } from "@/app/login/firebase";
import { useEffect, useRef } from "react";

interface MessagesProps {
  roomId: string;
}

export default function Messages({ roomId }: MessagesProps) {
  const { messages, loading } = useMessages(roomId); 
  const currentUser = auth.currentUser;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) return (
    <div className="flex-1 flex items-center justify-center opacity-30 animate-pulse">
      جاري تحميل المحادثة...
    </div>
  );

  return (
    <div className="flex flex-col py-4 overflow-y-auto custom-scrollbar h-full">
      {/* التعديل هنا: شيلنا الـ :any عشان الـ TS يستنتج البيانات لوحده */}
{messages.map((msg) => (
  <MessageBubble
    key={msg.id}
    id={msg.id}
    roomId={roomId} // بنمرر الـ roomId اللي جاي من الـ Props بتاعة المكون نفسه
    text={msg.text}
    senderId={msg.senderId}
    audioUrl={msg.audioUrl}
    type={msg.type as "text" | "audio"} // تحديد النوع بدقة لـ TS
    isMe={msg.senderId === auth.currentUser?.uid}
    time={msg.time}
  />
))}

      
      <div ref={scrollRef} />

      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full opacity-20">
          <span className="text-6xl mb-4">👻</span>
          <p className="font-bold tracking-widest uppercase">Start a Secret Chat</p>
        </div>
      )}
    </div>
  );
}