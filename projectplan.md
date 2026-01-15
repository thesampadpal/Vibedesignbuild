# Vibedezine Project Plan

## Vision

**One-liner**: AI-powered landing page generator that interviews you, then builds a page that converts.

**Target User**: Technical solo founders who can code but can't design. Bootstrapped, building SaaS, embarrassed by their current landing pages.

**Differentiation**: Conversion-focused copy. Not just pretty design — words that actually sell.

---

## User Journey

```
User lands → Starts interview → AI asks 3-5 questions →
System generates landing page (copy + design) →
User previews → Customizes (optional) → Downloads code → Deploys
```

---

## Interview Flow

The AI conducts a conversational interview to extract what it needs:

| # | Question | Purpose |
|---|----------|---------|
| 1 | "What are you building? Elevator pitch." | Core value prop, audience |
| 2 | "What painful problem do your users have?" | Benefits copy, positioning |
| 3 | "What makes you different?" | USP, differentiators |
| 4 | "Any traction or testimonials?" (optional) | Social proof section |
| 5 | "Business model and price point?" (optional) | CTA strategy |

**Rules**:
- Max 5 questions
- Skip if already answered
- Conversational, not form-like
- Build on previous answers

---

## Landing Page Sections

### MVP (Always generated)
1. **Hero** - Headline, subheadline, CTA
2. **Benefits** - 3 outcome-focused benefits with icons
3. **Final CTA** - Reinforcing headline + button

### Phase 2 (If data exists)
4. **Problem/Solution** - Agitate pain, present solution
5. **Social Proof** - Testimonial or stats
6. **Pricing** - Simple pricing card

---

## Anti-AI-Slop Design Strategy

Instead of AI generating arbitrary designs, we use **curated templates**:

| Template | Style | Best For |
|----------|-------|----------|
| Minimal | White/dark, max whitespace, large type | Dev tools, B2B SaaS |
| Modern | Subtle gradients, cards, soft shadows | Consumer apps, startups |
| Bold | High contrast, strong hierarchy | Agencies, bold brands |

**Design rules enforced**:
- No purple-to-blue gradients
- No generic 3D illustrations
- Single accent color + neutrals only
- Max 2 fonts
- Icons: Lucide only (consistent)
- Max border-radius: 12px

**Key insight**: AI generates **copy only**. Templates handle **design**. User picks template.

---

## Output Format

**MVP**: Single HTML file with Tailwind CDN

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <!-- Generated landing page -->
</body>
</html>
```

**Why**: Zero dependencies, works anywhere (Netlify drop, GitHub Pages, local preview).

**Future**: Next.js/React component export for power users.

---

## Technical Architecture

### New Routes
```
/                           # Vibedezine marketing page
/create                     # Start interview
/create/[sessionId]         # Active interview chat
/preview/[sessionId]        # Preview generated page
```

### New API Endpoints
```
POST /api/interview/chat    # Process interview messages
POST /api/generate/page     # Generate full landing page
POST /api/export            # Export to HTML
```

### New Components
```
/components
  /interview
    InterviewChat.tsx       # Chat UI
    MessageBubble.tsx       # Message display
    TypingIndicator.tsx     # AI typing animation
  /preview
    LandingPagePreview.tsx  # Full preview
    ThemeSelector.tsx       # Template picker
  /templates
    /minimal
      Hero.tsx
      Benefits.tsx
      CTA.tsx
  /export
    CodePreview.tsx         # Show generated code
    DownloadButton.tsx      # Download functionality
```

### Data Models
```typescript
interface InterviewSession {
  id: string;
  messages: { role: 'user' | 'assistant'; content: string }[];
  extractedData: ProductData | null;
  status: 'interviewing' | 'generating' | 'complete';
}

interface ProductData {
  productName: string;
  tagline: string;
  audience: string;
  problem: string;
  solution: string;
  benefits: string[];
  differentiators: string[];
  socialProof?: { quote: string; author: string };
  pricing?: { model: string; price: string };
}

interface GeneratedPage {
  sections: Section[];
  theme: { template: string; accent: string; darkMode: boolean };
}
```

---

## MVP Scope

### Must Have (Week 1-2)
- [ ] Interview chat flow (3-5 questions)
- [ ] Single template (Minimal)
- [ ] Hero + Benefits + CTA sections
- [ ] HTML + Tailwind export
- [ ] Copy/download code

### Phase 2 (Week 3-4)
- [ ] 3 template options
- [ ] Color customization
- [ ] Problem/Solution section
- [ ] Social proof section
- [ ] Preview device toggle (mobile/desktop)

### Phase 3 (Month 2)
- [ ] Pricing section
- [ ] FAQ section (AI-generated)
- [ ] Next.js export option
- [ ] Session persistence
- [ ] Share preview link

### Backlog
- User accounts
- One-click Vercel deploy
- A/B copy variations
- SEO optimization
- Figma export

---

## Implementation Order

### Step 1: Interview Flow
1. Create interview API route with OpenRouter
2. Build chat UI components
3. Create /create and /create/[sessionId] pages
4. Test conversation flow end-to-end

### Step 2: Page Generation
1. Create page generation API
2. Build Minimal template components
3. Create preview page with template rendering
4. Wire up interview → generation flow

### Step 3: Export
1. Build HTML generation from template + copy
2. Create code preview component
3. Add copy/download functionality
4. Test exported HTML in browsers

### Step 4: Polish
1. Loading states and animations
2. Error handling
3. Mobile responsive
4. Copy quality review

---

## Key Files to Modify/Create

| File | Action |
|------|--------|
| `lib/types.ts` | Extend with interview + page types |
| `lib/prompts.ts` | Create - AI prompt templates |
| `app/create/page.tsx` | Create - Interview entry |
| `app/create/[sessionId]/page.tsx` | Create - Interview chat |
| `app/preview/[sessionId]/page.tsx` | Create - Preview page |
| `app/api/interview/chat/route.ts` | Create - Interview API |
| `app/api/generate/page/route.ts` | Create - Page generation |
| `app/api/export/route.ts` | Create - HTML export |
| `components/interview/*` | Create - Chat components |
| `components/templates/minimal/*` | Create - Template components |
| `components/preview/*` | Create - Preview components |

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| AI generates generic copy | Strict forbidden-word list, quality prompts |
| Templates look AI-generated | Hand-craft templates, enforce design rules |
| Interview too long | Max 5 questions, skip option, progress bar |
| HTML export breaks | Test browsers, use Tailwind CDN |
| Scope creep | Strict MVP definition, defer Phase 2+ |

---

## Success Criteria

1. Interview completes in < 3 minutes
2. Copy passes "human-written" test
3. Design doesn't look like AI slop
4. User can deploy exported HTML in < 5 minutes
5. User would show this to investors without embarrassment

---

## What We Keep

The current copy generator stays as **Quick Mode** at `/quick`:
- Users who just want copy can still use it
- Good for returning users who know what they want
- Home page (`/`) becomes Vibedezine marketing page
- Main flow at `/create` for full interview experience

**Route structure**:
```
/           → Vibedezine marketing/landing page
/quick      → Current copy generator (quick mode)
/create     → New interview flow (main experience)
/preview/*  → Generated page preview
```

---

## Next Action

Start with **Step 1: Interview Flow** — the core differentiator.
