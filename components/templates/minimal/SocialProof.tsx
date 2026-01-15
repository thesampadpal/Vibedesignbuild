"use client";

interface SocialProofProps {
  quote: string;
  author: string;
  title?: string;
  accentColor?: string;
}

export default function SocialProof({
  quote,
  author,
  title,
  accentColor = "#d97706",
}: SocialProofProps) {
  return (
    <section className="px-6 py-24" style={{ backgroundColor: "#0f0f11" }}>
      <div className="max-w-3xl mx-auto text-center">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-8"
          style={{ backgroundColor: `${accentColor}15` }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: accentColor }}
          >
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>
        </div>
        <blockquote
          className="text-2xl md:text-3xl font-medium leading-relaxed mb-8"
          style={{ color: "#fafafa" }}
        >
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div>
          <p className="font-semibold" style={{ color: "#fafafa" }}>
            {author}
          </p>
          {title && (
            <p className="text-sm mt-1" style={{ color: "#71717a" }}>
              {title}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
