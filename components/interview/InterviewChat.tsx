"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { InterviewMessage, ExtractedProductData } from "@/lib/types";
import { trackEvent } from "@/components/providers/PostHogProvider";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

interface InterviewChatProps {
  sessionId?: string;
  initialMessages?: InterviewMessage[];
  onComplete?: (sessionId: string, data: ExtractedProductData) => void;
}

export default function InterviewChat({
  sessionId: initialSessionId,
  initialMessages = [],
  onComplete,
}: InterviewChatProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<InterviewMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(initialSessionId);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Start interview on mount if no messages
  useEffect(() => {
    if (messages.length === 0) {
      startInterview();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input after AI responds
  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  const startInterview = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/interview/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to start interview");
      }

      setSessionId(data.sessionId);
      setMessages([{ role: "assistant", content: data.message }]);
      trackEvent("interview_started", { sessionId: data.sessionId });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/interview/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: userMessage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSessionId(data.sessionId);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);

      if (data.isComplete && data.extractedData) {
        // Track interview completion
        trackEvent("interview_completed", {
          sessionId: data.sessionId,
          productName: data.extractedData.productName,
          questionCount: messages.length + 2, // +2 for this exchange
        });

        // Interview complete, redirect to preview
        setTimeout(() => {
          if (onComplete) {
            onComplete(data.sessionId, data.extractedData);
          } else {
            // Store data and redirect
            sessionStorage.setItem(
              `interview_${data.sessionId}`,
              JSON.stringify(data.extractedData)
            );
            router.push(`/preview/${data.sessionId}`);
          }
        }, 1500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const questionCount = messages.filter((m) => m.role === "assistant").length;

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] max-h-[700px]">
      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
        <span className="text-sm text-zinc-500">
          Question {Math.min(questionCount, 5)} of 5
        </span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i <= questionCount ? "bg-accent" : "bg-zinc-800"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} index={index} />
        ))}
        {isLoading && <TypingIndicator />}
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="mt-4 pt-4 border-t border-zinc-800">
        <div className="relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer..."
            disabled={isLoading}
            rows={2}
            className="w-full px-4 py-3 pr-12 bg-zinc-900/50 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 resize-none text-[15px]"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="absolute right-3 bottom-3 p-2 text-zinc-500 hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-zinc-600 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
