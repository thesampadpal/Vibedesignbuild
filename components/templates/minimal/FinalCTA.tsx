"use client";

interface FinalCTAProps {
  headline: string;
  cta: string;
  accentColor?: string;
}

export default function FinalCTA({
  headline,
  cta,
  accentColor = "#d97706",
}: FinalCTAProps) {
  return (
    <section className="px-6 py-32">
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className="text-4xl md:text-5xl font-bold mb-10"
          style={{ color: "#fafafa" }}
        >
          {headline}
        </h2>
        <button
          className="inline-flex items-center gap-3 px-10 py-5 text-lg font-semibold rounded-xl transition-all hover:scale-105"
          style={{ backgroundColor: accentColor, color: "#09090b" }}
        >
          {cta}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
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
        </button>
      </div>
    </section>
  );
}
