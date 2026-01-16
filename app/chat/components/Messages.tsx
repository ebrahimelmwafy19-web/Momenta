"use client";

import { useMessages } from "../hooks/useMessage";
import { useTyping } from "../hooks/useTyping";
import { auth } from "@/app/login/firebase";

export default function Messages() {
  const chatId = "global-chat";
  const messages = useMessages(chatId);
  const { typingUsers } = useTyping(chatId);
  const userId = auth.currentUser?.uid;

  return (
    <div className="flex-1 min-h-0 overflow-y-auto bg-blue-900 px-6 py-4">
      {/* container مركزي زي Telegram */}
      <div className="mx-auto w-full max-w-3xl flex flex-col gap-3">
        {messages.length === 0 && (
          <div className="text-center text-blue-200 mt-20">
            No messages yet
          </div>
        )}

        {messages.map((msg) => {
          const mine = msg.senderId === userId;

          return (
            <div
              key={msg.id}
              className={`flex ${mine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl text-sm shadow max-w-[70%] break-words ${
                  mine
                    ? "bg-red-600 text-white"
                    : "bg-blue-700 text-white"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}

        {/* Typing */}
        {typingUsers.length > 0 && (
          <div className="text-sm text-blue-300 italic">
            Typing...
          </div>
        )}
      </div>
    </div>
  );
}
