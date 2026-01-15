"use client";

import { useState } from "react";
import { Tone, TONE_LABELS } from "@/lib/types";

interface InputFormProps {
  onSubmit: (description: string, tone: Tone) => void;
  isLoading: boolean;
  initialDescription?: string;
}

const tones: Tone[] = ["professional", "casual", "bold", "playful"];

export default function InputForm({
  onSubmit,
  isLoading,
  initialDescription = "",
}: InputFormProps) {
  const [description, setDescription] = useState(initialDescription);
  const [tone, setTone] = useState<Tone>("professional");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() && !isLoading) {
      onSubmit(description.trim(), tone);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full animate-fade-in">
      {/* Tone Selector */}
      <div className="mb-6">
        <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
          Tone
        </label>
        <div className="flex gap-2">
          {tones.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTone(t)}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
                tone === t
                  ? "bg-accent text-zinc-900 border-accent"
                  : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-zinc-200"
              }`}
            >
              {TONE_LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Description Input */}
      <div className="mb-6">
        <label
          htmlFor="description"
          className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3"
        >
          Product Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your product in 2-3 sentences. What does it do? Who is it for? What problem does it solve?"
          className="w-full h-36 px-4 py-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 resize-none text-[15px] leading-relaxed"
          disabled={isLoading}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !description.trim()}
        className="group relative px-8 py-4 bg-zinc-100 text-zinc-900 font-semibold rounded-xl hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all overflow-hidden"
      >
        <span className={isLoading ? "opacity-0" : "opacity-100"}>
          Generate Copy
        </span>
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex gap-1">
              <span className="w-2 h-2 bg-zinc-900 rounded-full animate-pulse" />
              <span
                className="w-2 h-2 bg-zinc-900 rounded-full animate-pulse"
                style={{ animationDelay: "0.15s" }}
              />
              <span
                className="w-2 h-2 bg-zinc-900 rounded-full animate-pulse"
                style={{ animationDelay: "0.3s" }}
              />
            </span>
          </span>
        )}
      </button>
    </form>
  );
}
