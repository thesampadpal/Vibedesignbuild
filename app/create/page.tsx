"use client";

import Link from "next/link";
import SimplifiedInput from "@/components/SimplifiedInput";

export default function CreatePage() {
  return (
    <main className="min-h-screen px-6 py-12 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <header className="mb-10 animate-fade-in text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-sm mb-8 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back to home
          </Link>
          <h1 className="font-display text-3xl font-bold text-white mb-3">
            Create Your Landing Page
          </h1>
          <p className="text-zinc-500 max-w-md mx-auto">
            Paste a link or describe what you&apos;re building. We&apos;ll generate a
            landing page with copy that converts.
          </p>
        </header>

        {/* Simplified Input */}
        <SimplifiedInput />
      </div>
    </main>
  );
}
