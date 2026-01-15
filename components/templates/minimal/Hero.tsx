"use client";

interface HeroProps {
  headline: string;
  subheadline: string;
  cta: string;
  accentColor?: string;
}

export default function Hero({
  headline,
  subheadline,
  cta,
  accentColor = "#d97706",
}: HeroProps) {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center px-6 py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-8"
          style={{ color: "#fafafa" }}
        >
          {headline}
        </h1>
        <p
          className="text-xl md:text-2xl leading-relaxed mb-12 max-w-2xl mx-auto"
          style={{ color: "#a1a1aa" }}
        >
          {subheadline}
        </p>
        <button
          className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-xl transition-all hover:scale-105"
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
