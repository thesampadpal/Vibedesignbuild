\# Vibedezine MVP



\## Project Overview

AI-powered landing page copy generator for founders who can code but can't design.



\## Tech Stack

\- Next.js 14 (App Router)

\- Tailwind CSS

\- OpenRouter API (claude-3-haiku or llama-3)



\## Current MVP Scope

Input: User describes their product in 2-3 sentences

Output: Landing page copy (headline, subhead, 3 benefits, CTA)



\## Design Guidelines

\- Dark theme

\- Minimal, clean UI

\- No gradients, no emojis, no AI slop aesthetic

\- Good typography (Inter or Geist font)

\- Generous whitespace



\## File Structure

/app

&nbsp; /page.tsx (main input form)

&nbsp; /api/generate/route.ts (OpenRouter API call)

/components

&nbsp; /InputForm.tsx

&nbsp; /CopyOutput.tsx



\## API Setup

\- Using OpenRouter

\- Model: claude-3-haiku (or anthropic/claude-3-haiku on OpenRouter)

\- Endpoint: https://openrouter.ai/api/v1/chat/completions



\## The Generation Prompt

When user submits product description, generate:

1\. Headline (max 10 words, punchy, specific)

2\. Subheadline (1 sentence, explains what it does)

3\. 3 Benefits (short, outcome-focused, not feature-focused)

4\. CTA text (action-oriented, specific)



Copy should sound human, not AI. No buzzwords like "revolutionize", "supercharge", "seamless".



\## Rules

\- Keep components simple

\- No over-engineering

\- Ship fast, iterate later

\- If unsure, ask before building

