"use client";
import { useMessages } from "../hooks/useMessage"; 
import MessageBubble from "./MessageBubble";
import { auth } from "@/app/login/firebase";
import { useEffect, useRef } from "react";

// 1. ضيف الـ Interface هنا
interface MessagesProps {
  roomId: string;
}

// 2. استقبل الـ roomId في المكون
export default function Messages({ roomId }: MessagesProps) {
  // 3. مرر الـ roomId للـ Hook (تأكد إن الـ Hook بتاعك بيدعم ده)
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
{messages.map((msg: any) => (
  <MessageBubble 
    key={msg.id}
    id={msg.id} // هنحتاج الـ id عشان المسح
    text={msg.text} 
    audioUrl={msg.audioUrl} 
    type={msg.type || "text"} // لو مفيش نوع، اعتبره نص افتراضياً
    isMe={msg.senderId === currentUser?.uid} 
    time={msg.timestamp?.toDate().toLocaleTimeString()} 
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