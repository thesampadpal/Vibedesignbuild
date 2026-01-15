"use client";

interface ProblemProps {
  headline: string;
  body: string;
}

export default function Problem({ headline, body }: ProblemProps) {
  return (
    <section className="px-6 py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className="text-3xl md:text-4xl font-bold mb-6"
          style={{ color: "#fafafa" }}
        >
          {headline}
        </h2>
        <p
          className="text-lg md:text-xl leading-relaxed"
          style={{ color: "#a1a1aa" }}
        >
          {body}
        </p>
      </div>
    </section>
  );
}
