"use client";

import { useParams } from "next/navigation";
import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import Messages from "./components/Messages";
import MessageInput from "./components/MessageInput";

export default function PrivateChatPage() {
  const params = useParams();
  const roomId = params.id as string; // الحصول على ID الغرفة الفريد

  return (
    <div className="h-screen flex bg-[#0b0e14] bg-[radial-gradient(circle_at_top,_#1e293b,_#0b0e14)] text-white overflow-hidden p-2 md:p-4">
      
      {/* Sidebar - يحتوي على زر Create New Moment */}
      <aside className="hidden lg:flex w-80 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] flex-col overflow-hidden shadow-2xl">
        <Sidebar />
      </aside>

      {/* منطقة الشات الخاصة بالـ ID المختار */}
      <main className="flex-1 flex flex-col min-w-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl relative ml-0 lg:ml-4">
        
        {/* نمرر الـ roomId عشان الهيدر يعرف اسم الغرفة */}
        <ChatHeader roomId={roomId} />

        {/* حاوية الرسائل - تعرض رسائل هذه الغرفة فقط */}
        <div className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar">
          <Messages roomId={roomId} />
        </div>

        {/* منطقة الكتابة - ترسل الرسالة لهذه الغرفة فقط */}
        <div className="p-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-2 backdrop-blur-md">
            <MessageInput roomId={roomId} />
          </div>
          
        </div>
          
      </main>
    </div>
  );
}