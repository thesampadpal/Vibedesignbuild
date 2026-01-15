import { NextResponse } from "next/server";
import { GeneratedLandingPage } from "@/lib/types";

function generateHTML(page: GeneratedLandingPage): string {
  const { sections, theme, metadata } = page;
  const accent = theme.accentColor || "#d97706";

  const heroSection = sections.find((s) => s.type === "hero");
  const benefitsSection = sections.find((s) => s.type === "benefits");
  const problemSection = sections.find((s) => s.type === "problem" && s.visible);
  const socialProofSection = sections.find(
    (s) => s.type === "social-proof" && s.visible
  );
  const ctaSection = sections.find((s) => s.type === "cta");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${metadata.title}</title>
  <meta name="description" content="${metadata.description}">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['DM Sans', 'system-ui', 'sans-serif'],
            display: ['Syne', 'system-ui', 'sans-serif'],
          },
        },
      },
    }
  </script>
  <style>
    body {
      background-color: #09090b;
      color: #fafafa;
    }
    .accent-bg { background-color: ${accent}; }
    .accent-text { color: ${accent}; }
    .accent-bg-dim { background-color: ${accent}15; }
  </style>
</head>
<body class="font-sans antialiased">
  <!-- Hero Section -->
  <section class="min-h-[80vh] flex flex-col justify-center px-6 py-24">
    <div class="max-w-3xl mx-auto text-center">
      <h1 class="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-8">
        ${heroSection?.copy.headline || "Your Headline Here"}
      </h1>
      <p class="text-xl md:text-2xl leading-relaxed mb-12 max-w-2xl mx-auto text-zinc-400">
        ${heroSection?.copy.subheadline || "Your subheadline here"}
      </p>
      <a href="#" class="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-xl accent-bg text-zinc-900 hover:opacity-90 transition-opacity">
        ${heroSection?.copy.cta?.text || "Get Started"}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </a>
    </div>
  </section>

  <!-- Benefits Section -->
  <section class="px-6 py-24 bg-zinc-900/50">
    <div class="max-w-5xl mx-auto">
      <div class="grid md:grid-cols-3 gap-12">
        ${
          benefitsSection?.copy.items
            ?.map(
              (item, i) => `
        <div class="text-center md:text-left">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0 accent-bg-dim">
            <span class="text-xl font-bold accent-text">${i + 1}</span>
          </div>
          <h3 class="text-xl font-semibold mb-3">${item.title}</h3>
          <p class="leading-relaxed text-zinc-500">${item.description}</p>
        </div>`
            )
            .join("") || ""
        }
      </div>
    </div>
  </section>

  ${
    problemSection
      ? `
  <!-- Problem Section -->
  <section class="px-6 py-24">
    <div class="max-w-3xl mx-auto text-center">
      <h2 class="font-display text-3xl md:text-4xl font-bold mb-6">
        ${problemSection.copy.headline}
      </h2>
      <p class="text-lg md:text-xl leading-relaxed text-zinc-400">
        ${problemSection.copy.body}
      </p>
    </div>
  </section>
  `
      : ""
  }

  ${
    socialProofSection?.copy.testimonial
      ? `
  <!-- Social Proof Section -->
  <section class="px-6 py-24 bg-zinc-900/50">
    <div class="max-w-3xl mx-auto text-center">
      <div class="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-8 accent-bg-dim">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="accent-text"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
      </div>
      <blockquote class="text-2xl md:text-3xl font-medium leading-relaxed mb-8">
        "${socialProofSection.copy.testimonial.quote}"
      </blockquote>
      <div>
        <p class="font-semibold">${socialProofSection.copy.testimonial.author}</p>
        ${socialProofSection.copy.testimonial.title ? `<p class="text-sm mt-1 text-zinc-500">${socialProofSection.copy.testimonial.title}</p>` : ""}
      </div>
    </div>
  </section>
  `
      : ""
  }

  <!-- Final CTA Section -->
  <section class="px-6 py-32">
    <div class="max-w-3xl mx-auto text-center">
      <h2 class="font-display text-4xl md:text-5xl font-bold mb-10">
        ${ctaSection?.copy.headline || "Ready to get started?"}
      </h2>
      <a href="#" class="inline-flex items-center gap-3 px-10 py-5 text-lg font-semibold rounded-xl accent-bg text-zinc-900 hover:opacity-90 transition-opacity">
        ${ctaSection?.copy.cta?.text || "Get Started"}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="px-6 py-8 border-t border-zinc-800">
    <p class="text-center text-sm text-zinc-600">
      Built with <a href="https://vibedezine.com" class="accent-text hover:underline">Vibedezine</a>
    </p>
  </footer>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const { landingPage } = await request.json();

    if (!landingPage) {
      return NextResponse.json(
        { error: "Landing page data is required" },
        { status: 400 }
      );
    }

    const html = generateHTML(landingPage as GeneratedLandingPage);

    return NextResponse.json({
      html,
      instructions: `To use this landing page:

1. Save this code as index.html
2. Open it in your browser to preview
3. Deploy to any static hosting:
   - Netlify: Drag and drop the file
   - Vercel: Create a new project and upload
   - GitHub Pages: Push to a repo and enable Pages

The page uses Tailwind CSS via CDN and Google Fonts. No build step required.`,
    });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Failed to export landing page" },
      { status: 500 }
    );
  }
}
