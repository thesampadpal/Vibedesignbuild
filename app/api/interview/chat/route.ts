import { NextResponse } from "next/server";
import {
  InterviewMessage,
  InterviewSession,
  ExtractedProductData,
} from "@/lib/types";
import { INTERVIEW_SYSTEM_PROMPT, EXTRACTION_PROMPT } from "@/lib/prompts";

// In-memory session store (for MVP - replace with DB later)
const sessions = new Map<string, InterviewSession>();

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export async function POST(request: Request) {
  try {
    const { sessionId, message } = await request.json();

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenRouter API key not configured" },
        { status: 500 }
      );
    }

    // Get or create session
    let session: InterviewSession;
    if (sessionId && sessions.has(sessionId)) {
      session = sessions.get(sessionId)!;
    } else {
      session = {
        id: generateId(),
        messages: [],
        extractedData: null,
        status: "interviewing",
        createdAt: Date.now(),
      };
      sessions.set(session.id, session);
    }

    // Add user message if provided
    if (message) {
      session.messages.push({ role: "user", content: message });
    }

    // Build messages for API
    const apiMessages = [
      { role: "system", content: INTERVIEW_SYSTEM_PROMPT },
      ...session.messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    // Get AI response
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
          messages: apiMessages,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error?.message || "Failed to get response" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    // Add assistant message
    session.messages.push({ role: "assistant", content: assistantMessage });

    // Check if interview is complete
    const isComplete = assistantMessage
      .toLowerCase()
      .includes("let me generate your landing page");

    if (isComplete) {
      session.status = "extracting";

      // Extract product data
      const extractedData = await extractProductData(
        session.messages,
        apiKey
      );
      if (extractedData) {
        session.extractedData = extractedData;
        session.status = "complete";
      }
    }

    // Update session
    sessions.set(session.id, session);

    return NextResponse.json({
      sessionId: session.id,
      message: assistantMessage,
      isComplete: session.status === "complete",
      extractedData: session.extractedData,
    });
  } catch (error) {
    console.error("Interview chat error:", error);
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}

async function extractProductData(
  messages: InterviewMessage[],
  apiKey: string
): Promise<ExtractedProductData | null> {
  try {
    const conversation = messages
      .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
      .join("\n\n");

    const prompt = EXTRACTION_PROMPT.replace("{conversation}", conversation);

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

    if (!response.ok) return null;

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) return null;

    // Parse JSON from response
    let jsonStr = content.trim();
    if (jsonStr.startsWith("```")) {
      jsonStr = jsonStr.replace(/```json?\n?/g, "").replace(/```$/g, "").trim();
    }

    return JSON.parse(jsonStr) as ExtractedProductData;
  } catch (error) {
    console.error("Extraction error:", error);
    return null;
  }
}

// GET endpoint to retrieve session
export async function GET(request: Request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("sessionId");

  if (!sessionId || !sessions.has(sessionId)) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  const session = sessions.get(sessionId)!;
  return NextResponse.json({ session });
}
