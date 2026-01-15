// Quick Mode Types (existing)
export interface GeneratedCopy {
  headline: string;
  subheadline: string;
  benefits: [string, string, string];
  cta: string;
}

export type Tone = "professional" | "casual" | "bold" | "playful";

export const TONE_LABELS: Record<Tone, string> = {
  professional: "Professional",
  casual: "Casual",
  bold: "Bold",
  playful: "Playful",
};

// Interview Types
export interface InterviewMessage {
  role: "user" | "assistant";
  content: string;
}

export interface InterviewSession {
  id: string;
  messages: InterviewMessage[];
  extractedData: ExtractedProductData | null;
  status: "interviewing" | "extracting" | "complete";
  createdAt: number;
}

export interface ExtractedProductData {
  productName: string;
  tagline: string;
  targetAudience: string;
  problem: string;
  solution: string;
  benefits: string[];
  differentiators: string[];
  socialProof: SocialProof | null;
  pricing: PricingInfo | null;
  tone: Tone;
}

export interface SocialProof {
  type: "testimonial" | "stats" | "logos";
  content: string;
  author?: string;
  title?: string;
}

export interface PricingInfo {
  model: "saas" | "one-time" | "freemium" | "free";
  pricePoint: string | null;
  ctaAction: "signup" | "demo" | "download" | "waitlist";
}

// Landing Page Types
export type SectionType =
  | "hero"
  | "benefits"
  | "problem"
  | "social-proof"
  | "pricing"
  | "cta";

export interface LandingPageSection {
  type: SectionType;
  visible: boolean;
  copy: SectionCopy;
}

export interface SectionCopy {
  headline?: string;
  subheadline?: string;
  body?: string;
  items?: Array<{ title: string; description: string }>;
  cta?: { text: string; action: string };
  testimonial?: { quote: string; author: string; title: string };
}

export interface ThemeConfig {
  template: "minimal" | "modern" | "bold";
  accentColor: string;
  darkMode: boolean;
}

export interface GeneratedLandingPage {
  sections: LandingPageSection[];
  theme: ThemeConfig;
  metadata: {
    title: string;
    description: string;
  };
}

// Export Types
export interface ExportedCode {
  html: string;
  instructions: string;
}
