"use client";

import { useState, useRef } from "react";
import { db, auth, storage } from "@/app/login/firebase"; // تأكد من إضافة storage في ملف firebase.ts
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { motion } from "framer-motion";

interface MessageInputProps {
  roomId: string;
}

export default function MessageInput({ roomId }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // --- دالة إرسال النص العادية ---
  const handleSendText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        senderId: auth.currentUser?.uid,
        roomId: roomId,
        timestamp: serverTimestamp(),
        type: "text",
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending text:", error);
    }
  };

  // --- منطق تسجيل الصوت ---
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        await uploadAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // إغلاق المايك بعد التسجيل
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  // --- رفع الصوت لـ Firebase Storage ---
  const uploadAudio = async (blob: Blob) => {
    try {
      const fileName = `audio/${roomId}/${Date.now()}.webm`;
      const storageRef = ref(storage, fileName);
      
      const snapshot = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // حفظ الرابط في Firestore كرسالة
      await addDoc(collection(db, "messages"), {
        audioUrl: downloadURL,
        type: "audio",
        senderId: auth.currentUser?.uid,
        roomId: roomId,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  return (
    <form 
      dir="rtl" 
      onSubmit={handleSendText}
      className="flex items-center gap-3 bg-[#1a1c22] p-2 rounded-full border border-white/5 shadow-xl"
    >
      {/* زرار الكاميرا */}
      <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/10 shrink-0">
        <span className="text-lg">📷</span>
      </div>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={isRecording ? "جاري التسجيل..." : "أرسل دردشة..."}
        disabled={isRecording}
        className="flex-1 bg-transparent border-none outline-none text-white text-[15px] text-right"
      />

      <div className="flex items-center gap-2 shrink-0">
        {message.trim() ? (
          <motion.button
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            type="submit"
            className="w-10 h-10 bg-[#00b2ff] rounded-full flex items-center justify-center"
          >
            <span className="text-sm">✈️</span>
          </motion.button>
        ) : (
          <motion.button
            type="button"
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            // للموبايل
            onTouchStart={startRecording}
            onTouchEnd={stopRecording}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              isRecording ? "bg-red-500 scale-125 animate-pulse" : "bg-white/5"
            }`}
          >
            <span className="text-lg">🎙️</span>
          </motion.button>
        )}
      </div>
    </form>
  );
}
