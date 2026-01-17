import { NextResponse } from "next/server";
import { URL_ANALYSIS_PROMPT } from "@/lib/prompts";

export interface UrlAnalysisResult {
  productName: string;
  description: string;
  targetAudience: string;
  keyBenefit: string;
  problem: string;
}

function stripHtmlToText(html: string): string {
  // Remove script and style elements
  let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");

  // Remove HTML tags
  text = text.replace(/<[^>]+>/g, " ");

  // Decode common HTML entities
  text = text.replace(/&nbsp;/g, " ");
  text = text.replace(/&amp;/g, "&");
  text = text.replace(/&lt;/g, "<");
  text = text.replace(/&gt;/g, ">");
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");

  // Collapse whitespace
  text = text.replace(/\s+/g, " ").trim();

  // Limit to ~8000 chars to stay within context limits
  if (text.length > 8000) {
    text = text.substring(0, 8000) + "...";
  }

  return text;
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenRouter API key not configured" },
        { status: 500 }
      );
    }

    // Fetch the URL content
    let pageContent: string;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const pageResponse = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; Vibedezine/1.0; +https://vibedezine.com)",
        },
      });

      clearTimeout(timeoutId);

      if (!pageResponse.ok) {
        return NextResponse.json(
          { error: `Failed to fetch URL: ${pageResponse.status}` },
          { status: 400 }
        );
      }

      const html = await pageResponse.text();
      pageContent = stripHtmlToText(html);

      if (pageContent.length < 50) {
        return NextResponse.json(
          { error: "Page content too short or empty" },
          { status: 400 }
        );
      }
    } catch (fetchError) {
      if (fetchError instanceof Error && fetchError.name === "AbortError") {
        return NextResponse.json(
          { error: "URL fetch timed out" },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: "Failed to fetch URL content" },
        { status: 400 }
      );
    }

    // Call OpenRouter to analyze the content
    const prompt = URL_ANALYSIS_PROMPT.replace("{content}", pageContent);

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
        { error: errorData.error?.message || "Failed to analyze URL" },
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

    const extracted: UrlAnalysisResult = JSON.parse(jsonStr);

    return NextResponse.json({
      success: true,
      extracted,
    });
  } catch (error) {
    console.error("URL analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze URL" },
      { status: 500 }
    );
  }
}
