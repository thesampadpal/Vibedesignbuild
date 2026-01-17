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

          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Your landing page is
            <br />
            <span className="text-accent">costing you customers</span>
          </h1>

          <p className="text-xl text-zinc-400 max-w-xl mx-auto mb-10">
            You can build anything. But your landing page still looks like an MVP.
            <span className="text-zinc-300"> Paste your URL, get a page with copy that converts.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-zinc-900 font-semibold rounded-xl hover:bg-accent-hover transition-colors"
            >
              Create Your Landing Page
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
            <span className="text-zinc-600 text-sm">Free. No signup.</span>
          </div>
        </header>

        {/* Problem Section */}
        <section className="mb-20 animate-fade-in-delay-1">
          <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-8 md:p-10">
            <p className="text-zinc-400 text-lg leading-relaxed">
              You spent <span className="text-white">6 hours tweaking CSS</span> and it still looks off.
              You&apos;re embarrassed to share the link.
              You tell people <span className="text-white">&quot;ignore the design, it&apos;s just an MVP&quot;</span> —
              but visitors don&apos;t know that. They bounce.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="mb-20 animate-fade-in-delay-2">
          <h2 className="text-xs font-medium text-zinc-600 uppercase tracking-widest text-center mb-10">
            60 seconds, start to finish
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4">
                <span className="text-accent font-bold">1</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Paste or describe</h3>
              <p className="text-zinc-500 text-sm">
                Drop your website URL, GitHub repo, or just describe what you&apos;re building.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4">
                <span className="text-accent font-bold">2</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Get conversion copy</h3>
              <p className="text-zinc-500 text-sm">
                We write copy focused on turning visitors into customers. Not generic AI fluff.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4">
                <span className="text-accent font-bold">3</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Export and ship</h3>
              <p className="text-zinc-500 text-sm">
                Download clean HTML. Deploy to Vercel, Netlify, anywhere. Done.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-20 animate-fade-in-delay-3">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 md:p-12">
            <h2 className="font-display text-2xl font-bold text-white mb-8">
              Why this works
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
                    Conversion-focused, not generic
                  </h3>
                  <p className="text-zinc-500 text-sm">
                    Copy that speaks to your specific audience and their pain. Not &quot;revolutionize your workflow&quot; garbage.
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
                    Look legitimate instantly
                  </h3>
                  <p className="text-zinc-500 text-sm">
                    Clean design that makes visitors trust you before they even try your product.
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
                    Skip the $500 copywriter
                  </h3>
                  <p className="text-zinc-500 text-sm">
                    Test different angles in minutes. Iterate fast without waiting days for revisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center animate-fade-in-delay-4">
          <p className="text-zinc-500 mb-3 text-sm">
            Go from &quot;ignore the design&quot; to
          </p>
          <h2 className="font-display text-3xl font-bold text-white mb-8">
            &quot;Wait, you have a designer?&quot;
          </h2>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-zinc-900 font-semibold rounded-xl hover:bg-accent-hover transition-colors"
          >
            Create Your Landing Page
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
            Built for solo founders who ship
          </p>
        </footer>
      </div>
    </main>
  );
}
