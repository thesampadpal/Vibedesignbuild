"use client";

import { useState, useRef } from "react";
import InputForm from "@/components/InputForm";
import CopyOutput from "@/components/CopyOutput";
import { GeneratedCopy, Tone } from "@/lib/types";

export default function Home() {
  const [generatedCopy, setGeneratedCopy] = useState<GeneratedCopy | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Store last request for regeneration
  const lastRequestRef = useRef<{ description: string; tone: Tone } | null>(
    null
  );

  const handleSubmit = async (description: string, tone: Tone) => {
    setIsLoading(true);
    setError(null);
    lastRequestRef.current = { description, tone };

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, tone }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate copy");
      }

      setGeneratedCopy(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (lastRequestRef.current) {
      handleSubmit(
        lastRequestRef.current.description,
        lastRequestRef.current.tone
      );
    }
  };

  return (
    <main className="min-h-screen px-6 py-20 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <header className="mb-16 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-zinc-900"
              >
                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
              </svg>
            </div>
            <h1 className="font-display text-2xl font-bold text-white">
              Vibedezine
            </h1>
          </div>
          <p className="text-zinc-500 text-lg max-w-md">
            Generate landing page copy that sounds human.
            <br />
            No buzzwords. No fluff.
          </p>
        </header>

        {/* Form */}
        <InputForm onSubmit={handleSubmit} isLoading={isLoading} />

        {/* Error */}
        {error && (
          <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl animate-fade-in">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Output */}
        <CopyOutput
          copy={generatedCopy}
          onRegenerate={generatedCopy ? handleRegenerate : undefined}
          isLoading={isLoading}
        />

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-zinc-900 text-center">
          <p className="text-zinc-600 text-xs">
            Built for founders who ship fast
          </p>
        </footer>
      </div>
    </main>
  );
}
