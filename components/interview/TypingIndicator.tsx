"use client";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="bg-zinc-800/50 px-4 py-3 rounded-2xl rounded-bl-md">
        <div className="flex gap-1.5">
          <span
            className="w-2 h-2 bg-zinc-500 rounded-full animate-pulse"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="w-2 h-2 bg-zinc-500 rounded-full animate-pulse"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="w-2 h-2 bg-zinc-500 rounded-full animate-pulse"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}
