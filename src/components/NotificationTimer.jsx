import { useEffect, useState } from "react";

export default function NotificationTimer({ initialSeconds, message = "Your order is processing" }) {
  const [secs, setSecs] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecs((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs % 3600) / 60);
  const seconds = secs % 60;

  const isWarning = secs <= 5 * 60;

  return (
    <div className="flex w-full items-center justify-between gap-4 rounded-xl border border-green-400/20 bg-green-500/10 px-4 py-3 backdrop-blur-md">
      <span className="font-sans text-sm font-medium text-white">
        {message}
      </span>

      <span
        className={`shrink-0 font-sans text-sm font-bold tabular-nums ${
          isWarning ? "text-red-500" : "text-white"
        }`}
      >
        {String(hours).padStart(2, "0")}:
        {String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
}