"use client";

import { GeneratedCopy } from "@/lib/types";
import CopyButton from "./CopyButton";
import { useState } from "react";

interface CopyOutputProps {
  copy: GeneratedCopy | null;
  onRegenerate?: () => void;
  isLoading?: boolean;
}

export default function CopyOutput({
  copy,
  onRegenerate,
  isLoading,
}: CopyOutputProps) {
  const [allCopied, setAllCopied] = useState(false);

  if (!copy) return null;

  const formatAllCopy = () => {
    return `${copy.headline}

${copy.subheadline}

Benefits:
- ${copy.benefits[0]}
- ${copy.benefits[1]}
- ${copy.benefits[2]}

CTA: ${copy.cta}`;
  };

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(formatAllCopy());
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
  };

  return (
    <div className="w-full mt-16">
      {/* Header with actions */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
        <h2 className="font-display text-lg font-semibold text-zinc-300">
          Your Copy
        </h2>
        <div className="flex items-center gap-2">
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 rounded-md transition-all disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={isLoading ? "animate-spin" : ""}
              >
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M16 16h5v5" />
              </svg>
              Regenerate
            </button>
          )}
          <button
            onClick={handleCopyAll}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              allCopied
                ? "text-accent bg-accent/10"
                : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {allCopied ? (
                <polyline points="20 6 9 17 4 12" />
              ) : (
                <>
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </>
              )}
            </svg>
            {allCopied ? "Copied All" : "Copy All"}
          </button>
        </div>
      </div>

      {/* Copy sections */}
      <div className="space-y-8">
        {/* Headline */}
        <section className="animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-medium text-zinc-600 uppercase tracking-widest">
              Headline
            </span>
            <CopyButton text={copy.headline} />
          </div>
          <p className="font-display text-4xl font-bold text-white leading-tight">
            {copy.headline}
          </p>
        </section>

        {/* Subheadline */}
        <section className="animate-fade-in-delay-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-medium text-zinc-600 uppercase tracking-widest">
              Subheadline
            </span>
            <CopyButton text={copy.subheadline} />
          </div>
          <p className="text-xl text-zinc-300 leading-relaxed">
            {copy.subheadline}
          </p>
        </section>

        {/* Benefits */}
        <section className="animate-fade-in-delay-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-medium text-zinc-600 uppercase tracking-widest">
              Benefits
            </span>
            <CopyButton text={copy.benefits.join("\n")} />
          </div>
          <ul className="space-y-4">
            {copy.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-accent/10 text-accent text-xs font-bold">
                  {index + 1}
                </span>
                <span className="text-zinc-300 text-lg leading-relaxed pt-0.5">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="animate-fade-in-delay-3">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-medium text-zinc-600 uppercase tracking-widest">
              Call to Action
            </span>
            <CopyButton text={copy.cta} />
          </div>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-zinc-900 font-semibold rounded-xl">
            {copy.cta}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </section>
      </div>
    </div>
  );
}
