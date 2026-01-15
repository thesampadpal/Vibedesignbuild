"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ExtractedProductData,
  GeneratedLandingPage,
  ThemeConfig,
} from "@/lib/types";
import {
  Hero,
  Benefits,
  Problem,
  SocialProof,
  FinalCTA,
} from "@/components/templates/minimal";

export default function PreviewPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;

  const [extractedData, setExtractedData] =
    useState<ExtractedProductData | null>(null);
  const [landingPage, setLandingPage] = useState<GeneratedLandingPage | null>(
    null
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportedCode, setExportedCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<ThemeConfig>({
    template: "minimal",
    accentColor: "#d97706",
    darkMode: true,
  });
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  // Load extracted data from session storage
  useEffect(() => {
    const storedData = sessionStorage.getItem(`interview_${sessionId}`);
    if (storedData) {
      const data = JSON.parse(storedData) as ExtractedProductData;
      setExtractedData(data);
      generatePage(data);
    } else {
      setError("Session not found. Please start a new interview.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  const generatePage = async (data: ExtractedProductData) => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/generate/page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ extractedData: data, theme }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to generate page");
      }

      setLandingPage(result.landingPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  };

  const exportPage = async () => {
    if (!landingPage) return;

    setIsExporting(true);
    setError(null);

    try {
      const response = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ landingPage }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to export page");
      }

      setExportedCode(result.html);
      setViewMode("code");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsExporting(false);
    }
  };

  const copyCode = async () => {
    if (!exportedCode) return;
    await navigator.clipboard.writeText(exportedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCode = () => {
    if (!exportedCode) return;
    const blob = new Blob([exportedCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "landing-page.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const accentColors = [
    { name: "Amber", value: "#d97706" },
    { name: "Blue", value: "#2563eb" },
    { name: "Emerald", value: "#059669" },
    { name: "Rose", value: "#e11d48" },
    { name: "Violet", value: "#7c3aed" },
  ];

  if (error && !landingPage) {
    return (
      <main className="min-h-screen px-6 py-20 flex flex-col items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-6">{error}</p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-zinc-900 font-semibold rounded-xl"
          >
            Start New Interview
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Toolbar */}
      <header className="sticky top-0 z-50 glass border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/create"
              className="text-zinc-500 hover:text-zinc-300 transition-colors"
            >
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
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
            </Link>
            <span className="font-display font-bold text-white">Preview</span>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-zinc-900 rounded-lg p-1">
            <button
              onClick={() => setViewMode("preview")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                viewMode === "preview"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => {
                if (!exportedCode) exportPage();
                setViewMode("code");
              }}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                viewMode === "code"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Code
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Color Picker */}
            <div className="flex items-center gap-1">
              {accentColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => {
                    setTheme({ ...theme, accentColor: color.value });
                    if (extractedData) generatePage(extractedData);
                  }}
                  className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                    theme.accentColor === color.value
                      ? "border-white"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>

            <div className="w-px h-6 bg-zinc-800" />

            <button
              onClick={exportPage}
              disabled={isExporting || !landingPage}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-zinc-900 font-semibold rounded-lg hover:bg-accent-hover disabled:opacity-50 transition-colors"
            >
              {isExporting ? (
                "Exporting..."
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                  Export
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1">
        {isGenerating ? (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent"
                >
                  <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                </svg>
              </div>
              <p className="text-zinc-400">Generating your landing page...</p>
            </div>
          </div>
        ) : viewMode === "preview" && landingPage ? (
          <div className="bg-[#09090b]">
            {/* Hero */}
            {landingPage.sections.find((s) => s.type === "hero") && (
              <Hero
                headline={
                  landingPage.sections.find((s) => s.type === "hero")?.copy
                    .headline || ""
                }
                subheadline={
                  landingPage.sections.find((s) => s.type === "hero")?.copy
                    .subheadline || ""
                }
                cta={
                  landingPage.sections.find((s) => s.type === "hero")?.copy.cta
                    ?.text || ""
                }
                accentColor={theme.accentColor}
              />
            )}

            {/* Benefits */}
            {landingPage.sections.find((s) => s.type === "benefits")?.copy
              .items && (
              <Benefits
                benefits={
                  landingPage.sections.find((s) => s.type === "benefits")?.copy
                    .items || []
                }
                accentColor={theme.accentColor}
              />
            )}

            {/* Problem */}
            {landingPage.sections.find(
              (s) => s.type === "problem" && s.visible
            ) && (
              <Problem
                headline={
                  landingPage.sections.find((s) => s.type === "problem")?.copy
                    .headline || ""
                }
                body={
                  landingPage.sections.find((s) => s.type === "problem")?.copy
                    .body || ""
                }
              />
            )}

            {/* Social Proof */}
            {landingPage.sections.find(
              (s) => s.type === "social-proof" && s.visible
            )?.copy.testimonial && (
              <SocialProof
                quote={
                  landingPage.sections.find((s) => s.type === "social-proof")
                    ?.copy.testimonial?.quote || ""
                }
                author={
                  landingPage.sections.find((s) => s.type === "social-proof")
                    ?.copy.testimonial?.author || ""
                }
                title={
                  landingPage.sections.find((s) => s.type === "social-proof")
                    ?.copy.testimonial?.title
                }
                accentColor={theme.accentColor}
              />
            )}

            {/* Final CTA */}
            {landingPage.sections.find((s) => s.type === "cta") && (
              <FinalCTA
                headline={
                  landingPage.sections.find((s) => s.type === "cta")?.copy
                    .headline || ""
                }
                cta={
                  landingPage.sections.find((s) => s.type === "cta")?.copy.cta
                    ?.text || ""
                }
                accentColor={theme.accentColor}
              />
            )}
          </div>
        ) : viewMode === "code" ? (
          <div className="max-w-5xl mx-auto px-6 py-8">
            {/* Code Actions */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-zinc-500">index.html</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyCode}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    copied
                      ? "text-accent bg-accent/10"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }`}
                >
                  {copied ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Copied
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          width="14"
                          height="14"
                          x="8"
                          y="8"
                          rx="2"
                          ry="2"
                        />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
                <button
                  onClick={downloadCode}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                  Download
                </button>
              </div>
            </div>

            {/* Code Block */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              <pre className="p-6 overflow-x-auto text-sm text-zinc-300 leading-relaxed">
                <code>{exportedCode || "Generating code..."}</code>
              </pre>
            </div>

            {/* Instructions */}
            <div className="mt-8 p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
              <h3 className="font-semibold text-white mb-4">How to deploy</h3>
              <ol className="space-y-3 text-zinc-400">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <span>Download or copy the HTML code above</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <span>Save it as index.html</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <span>
                    Deploy to Netlify, Vercel, or any static hosting - just drag
                    and drop
                  </span>
                </li>
              </ol>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
