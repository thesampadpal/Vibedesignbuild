"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ExtractedProductData, Tone, TONE_LABELS } from "@/lib/types";
import { trackEvent } from "@/components/providers/PostHogProvider";

interface ExtractedContext {
  productName: string;
  description: string;
  targetAudience: string;
  keyBenefit: string;
  problem: string;
}

function isUrl(str: string): boolean {
  const trimmed = str.trim();
  // Check if it starts with http/https or looks like a domain
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return true;
  }
  // Check for common domain patterns
  const domainPattern = /^[\w-]+(\.[\w-]+)+/;
  return domainPattern.test(trimmed);
}

function normalizeUrl(str: string): string {
  const trimmed = str.trim();
  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
    return `https://${trimmed}`;
  }
  return trimmed;
}

export default function SimplifiedInput() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [initialInput, setInitialInput] = useState("");
  const [inputType, setInputType] = useState<"url" | "text" | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [extractedContext, setExtractedContext] = useState<ExtractedContext>({
    productName: "",
    description: "",
    targetAudience: "",
    keyBenefit: "",
    problem: "",
  });

  // Step 2 editable fields
  const [targetAudience, setTargetAudience] = useState("");
  const [keyBenefit, setKeyBenefit] = useState("");
  const [tone, setTone] = useState<Tone>("professional");

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!initialInput.trim()) return;

    setError(null);

    if (isUrl(initialInput)) {
      // URL flow - analyze the URL
      setInputType("url");
      setIsAnalyzing(true);

      try {
        const response = await fetch("/api/analyze-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: normalizeUrl(initialInput) }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to analyze URL");
        }

        const extracted = data.extracted as ExtractedContext;
        setExtractedContext(extracted);
        setTargetAudience(extracted.targetAudience || "");
        setKeyBenefit(extracted.keyBenefit || "");

        trackEvent("url_analyzed", { url: normalizeUrl(initialInput) });
        setStep(2);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to analyze URL. Try describing your product instead."
        );
      } finally {
        setIsAnalyzing(false);
      }
    } else {
      // Text description flow
      setInputType("text");
      setExtractedContext({
        productName: "",
        description: initialInput.trim(),
        targetAudience: "",
        keyBenefit: "",
        problem: "",
      });
      setStep(2);
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Build ExtractedProductData from simplified input
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const productData: ExtractedProductData = {
      productName: extractedContext.productName || "Product",
      tagline: extractedContext.description || initialInput,
      targetAudience: targetAudience || "people looking for a solution",
      problem: extractedContext.problem || "",
      solution: extractedContext.description || initialInput,
      benefits: keyBenefit ? [keyBenefit] : [],
      differentiators: [],
      socialProof: null,
      pricing: null,
      tone,
    };

    // Store in sessionStorage
    sessionStorage.setItem(`interview_${sessionId}`, JSON.stringify(productData));

    trackEvent("simplified_input_completed", {
      sessionId,
      inputType,
      hasTargetAudience: !!targetAudience,
      hasKeyBenefit: !!keyBenefit,
      tone,
    });

    // Redirect to preview
    router.push(`/preview/${sessionId}`);
  };

  const goBack = () => {
    setStep(1);
    setError(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {step === 1 && (
        <form onSubmit={handleStep1Submit} className="space-y-6">
          <div>
            <label
              htmlFor="initial-input"
              className="block text-sm font-medium text-zinc-400 mb-3"
            >
              Paste a URL or describe your product
            </label>
            <textarea
              id="initial-input"
              value={initialInput}
              onChange={(e) => setInitialInput(e.target.value)}
              placeholder="https://github.com/your-project or 'An app that helps developers...'"
              rows={4}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
              disabled={isAnalyzing}
              autoFocus
            />
            <p className="mt-2 text-xs text-zinc-500">
              Works with websites, GitHub repos, Product Hunt pages, or just describe what you&apos;re building
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={!initialInput.trim() || isAnalyzing}
            className="w-full py-3 px-6 bg-accent text-zinc-900 font-semibold rounded-xl hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                Continue
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleStep2Submit} className="space-y-6">
          {/* Context preview */}
          {extractedContext.productName && (
            <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
              <p className="text-sm text-zinc-400">
                Detected: <span className="text-white font-medium">{extractedContext.productName}</span>
              </p>
              {extractedContext.description && (
                <p className="text-sm text-zinc-500 mt-1 line-clamp-2">
                  {extractedContext.description}
                </p>
              )}
            </div>
          )}

          <div>
            <label
              htmlFor="target-audience"
              className="block text-sm font-medium text-zinc-400 mb-2"
            >
              Who is this for?
            </label>
            <input
              id="target-audience"
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g., Solo developers building SaaS products"
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              autoFocus
            />
          </div>

          <div>
            <label
              htmlFor="key-benefit"
              className="block text-sm font-medium text-zinc-400 mb-2"
            >
              What&apos;s the main outcome they get?
            </label>
            <input
              id="key-benefit"
              type="text"
              value={keyBenefit}
              onChange={(e) => setKeyBenefit(e.target.value)}
              placeholder="e.g., Ship landing pages in minutes instead of days"
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-3">
              Tone
            </label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(TONE_LABELS) as Tone[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    tone === t
                      ? "bg-accent text-zinc-900"
                      : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-300"
                  }`}
                >
                  {TONE_LABELS[t]}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-zinc-500">
            Leave fields blank and we&apos;ll figure it out. Fill in for better results.
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={goBack}
              className="px-6 py-3 text-zinc-400 hover:text-white border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-6 bg-accent text-zinc-900 font-semibold rounded-xl hover:bg-accent-hover transition-colors flex items-center justify-center gap-2"
            >
              Generate Landing Page
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
