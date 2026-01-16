import { useState, useEffect } from "react";
import { db } from "@/app/login/firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";

export function useMessages(roomId: string) {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. حماية: لو الـ roomId مش موجود، اخرج ومتعملش Query
    if (!roomId) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "messages"),
      where("roomId", "==", roomId),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [roomId]); // الـ useEffect هيشتغل تاني أول ما الـ roomId ياخد قيمة

  return { messages, loading };
}