import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-20 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        {/* Hero */}
        <header className="text-center mb-20 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-zinc-900"
              >
                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
              </svg>
            </div>
            <span className="font-display text-2xl font-bold text-white">
              Vibedezine
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Landing pages that
            <br />
            <span className="text-accent">actually convert</span>
          </h1>

          <p className="text-xl text-zinc-400 max-w-xl mx-auto mb-10">
            Stop spending hours on CSS. Answer a few questions, get a landing
            page with copy that sells and design that doesn&apos;t embarrass you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-zinc-900 font-semibold rounded-xl hover:bg-accent-hover transition-colors"
            >
              Build Your Landing Page
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/quick"
              className="inline-flex items-center gap-2 px-6 py-4 text-zinc-400 hover:text-white transition-colors"
            >
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
                <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              Just need copy? Quick mode
            </Link>
          </div>
        </header>

        {/* How it works */}
        <section className="mb-20 animate-fade-in-delay-1">
          <h2 className="text-xs font-medium text-zinc-600 uppercase tracking-widest text-center mb-10">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4">
                <span className="text-accent font-bold">1</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Answer questions</h3>
              <p className="text-zinc-500 text-sm">
                Tell us about your product, audience, and what makes you different.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4">
                <span className="text-accent font-bold">2</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Get your page</h3>
              <p className="text-zinc-500 text-sm">
                We generate copy that converts and inject it into a clean template.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4">
                <span className="text-accent font-bold">3</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Deploy anywhere</h3>
              <p className="text-zinc-500 text-sm">
                Download the code. Drop it on Vercel, Netlify, or anywhere else.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-20 animate-fade-in-delay-2">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 md:p-12">
            <h2 className="font-display text-2xl font-bold text-white mb-8">
              Built for founders who ship
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-accent"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">
                    Copy that sounds human
                  </h3>
                  <p className="text-zinc-500 text-sm">
                    No &quot;revolutionize&quot; or &quot;supercharge&quot;. Words that actual
                    humans would write.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-accent"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">
                    Design you won&apos;t be ashamed of
                  </h3>
                  <p className="text-zinc-500 text-sm">
                    No AI slop. Clean templates that look like you hired someone.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-accent"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">
                    Code you can actually use
                  </h3>
                  <p className="text-zinc-500 text-sm">
                    HTML + Tailwind. No dependencies. Works everywhere.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center animate-fade-in-delay-3">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Stop wasting time on CSS
          </h2>
          <p className="text-zinc-500 mb-8">
            Get a landing page you&apos;re proud of in under 5 minutes.
          </p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-zinc-900 font-semibold rounded-xl hover:bg-accent-hover transition-colors"
          >
            Start Building
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </section>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-zinc-900 text-center">
          <p className="text-zinc-600 text-xs">
            Built for founders who ship fast
          </p>
        </footer>
      </div>
    </main>
  );
}
