"use client";

interface Benefit {
  title: string;
  description: string;
}

interface BenefitsProps {
  benefits: Benefit[];
  accentColor?: string;
}

export default function Benefits({
  benefits,
  accentColor = "#d97706",
}: BenefitsProps) {
  return (
    <section className="px-6 py-24" style={{ backgroundColor: "#0f0f11" }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center md:text-left">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0"
                style={{ backgroundColor: `${accentColor}15` }}
              >
                <span
                  className="text-xl font-bold"
                  style={{ color: accentColor }}
                >
                  {index + 1}
                </span>
              </div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ color: "#fafafa" }}
              >
                {benefit.title}
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: "#71717a" }}
              >
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
