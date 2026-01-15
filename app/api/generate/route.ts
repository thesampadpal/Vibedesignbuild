import { NextResponse } from "next/server";
import { GeneratedCopy, Tone } from "@/lib/types";

const TONE_INSTRUCTIONS: Record<Tone, string> = {
  professional:
    "Write in a professional, authoritative tone. Be clear, confident, and trustworthy. Suitable for B2B and enterprise.",
  casual:
    "Write in a friendly, conversational tone. Be approachable and relatable. Like talking to a smart friend.",
  bold:
    "Write in a bold, direct tone. Be provocative and confident. Make strong claims. Cut through the noise.",
  playful:
    "Write in a fun, energetic tone. Be witty and memorable. Use clever wordplay where appropriate.",
};

function buildPrompt(tone: Tone): string {
  return `You are a landing page copywriter. Given a product description, generate:
1. Headline (max 10 words, punchy, specific)
2. Subheadline (1 sentence, explains what it does)
3. 3 Benefits (short, outcome-focused, not features)
4. CTA text (action-oriented, specific)

Tone: ${TONE_INSTRUCTIONS[tone]}

Sound human. Avoid: "revolutionize", "supercharge", "seamless", "game-changer", "cutting-edge", "next-generation", "powerful", "unlock", "elevate".

Return ONLY valid JSON with no markdown formatting:
{"headline":"...","subheadline":"...","benefits":["...","...","..."],"cta":"..."}`;
}

export async function POST(request: Request) {
  try {
    const { description, tone = "professional" } = await request.json();

    if (!description || typeof description !== "string") {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    }

    const validTones: Tone[] = ["professional", "casual", "bold", "playful"];
    const selectedTone: Tone = validTones.includes(tone) ? tone : "professional";

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenRouter API key not configured" },
        { status: 500 }
      );
    }

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
          messages: [
            { role: "system", content: buildPrompt(selectedTone) },
            { role: "user", content: description },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error?.message || "Failed to generate copy" },
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

    // Parse JSON from response (handle potential markdown code blocks)
    let jsonStr = content.trim();
    if (jsonStr.startsWith("```")) {
      jsonStr = jsonStr.replace(/```json?\n?/g, "").replace(/```$/g, "").trim();
    }

    const copy: GeneratedCopy = JSON.parse(jsonStr);

    // Validate structure
    if (
      !copy.headline ||
      !copy.subheadline ||
      !Array.isArray(copy.benefits) ||
      copy.benefits.length !== 3 ||
      !copy.cta
    ) {
      return NextResponse.json(
        { error: "Invalid response format" },
        { status: 500 }
      );
    }

    return NextResponse.json(copy);
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Failed to generate copy" },
      { status: 500 }
    );
  }
}
