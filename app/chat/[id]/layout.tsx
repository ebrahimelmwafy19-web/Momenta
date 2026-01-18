import React from "react";
// تأكد من استيراد المكونات بالمسار الصحيح (نقطتين للرجوع للخلف)
import Sidebar from "../../components/Sidebar"; 

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-[#0e1217] bg-[radial-gradient(at_top_right,_#1e293b,_#0f172a)] text-white p-4 lg:p-6 gap-4" suppressHydrationWarning>
      
      {/* Sidebar */}
      <aside className="hidden md:flex w-80 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl flex-col overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
           <h2 className="text-yellow-400 font-black tracking-widest italic text-xl">MOMENT</h2>
           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {/* استدعاء الـ Sidebar الحقيقي اللي فيه زرار الـ Create */}
          <Sidebar /> 
        </div>
      </aside>

      {/* منطقة الشات الرئيسية */}
      <main className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden relative">
        {children}
      </main>
    </div>
  );
}