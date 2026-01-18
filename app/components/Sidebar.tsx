"use client";
import { db, auth } from "@/app/login/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function SidebarHeader() {
  const router = useRouter();

  const createRoom = async () => {
    try {
      // إنشاء وثيقة جديدة في مجموعة الـ chats
      const docRef = await addDoc(collection(db, "chats"), {
        createdAt: serverTimestamp(),
        createdBy: auth.currentUser?.uid,
        name: "New Moment", // اسم افتراضي
      });

      // توجيه المستخدم لعنوان الغرفة الجديد (مثلاً /chat/ID_الغرفة)
      router.push(`/chat/${docRef.id}`);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-[#FFFC00] text-3xl font-black italic">MOMENT</h1>
      
      {/* الزرار الجديد بتصميم يتماشى مع الـ UI بتاعك */}
      <button 
        onClick={createRoom}
        className="w-full py-3 bg-white/5 border border-white/10 rounded-2xl text-white/60 text-xs font-bold uppercase tracking-widest hover:bg-[#FFFC00] hover:text-black hover:border-[#FFFC00] transition-all duration-300 shadow-lg"
      >
        + Create a New Moment
      </button>
    </div>
  );
}