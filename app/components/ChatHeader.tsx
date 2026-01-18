"use client";

import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/app/login/firebase";
import { useRouter } from "next/navigation";

// 1. ضيف الـ Interface ده هنا
interface ChatHeaderProps {
  roomId: string;
}

// 2. استلم الـ roomId في الـ Props
export default function ChatHeader({ roomId }: ChatHeaderProps) {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("Ghost");

  useEffect(() => {
    const name = localStorage.getItem("display_name");
    if (name) setDisplayName(name);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("display_name");
      router.push("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <header className="h-20 flex items-center justify-between px-8 bg-transparent border-b border-white/5 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-[#FFFC00] rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-400/20">
           <span className="text-xl">👻</span> 
        </div>
        <div>
          <h1 className="font-black text-white text-lg leading-none uppercase italic">
            Moment {roomId && <span className="text-white/30 text-xs ml-2">#{roomId.slice(0, 5)}</span>}
          </h1>
          <p className="text-[#FFFC00] text-[10px] font-bold tracking-[0.2em] mt-1 uppercase">
            {displayName}
          </p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="text-white/40 hover:text-red-400 transition-colors text-xs font-black uppercase tracking-widest bg-white/5 px-5 py-2.5 rounded-2xl border border-white/5 hover:border-red-400/20"
      >
        Exit
      </button>
    </header>
  );
}