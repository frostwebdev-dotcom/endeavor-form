export default function LandingHero() {
  const badges = [
    {
      label: "Confidential by design",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      ),
    },
    {
      label: "Executive search & advisory",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      ),
    },
    {
      label: "Thoughtful, human follow-up",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      ),
    },
  ];

  return (
    <section
      className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24"
      aria-labelledby="hero-headline"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-accent dark:text-warm-300 opacity-0 animate-fade-in-up [animation-fill-mode:forwards]">
            Endeavor Search Partners
          </p>
          <h1
            id="hero-headline"
            className="mt-4 font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-zinc-900 dark:text-white leading-[1.15] tracking-tight opacity-0 animate-fade-in-up [animation-delay:60ms] [animation-fill-mode:forwards]"
          >
            Career moves deserve a partner who listens first—then opens the
            right doors.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl opacity-0 animate-fade-in-up [animation-delay:120ms] [animation-fill-mode:forwards]">
            We work with professionals exploring their next chapter: confidential
            conversations, aligned opportunities, and guidance grounded in
            respect for your experience and goals.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 opacity-0 animate-fade-in-up [animation-delay:180ms] [animation-fill-mode:forwards]">
            <a
              href="#form"
              className="inline-flex items-center justify-center min-h-[48px] px-7 rounded-full text-base font-semibold text-white bg-gradient-cta shadow-soft dark:shadow-glow hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-crypto-cyan focus:ring-offset-2 focus:ring-offset-surface-warm dark:focus:ring-offset-[#0a0a0f] transition-all duration-200"
            >
              Schedule a conversation
            </a>
            <a
              href="mailto:hello@infoendeavorconnect.com"
              className="inline-flex items-center justify-center min-h-[48px] px-7 rounded-full text-base font-semibold text-zinc-800 dark:text-zinc-200 border border-zinc-300/90 dark:border-white/15 bg-white/70 dark:bg-white/[0.04] hover:bg-white dark:hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-crypto-cyan focus:ring-offset-2 focus:ring-offset-surface-warm dark:focus:ring-offset-[#0a0a0f] transition-colors"
            >
              Email our team
            </a>
          </div>
        </div>

        <ul
          className="mt-12 lg:mt-14 flex flex-wrap gap-3 sm:gap-4 opacity-0 animate-fade-in-up [animation-delay:240ms] [animation-fill-mode:forwards]"
          aria-label="Trust highlights"
        >
          {badges.map((b) => (
            <li
              key={b.label}
              className="inline-flex items-center gap-2.5 rounded-full border border-zinc-200/90 dark:border-white/[0.1] bg-white/60 dark:bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 shadow-soft"
            >
              <svg
                className="h-5 w-5 text-accent dark:text-crypto-cyan flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                {b.icon}
              </svg>
              {b.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
