"use client";

import Link from "next/link";
import {
  KeyboardEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Container from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/site";

type Frame = {
  kicker: string;
  title: string;
  lead: string;
  asideLabel: string;
  asideTitle: string;
  asideBody: string;
  number: string;
};

const FRAMES: Frame[] = [
  {
    kicker: "Endeavor Search Partners",
    title:
      "Guiding successful financial advisors through the most important decisions of their career.",
    lead:
      "We take time to understand what matters to you, evaluate strong options, make thoughtful introductions, and help you navigate negotiations—so you can stay focused on your practice and the clients you serve.",
    asideLabel: "A senior-led team",
    asideTitle: "Same side of the table",
    asideBody:
      "We advocate for you, not a firm. Our goal is the right outcome for your practice and your clients.",
    number: "—",
  },
  {
    kicker: "Step 01 · Understand",
    title: "We listen first, then advise.",
    lead:
      "Tell us what you want more of and what you want to avoid. The conversation starts with your priorities—not a pitch.",
    asideLabel: "What we'll cover",
    asideTitle: "Your priorities in plain language",
    asideBody:
      "Practice goals, client experience, economics, lifestyle, and the non-negotiables that define a strong fit.",
    number: "01",
  },
  {
    kicker: "Step 02 · Evaluate",
    title: "A clear outside perspective.",
    lead:
      "Compare paths, firms, and business models in plain language so you can think clearly about what actually fits.",
    asideLabel: "How we compare",
    asideTitle: "Structure, support, and economics",
    asideBody:
      "We translate each option into terms that matter to your practice—what changes day-to-day, and what doesn't.",
    number: "02",
  },
  {
    kicker: "Step 03 · Connect",
    title: "Thoughtful, targeted introductions.",
    lead:
      "Only the firms and leaders that genuinely fit your goals—so every meeting is prepared, focused, and worth your time.",
    asideLabel: "How we introduce",
    asideTitle: "Prepared on both sides",
    asideBody:
      "We brief each side before you meet, so conversations start with substance and respect your time.",
    number: "03",
  },
  {
    kicker: "Step 04 · Consult",
    title: "Negotiations with a steady advocate.",
    lead:
      "We help you evaluate terms, structures, and transition plans—so you sign with clarity and confidence.",
    asideLabel: "Where we add value",
    asideTitle: "Clarity in the details",
    asideBody:
      "Economics, equity, retention, timing, and transition mechanics—reviewed with your long-term interests in mind.",
    number: "04",
  },
  {
    kicker: "Confidential by default",
    title: "One conversation can save weeks.",
    lead:
      "No pressure, no bulk outreach, no disclosures. Every conversation is held in confidence until you decide a next step is right.",
    asideLabel: "Our commitments",
    asideTitle: "Your trust, protected",
    asideBody:
      "Personally reviewed inquiries. Senior-led conversations. Discretion from first call to final decision.",
    number: "★",
  },
];

const AUTOPLAY_MS = 6500;

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const regionRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mql.matches;
    const listener = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (paused) return;
    if (prefersReducedMotion.current) return;
    const id = window.setTimeout(() => {
      setActive((i) => (i + 1) % FRAMES.length);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [active, paused]);

  const goTo = useCallback((i: number) => {
    setActive(((i % FRAMES.length) + FRAMES.length) % FRAMES.length);
  }, []);

  const onKey = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(active + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(active - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(FRAMES.length - 1);
      }
    },
    [active, goTo]
  );

  return (
    <section
      className="relative overflow-hidden bg-gradient-hero pt-14 pb-12 sm:pt-20 sm:pb-16 lg:pt-28 lg:pb-20 border-b border-slate-200/80"
      aria-labelledby="page-title"
      aria-roledescription="carousel"
      aria-label="Endeavor Search Partners introduction"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKey}
      tabIndex={-1}
    >
      <Container>
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left: sliding text */}
          <div className="lg:col-span-7 min-h-[360px] sm:min-h-[400px] lg:min-h-[440px] relative">
            <div
              ref={regionRef}
              className="relative"
              aria-live="polite"
              aria-atomic="true"
            >
              {FRAMES.map((f, i) => (
                <FrameText key={i} frame={f} active={i === active} isTitle={i === active} />
              ))}
            </div>

            {/* Persistent CTAs (not part of the sliding content) */}
            <div className="mt-10">
              <div className="flex flex-col sm:flex-row gap-3">
                <LinkButton href="/contact">
                  Request a confidential callback
                </LinkButton>
                <LinkButton href="/process" variant="secondary">
                  See how it works
                </LinkButton>
              </div>
              <p className="mt-6 text-sm text-slate-600">
                Prefer to talk first?{" "}
                <Link className="inline-link" href={`tel:${CONTACT_PHONE_TEL}`}>
                  Call {CONTACT_PHONE_DISPLAY}
                </Link>
              </p>
            </div>
          </div>

          {/* Right: sliding aside card */}
          <div className="lg:col-span-5">
            <div className="relative min-h-[260px] sm:min-h-[300px]">
              {FRAMES.map((f, i) => (
                <FrameAside key={i} frame={f} active={i === active} />
              ))}
            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center justify-between gap-4">
              <div
                className="flex items-center gap-2"
                role="tablist"
                aria-label="Choose slide"
              >
                {FRAMES.map((_, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Go to slide ${i + 1} of ${FRAMES.length}`}
                      onClick={() => goTo(i)}
                      className={`h-2.5 rounded-full transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 ${
                        isActive
                          ? "w-8 bg-brand-700"
                          : "w-2.5 bg-slate-300 hover:bg-slate-400"
                      }`}
                    />
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goTo(active - 1)}
                  aria-label="Previous slide"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-soft transition hover:border-slate-400 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                >
                  <svg
                    aria-hidden
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M15 6l-6 6 6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => goTo(active + 1)}
                  aria-label="Next slide"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-soft transition hover:border-slate-400 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                >
                  <svg
                    aria-hidden
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M9 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div
              className="mt-4 h-1 w-full overflow-hidden rounded-full bg-slate-200/80"
              aria-hidden
            >
              <div
                key={`${active}-${paused ? "p" : "r"}`}
                className={`h-full rounded-full bg-gradient-cta ${
                  paused ? "" : "hero-progress-bar"
                }`}
                style={{ width: paused ? "100%" : undefined }}
              />
            </div>
            <p className="sr-only">
              Slide {active + 1} of {FRAMES.length}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FrameText({
  frame,
  active,
  isTitle,
}: {
  frame: Frame;
  active: boolean;
  isTitle: boolean;
}) {
  return (
    <div
      className={`transition-[opacity,transform] duration-[900ms] ease-out ${
        active
          ? "opacity-100 translate-x-0 pointer-events-auto relative"
          : "opacity-0 translate-x-4 pointer-events-none absolute inset-0"
      }`}
      aria-hidden={!active}
    >
      <p className="ui-kicker">{frame.kicker}</p>
      {isTitle ? (
        <h1
          id="page-title"
          className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 leading-[1.15] tracking-tight"
        >
          {frame.title}
        </h1>
      ) : (
        <p className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 leading-[1.15] tracking-tight">
          {frame.title}
        </p>
      )}
      <p className="mt-5 text-lg sm:text-xl text-slate-700 leading-relaxed max-w-2xl">
        {frame.lead}
      </p>
    </div>
  );
}

function FrameAside({ frame, active }: { frame: Frame; active: boolean }) {
  return (
    <div
      className={`transition-[opacity,transform] duration-[900ms] ease-out ${
        active
          ? "opacity-100 translate-x-0 pointer-events-auto relative"
          : "opacity-0 -translate-x-4 pointer-events-none absolute inset-0"
      }`}
      aria-hidden={!active}
    >
      <div className="relative rounded-3xl border border-slate-200 bg-white/90 p-6 sm:p-8 shadow-card">
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
            {frame.asideLabel}
          </p>
          <span
            aria-hidden
            className="inline-flex h-10 min-w-10 items-center justify-center rounded-full bg-gradient-cta px-3 text-sm font-semibold text-white shadow-soft"
          >
            {frame.number}
          </span>
        </div>
        <p className="mt-5 font-serif text-xl font-semibold text-slate-900 leading-snug">
          {frame.asideTitle}
        </p>
        <p className="mt-3 text-slate-700 leading-relaxed">{frame.asideBody}</p>

        <div className="mt-6 rounded-2xl bg-brand-950 px-5 py-4 text-white">
          <p className="font-semibold">Confidential by default.</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-200">
            Every conversation is held in confidence—from the first call to the
            final decision.
          </p>
        </div>
      </div>
    </div>
  );
}
