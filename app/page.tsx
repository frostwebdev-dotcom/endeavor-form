"use client";

import HeroPanel from "@/components/HeroPanel";
import MeetingRequestForm from "@/components/MeetingRequestForm";

export default function MeetingRequestPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] bg-grid-dark bg-grid overflow-x-hidden relative">
      {/* Subtle gradient glow at top */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-glow opacity-100"
        aria-hidden
      />

      {/* Header - glass navbar */}
      <header className="sticky top-0 z-20 border-b border-white/[0.08] bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8">
              <span className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Endeavor Search Partners
              </span>
              <a
                href="mailto:hello@infoendeavorconnect.com"
                className="flex items-center gap-2 min-h-[44px] text-sm text-zinc-400 hover:text-crypto-cyan transition-colors focus:outline-none focus:ring-2 focus:ring-crypto-cyan focus:ring-offset-2 focus:ring-offset-[#0a0a0f] rounded-lg px-2 -mx-2"
                aria-label="Email hello@infoendeavorconnect.com"
              >
                <svg
                  className="w-4 h-4 text-crypto-cyan flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-medium">hello@infoendeavorconnect.com</span>
              </a>
              <a
                href="tel:+16092000245"
                className="flex items-center gap-2 min-h-[44px] text-sm text-zinc-400 hover:text-crypto-cyan transition-colors focus:outline-none focus:ring-2 focus:ring-crypto-cyan focus:ring-offset-2 focus:ring-offset-[#0a0a0f] rounded-lg px-2 -mx-2"
                aria-label="Call 609-200-0245"
              >
                <svg
                  className="w-4 h-4 text-crypto-cyan flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="font-medium">609-200-0245</span>
              </a>
            </div>
            <a
              href="#form"
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-cta hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-crypto-cyan focus:ring-offset-2 focus:ring-offset-[#0a0a0f] transition-all duration-200 shadow-glow hover:shadow-glow-lg"
            >
              Schedule an Appointment
            </a>
          </div>
        </div>
      </header>

      {/* Main: two-column desktop, stacked mobile */}
      <main className="relative mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="grid lg:grid-cols-[1fr,1.05fr] gap-10 lg:gap-14 xl:gap-16 items-start">
          <HeroPanel />
          <MeetingRequestForm />
        </div>
      </main>

      <footer className="relative border-t border-white/[0.08] py-6 mt-8">
        <p className="text-center text-sm text-zinc-500">
          <a
            href="https://lp.infoendeavorconnect.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-crypto-cyan transition-colors"
          >
            lp.infoendeavorconnect.com
          </a>
        </p>
      </footer>
    </div>
  );
}
