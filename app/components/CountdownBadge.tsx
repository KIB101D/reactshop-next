"use client";

import { useEffect, useState } from "react";

function formatTime(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");
}

export function CountdownBadge({ endTime }: { endTime: string }) {
  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  useEffect(() => {
    const deadline = new Date(endTime).getTime();

    const tick = () => {
      setTimeLeft(formatTime(deadline - Date.now()));
    };

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white rounded-full text-xs sm:text-sm font-semibold text-gray-700 shadow-sm tabular-nums">
      Ends in {timeLeft ?? "--:--:--"}
    </span>
  );
}
