import { NextResponse } from "next/server";
import { ExtractedProductData, GeneratedLandingPage } from "@/lib/types";
import { buildLandingPagePrompt } from "@/lib/prompts";

export async function POST(request: Request) {
  try {
    const { extractedData, theme } = await request.json();

    if (!extractedData) {
      return NextResponse.json(
        { error: "Product data is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenRouter API key not configured" },
        { status: 500 }
      );
    }

    const prompt = buildLandingPagePrompt(extractedData as ExtractedProductData);

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://vibedezine.com",
          "X-Title": "Vibedezine",
        },
        body: JSON.stringify({
          model: "anthropic/claude-3-haiku",
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error?.message || "Failed to generate page" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    // Parse JSON from response
    let jsonStr = content.trim();
    if (jsonStr.startsWith("```")) {
      jsonStr = jsonStr.replace(/```json?\n?/g, "").replace(/```$/g, "").trim();
    }

    const generatedCopy = JSON.parse(jsonStr);

    // Build landing page structure
    const landingPage: GeneratedLandingPage = {
      sections: [
        {
          type: "hero",
          visible: true,
          copy: {
            headline: generatedCopy.hero.headline,
            subheadline: generatedCopy.hero.subheadline,
            cta: { text: generatedCopy.hero.cta, action: "#" },
          },
        },
        {
          type: "benefits",
          visible: true,
          copy: {
            items: generatedCopy.benefits,
          },
        },
        {
          type: "problem",
          visible: !!generatedCopy.problem,
          copy: {
            headline: generatedCopy.problem?.headline,
            body: generatedCopy.problem?.body,
          },
        },
        {
          type: "social-proof",
          visible: !!generatedCopy.socialProof,
          copy: {
            testimonial: generatedCopy.socialProof,
          },
        },
        {
          type: "cta",
          visible: true,
          copy: {
            headline: generatedCopy.finalCta.headline,
            cta: { text: generatedCopy.finalCta.cta, action: "#" },
          },
        },
      ],
      theme: theme || {
        template: "minimal",
        accentColor: "#d97706",
        darkMode: true,
      },
      metadata: generatedCopy.metadata,
    };

    return NextResponse.json({ landingPage });
  } catch (error) {
    console.error("Page generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate landing page" },
      { status: 500 }
    );
  }
}
