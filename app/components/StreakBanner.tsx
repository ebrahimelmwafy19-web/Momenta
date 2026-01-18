"use client";

import { useState } from "react";

export default function StreakBanner() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg flex justify-between items-start">
      <div>
        <h3 className="font-bold text-lg">🔥 Streak Reminder</h3>
        <p className="text-sm text-red-100">
          Keep streaks! Message friends daily to maintain your streak.
        </p>
        <p className="text-xs mt-1">
          Streak Pending: Both users need to send messages today!
        </p>
      </div>

      <button onClick={() => setOpen(false)} className="text-xl ml-4">
        ✕
      </button>
    </div>
  );
}
