import { ExtractedProductData, Tone } from "./types";

export const URL_ANALYSIS_PROMPT = `You are analyzing a webpage to extract product information for generating a landing page.

Given the webpage content below, extract:
1. productName - The name of the product/service/project
2. description - What it does in 1-2 sentences (clear and specific)
3. targetAudience - Who is this for? Be specific about the type of person/role
4. keyBenefit - The main outcome/value users get from using this
5. problem - What pain/problem does this solve? What's the "before" state?

Guidelines:
- Be specific, not generic. "Developers" is too broad. "Solo developers building SaaS" is better.
- For GitHub repos, focus on the README content and what the project actually does
- If information isn't explicit, make reasonable inferences based on context
- If something truly can't be determined, leave it as an empty string

Return ONLY valid JSON (no markdown, no explanation):
{
  "productName": "...",
  "description": "...",
  "targetAudience": "...",
  "keyBenefit": "...",
  "problem": "..."
}

WEBPAGE CONTENT:
{content}`;

export const INTERVIEW_SYSTEM_PROMPT = `You are conducting an interview to gather information for generating a high-converting landing page. Your goal is to extract:

1. What the product does (clear, specific)
2. Who it's for (target audience)
3. The problem it solves (painful, relatable)
4. What makes it different (unique value)
5. Any proof points (optional: traction, testimonials)
6. Business model (optional: for CTA strategy)

Guidelines:
- Ask ONE question at a time
- Keep questions conversational, not formal
- Build on previous answers - reference what they said
- Acknowledge their answers briefly before asking the next question
- Skip questions if already answered in previous responses
- Maximum 5 questions total
- When you have enough information, respond with EXACTLY: "Perfect, I have everything I need. Let me generate your landing page now."

Question flow:
1. Start with: "What are you building? Give me the quick elevator pitch - what it does and who it's for."
2. Then ask about the painful problem users have
3. Then ask what makes them different from alternatives
4. If they mention traction/customers, ask for a testimonial or stat (optional)
5. If pricing is relevant and not mentioned, ask briefly (optional)

Do NOT:
- Use marketing jargon in your questions
- Be overly enthusiastic or sycophantic
- Ask about design preferences
- Ask more than one question at a time
- Continue past 5 questions

Respond naturally as a helpful consultant would.`;

export const EXTRACTION_PROMPT = `Based on this interview conversation, extract the product information into structured JSON.

Conversation:
{conversation}

Extract the following information. If something wasn't mentioned, make reasonable inferences based on context or set to null.

Return ONLY valid JSON (no markdown):
{
  "productName": "name of the product/service",
  "tagline": "short catchy tagline (generate if not mentioned)",
  "targetAudience": "who this is for",
  "problem": "the painful problem being solved",
  "solution": "how the product solves it",
  "benefits": ["benefit 1", "benefit 2", "benefit 3"],
  "differentiators": ["what makes it unique 1", "what makes it unique 2"],
  "socialProof": { "type": "testimonial|stats|logos", "content": "...", "author": "...", "title": "..." } or null,
  "pricing": { "model": "saas|one-time|freemium|free", "pricePoint": "..." or null, "ctaAction": "signup|demo|download|waitlist" } or null,
  "tone": "professional|casual|bold|playful"
}

Choose the tone based on the product type and how the user communicated:
- professional: B2B, enterprise, serious products
- casual: consumer apps, friendly products
- bold: disruptive products, strong opinions
- playful: fun products, creative tools`;

export function buildLandingPagePrompt(data: ExtractedProductData): string {
  const toneInstructions: Record<Tone, string> = {
    professional:
      "Professional, authoritative tone. Clear, confident, trustworthy.",
    casual: "Friendly, conversational tone. Approachable, like a smart friend.",
    bold: "Bold, direct tone. Provocative, confident, cut through the noise.",
    playful: "Fun, energetic tone. Witty, memorable, clever where appropriate.",
  };

  return `Generate landing page copy based on this product information:

Product: ${data.productName}
Target Audience: ${data.targetAudience}
Problem: ${data.problem}
Solution: ${data.solution}
Benefits: ${data.benefits.join(", ")}
Differentiators: ${data.differentiators.join(", ")}
${data.socialProof ? `Social Proof: ${data.socialProof.content}` : ""}
${data.pricing ? `Pricing: ${data.pricing.model}, CTA: ${data.pricing.ctaAction}` : ""}

Tone: ${toneInstructions[data.tone]}

Generate copy for each section. Rules:
1. Headlines: Max 10 words, specific, no buzzwords
2. Subheadlines: 1-2 sentences explaining the "what"
3. Benefits: Outcome-focused, not feature-focused
4. CTA: Action-oriented, specific to the product

FORBIDDEN WORDS (never use): revolutionize, supercharge, seamless, game-changer, cutting-edge, next-generation, powerful, unlock, elevate, empower, leverage, synergy, robust, scalable, innovative

Sound like a smart human copywriter, not AI.

Return ONLY valid JSON (no markdown):
{
  "hero": {
    "headline": "max 10 words",
    "subheadline": "1-2 sentences",
    "cta": "action text"
  },
  "benefits": [
    { "title": "short title", "description": "1 sentence" },
    { "title": "short title", "description": "1 sentence" },
    { "title": "short title", "description": "1 sentence" }
  ],
  "problem": {
    "headline": "agitate the problem",
    "body": "2-3 sentences describing the pain"
  },
  "socialProof": ${
    data.socialProof
      ? `{
    "quote": "testimonial quote",
    "author": "${data.socialProof.author || "Customer"}",
    "title": "${data.socialProof.title || ""}"
  }`
      : "null"
  },
  "finalCta": {
    "headline": "reinforcing headline",
    "cta": "final action text"
  },
  "metadata": {
    "title": "page title for SEO",
    "description": "meta description for SEO"
  }
}`;
}
