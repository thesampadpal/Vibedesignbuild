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
