"use client";

import { useState, useRef } from "react";
import { auth } from "@/app/login/firebase";
import { sendMessage } from "../services/chat.services";
import { useTyping } from "../hooks/useTyping";

export default function MessageInput() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const chatId = "global-chat";
  const { setTyping } = useTyping(chatId);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  async function handleSend() {
    const user = auth.currentUser;
    if (!user) return;

    const trimmed = text.trim();
    if (!trimmed) return;

    try {
      setLoading(true);
      await sendMessage(chatId, trimmed, user.uid);
      setText("");
      setTyping(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border-t border-blue-800 bg-blue-950 px-4 py-3">
      <div className="mx-auto w-full max-w-3xl flex items-center gap-3">
        <input
          value={text}
          placeholder="Type your message"
          className="flex-1 rounded-md px-4 py-2 text-black outline-none"
          onChange={(e) => {
            setText(e.target.value);
            setTyping(true);

            if (typingTimeout.current) {
              clearTimeout(typingTimeout.current);
            }

            typingTimeout.current = setTimeout(
              () => setTyping(false),
              1500
            );
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-red-600 px-5 py-2 rounded-md hover:bg-red-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
