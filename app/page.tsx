"use client";

import MeetingRequestForm from "@/components/MeetingRequestForm";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import LandingHero from "@/components/landing/LandingHero";
import SectionShell from "@/components/landing/SectionShell";
import TrustSection from "@/components/landing/TrustSection";
import WhyChooseSection from "@/components/landing/WhyChooseSection";

export default function MeetingRequestPage() {
  return (
    <div className="min-h-screen bg-surface-warm dark:bg-[#0a0a0f] bg-grid-pattern dark:bg-grid-dark bg-grid overflow-x-hidden relative transition-colors duration-200">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-glow opacity-0 dark:opacity-100 animate-bg-glow-breathe"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-drift-layer opacity-0 dark:opacity-100 animate-bg-gradient-drift"
        aria-hidden
      />

      <header className="sticky top-0 z-20 border-b border-zinc-200/80 dark:border-white/[0.08] bg-white/95 dark:bg-[#0a0a0f]/90 backdrop-blur-xl transition-colors duration-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
            <a
              href="https://lp.infoendeavorconnect.com/"
              className="flex items-center min-h-[44px] min-w-0 flex-shrink focus:outline-none focus:ring-2 focus:ring-crypto-cyan focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#0a0a0f] rounded-lg"
              aria-label="Endeavor Search Partners - Home"
            >
              <img
                src="/Endeavor-logo.png"
                alt="Endeavor Search Partners"
                className="h-7 sm:h-8 md:h-9 w-auto max-w-[140px] sm:max-w-[180px] object-contain object-left brightness-0 dark:brightness-100 transition-[filter] duration-200"
                width={180}
                height={36}
              />
            </a>
            <div className="flex items-center gap-1 sm:gap-4 min-w-0 flex-shrink-0">
              <a
                href="mailto:hello@infoendeavorconnect.com"
                className="flex items-center justify-center min-h-[44px] min-w-[44px] sm:min-w-0 sm:gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-crypto-cyan transition-colors focus:outline-none focus:ring-2 focus:ring-crypto-cyan focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#0a0a0f] rounded-lg sm:px-2 sm:-mx-2"
                aria-label="Email hello@infoendeavorconnect.com"
              >
                <svg
                  className="w-5 h-5 sm:w-4 sm:h-4 text-accent dark:text-crypto-cyan flex-shrink-0"
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
                <span className="hidden sm:inline font-medium truncate">
                  hello@infoendeavorconnect.com
                </span>
              </a>
              <a
                href="tel:+16092000245"
                className="flex items-center justify-center min-h-[44px] min-w-[44px] sm:min-w-0 sm:gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-crypto-cyan transition-colors focus:outline-none focus:ring-2 focus:ring-crypto-cyan focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#0a0a0f] rounded-lg sm:px-2 sm:-mx-2"
                aria-label="Call 609-200-0245"
              >
                <svg
                  className="w-5 h-5 sm:w-4 sm:h-4 text-accent dark:text-crypto-cyan flex-shrink-0"
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
                <span className="hidden sm:inline font-medium">609-200-0245</span>
              </a>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <a
                href="#form"
                className="min-h-[44px] inline-flex items-center justify-center px-4 sm:px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-cta hover:opacity-90 hover:scale-[1.02] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-crypto-cyan focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#0a0a0f] transition-all duration-200 shadow-soft dark:shadow-glow whitespace-nowrap"
              >
                <span className="sm:hidden">Schedule</span>
                <span className="hidden sm:inline">Schedule a conversation</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <LandingHero />
        <WhyChooseSection />
        <HowItWorksSection />
        <TrustSection />

        <section
          className="relative border-t border-zinc-200/80 dark:border-white/[0.08] py-16 lg:py-24 scroll-mt-24"
          aria-labelledby="contact-heading"
        >
          <SectionShell narrow>
            <div className="text-center mb-10 lg:mb-12">
              <p className="text-sm font-medium uppercase tracking-widest text-accent dark:text-warm-300">
                Next step
              </p>
              <h2
                id="contact-heading"
                className="mt-3 font-serif text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-white tracking-tight"
              >
                Request a confidential conversation
              </h2>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                Share a few details and your preferred time. We read every
                submission personally and respond with care—never with bulk
                mail or pressure.
              </p>
            </div>
            <MeetingRequestForm />
          </SectionShell>
        </section>
      </main>

      <footer className="relative border-t border-zinc-200/80 dark:border-white/[0.08] py-10 mt-4 transition-colors duration-200 bg-zinc-50/50 dark:bg-[#08080c]/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500 dark:text-zinc-500">
          <p>© {new Date().getFullYear()} Endeavor Search Partners</p>
          <a
            href="https://lp.infoendeavorconnect.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 dark:text-zinc-400 hover:text-crypto-cyan transition-colors"
          >
            lp.infoendeavorconnect.com
          </a>
        </div>
      </footer>
    </div>
  );
}
