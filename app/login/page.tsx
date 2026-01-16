"use client";
import { useState } from "react";
import { auth } from "@/app/login/firebase";
import { signInAnonymously } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;
      
      const shortId = user.uid.substring(0, 6).toUpperCase();
      localStorage.setItem("display_name", `User_${shortId}`);
      
      router.push("/chat");
    } catch (error) {
      console.error("Error signing in anonymously:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] flex flex-col items-center justify-center relative overflow-hidden p-6">
      
      {/* تأثير ضوئي في الخلفية (Glow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-400/10 blur-[120px] rounded-full -z-10"></div>

      {/* اللوجو بأنيميشن */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-12 text-center"
      >
        <div className="w-24 h-24 bg-[#FFFC00] rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-yellow-400/20 mx-auto mb-6 rotate-[-5deg]">
          <span className="text-5xl">👻</span>
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">Moment</h1>
        <p className="text-white/40 mt-2 font-medium tracking-widest text-xs uppercase">Private Ghost Chat</p>
      </motion.div>

      {/* الزرار بتاعك بستايل سناب شات */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-sm"
      >
        <button
          onClick={handleGuestLogin}
          disabled={loading}
          className="w-full relative group p-5 bg-[#FFFC00] text-black font-black rounded-3xl shadow-[0_20px_40px_rgba(255,252,0,0.15)] hover:shadow-[0_25px_50px_rgba(255,252,0,0.3)] transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50"
        >
          <span className="flex items-center justify-center gap-3 text-lg">
            {loading ? "جاري التحقق..." : "دخول سريع كـ شبح 👻"}
          </span>
        </button>
        
        <p className="text-white/30 text-[10px] text-center mt-6 uppercase tracking-widest leading-relaxed">
          بضغطك على الدخول، سيتم إنشاء هويتك السرية <br /> وتشفير محادثاتك فوراً
        </p>
      </motion.div>

    </div>
  );
}