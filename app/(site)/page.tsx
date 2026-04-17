import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import HeroCarousel from "@/components/site/HeroCarousel";
import { PROCESS_PHASES } from "@/lib/content/process";
import { SERVICES } from "@/lib/content/services";
import { LEADERSHIP } from "@/lib/content/team";
import { FAQS } from "@/lib/content/faq";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/site";

const WHY_POINTS = [
  {
    title: "Same side of the table",
    body:
      "We work for you, not a single firm. Our goal is the right outcome for your practice and your clients.",
  },
  {
    title: "Senior-led conversations",
    body:
      "You work directly with experienced partners from the first conversation through the final decision.",
  },
  {
    title: "Process that respects your time",
    body:
      "Focused introductions, prepared meetings, and no pressure to move faster than you're ready for.",
  },
  {
    title: "Confidentiality by default",
    body:
      "Every conversation is held in confidence. Your current firm does not know we are talking until you decide.",
  },
];

type TrustIconKey =
  | "confidential"
  | "seniorLed"
  | "personallyReviewed"
  | "noPressure";

const TRUST_PROMISES: { label: string; icon: TrustIconKey }[] = [
  { label: "Confidential by default", icon: "confidential" },
  { label: "Senior-led conversations", icon: "seniorLed" },
  { label: "Personally reviewed inquiries", icon: "personallyReviewed" },
  { label: "No pressure, no bulk outreach", icon: "noPressure" },
];

function TrustIcon({ name }: { name: TrustIconKey }) {
  const common = {
    className: "h-8 w-8",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "confidential":
      return (
        <svg {...common}>
          <path d="M12 3l8 3v5c0 4.5-3.2 8.5-8 10-4.8-1.5-8-5.5-8-10V6l8-3z" />
          <path d="M9.5 12.5l2 2 3-4" />
        </svg>
      );
    case "seniorLed":
      return (
        <svg {...common}>
          <path d="M4 6h10a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H9l-3 3v-3H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
          <path d="M20 10a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2v3l-3-3" />
        </svg>
      );
    case "personallyReviewed":
      return (
        <svg {...common}>
          <path d="M8 3h7l4 4v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
          <path d="M14 3v5h5" />
          <path d="M9 14l2 2 4-4" />
        </svg>
      );
    case "noPressure":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20c.6-2.8 3-4.5 6-4.5s5.4 1.7 6 4.5" />
          <path d="M15 6l6 6" />
          <path d="M21 6l-6 6" />
        </svg>
      );
    default:
      return null;
  }
}

function TrustItem({ item }: { item: (typeof TRUST_PROMISES)[number] }) {
  return (
    <li className="flex min-h-[80px] w-[280px] sm:w-[300px] items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-800 shadow-soft">
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 ring-1 ring-brand-100">
        <TrustIcon name={item.icon} />
      </span>
      <span className="font-medium leading-snug">{item.label}</span>
    </li>
  );
}

const FIRST_CALL_STEPS = [
  {
    title: "Share what matters most",
    body:
      "Tell us what you want more of and what you want to avoid. We listen first so the conversation starts with your priorities.",
  },
  {
    title: "Get a clear outside perspective",
    body:
      "We help you compare paths, firms, and business models in plain language so you can think clearly about what actually fits.",
  },
  {
    title: "Move only if the fit is right",
    body:
      "If there is a strong next step, we guide it. If there is not, you still leave with more clarity than you started with.",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroCarousel />

      <section
        className="bg-white border-b border-slate-200 py-6"
        aria-label="Trust signals"
      >
        <div className="relative overflow-hidden process-fade-edges">
          <div className="trust-marquee">
            <ul className="trust-track" role="list">
              {TRUST_PROMISES.map((item) => (
                <TrustItem key={`a-${item.label}`} item={item} />
              ))}
              {TRUST_PROMISES.map((item) => (
                <TrustItem key={`b-${item.label}`} item={item} />
              ))}
            </ul>
            <ul className="trust-track" aria-hidden="true">
              {TRUST_PROMISES.map((item) => (
                <TrustItem key={`c-${item.label}`} item={item} />
              ))}
              {TRUST_PROMISES.map((item) => (
                <TrustItem key={`d-${item.label}`} item={item} />
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Section
        id="first-conversation"
        eyebrow="A better first step"
        title="If you're exploring change, this is where to begin."
        lead="A thoughtful first conversation should lower pressure, not raise it. We make the path easier to understand before you commit time to any firm."
        tone="muted"
      >
        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7" direction="left">
            <ol className="space-y-4">
              {FIRST_CALL_STEPS.map((step, index) => (
                <Reveal
                  as="li"
                  key={step.title}
                  delayMs={index * 90}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
                >
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 font-serif font-semibold text-brand-800"
                    >
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-slate-900">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-slate-700 leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </Reveal>
          <Reveal className="lg:col-span-5" direction="right" delayMs={120}>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
                Typical concerns we hear
              </p>
              <ul className="mt-5 space-y-3 text-slate-700">
                <li className="rounded-xl bg-slate-50 px-4 py-3">
                  "I want a better fit, but I do not want disruption for clients."
                </li>
                <li className="rounded-xl bg-slate-50 px-4 py-3">
                  "I need honest help comparing options, not a pitch."
                </li>
                <li className="rounded-xl bg-slate-50 px-4 py-3">
                  "I do not have time for a process that goes nowhere."
                </li>
              </ul>
              <div className="mt-6">
                <LinkButton href="/contact" className="w-full sm:w-auto">
                  Schedule a conversation
                </LinkButton>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Pillars */}
      <Section
        id="pillars"
        eyebrow="Our approach"
        title="Understand · Evaluate · Connect · Consult"
        lead="A disciplined process built for financial advisors who expect discretion, judgment, and follow-through at every stage."
        tone="paper"
      >
        <Reveal className="relative overflow-hidden process-fade-edges">
          <div className="process-marquee">
            <ul className="process-track">
              {PROCESS_PHASES.map((p) => (
                <li
                  key={`first-${p.slug}`}
                  className="w-[min(82vw,20rem)] rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-serif text-xs font-semibold tracking-[0.2em] uppercase text-brand-700">
                      Step {p.step}
                    </p>
                    <span
                      aria-hidden
                      className="font-serif text-3xl text-brand-200"
                    >
                      {p.step}
                    </span>
                  </div>
                  <h3 className="mt-2 font-serif text-xl font-semibold text-slate-900">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-slate-800 font-medium">{p.lead}</p>
                  <p className="mt-3 text-slate-700 leading-relaxed">{p.body}</p>
                </li>
              ))}
            </ul>
            <ul className="process-track" aria-hidden="true">
              {PROCESS_PHASES.map((p) => (
                <li
                  key={`second-${p.slug}`}
                  className="w-[min(82vw,20rem)] rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-serif text-xs font-semibold tracking-[0.2em] uppercase text-brand-700">
                      Step {p.step}
                    </p>
                    <span
                      aria-hidden
                      className="font-serif text-3xl text-brand-200"
                    >
                      {p.step}
                    </span>
                  </div>
                  <h3 className="mt-2 font-serif text-xl font-semibold text-slate-900">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-slate-800 font-medium">{p.lead}</p>
                  <p className="mt-3 text-slate-700 leading-relaxed">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <div className="mt-10">
          <Link href="/process" className="inline-link text-base">
            Read more about our process →
          </Link>
        </div>
      </Section>

      {/* Why advisors work with us */}
      <Section
        id="why"
        eyebrow="Why advisors work with us"
        title="Thoughtful counsel, not a sales pitch."
        lead="Our job is to make your decision easier—whatever you ultimately decide."
      >
        <ul className="grid gap-6 sm:grid-cols-2">
          {WHY_POINTS.map((point, index) => (
            <Reveal
              as="li"
              key={point.title}
              delayMs={index * 85}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
            >
              <h3 className="font-serif text-lg font-semibold text-slate-900">
                {point.title}
              </h3>
              <p className="mt-3 text-slate-700 leading-relaxed">{point.body}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Services preview */}
      <Section
        id="services-preview"
        eyebrow="Services"
        title="Advisor-first recruiting and consulting"
        lead="Support tailored to your career stage and goals—from evaluating what's possible to negotiating what's next."
        tone="paper"
      >
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {SERVICES.map((s, index) => (
            <Reveal
              as="li"
              key={s.slug}
              delayMs={index * 75}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
            >
              <h3 className="font-serif text-lg font-semibold text-slate-900">
                {s.title}
              </h3>
              <p className="mt-3 text-slate-700 leading-relaxed">{s.summary}</p>
              <div className="mt-5">
                <Link href={`/services#${s.slug}`} className="inline-link text-sm">
                  Learn more
                </Link>
              </div>
            </Reveal>
          ))}
        </ul>
        <div className="mt-10">
          <Link href="/services" className="inline-link text-base">
            See all services →
          </Link>
        </div>
      </Section>

      {/* Team */}
      <Section
        id="team-preview"
        eyebrow="Your advocates"
        title="Senior leadership with deep industry experience"
        lead="Our partners have spent years helping advisors evaluate options, navigate transitions, and negotiate aligned outcomes."
      >
        <ul className="grid gap-6 sm:grid-cols-3">
          {LEADERSHIP.map((m, index) => (
            <Reveal
              as="li"
              key={m.name}
              delayMs={index * 90}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft"
            >
              {m.photo ? (
                <div className="relative aspect-[3/4] w-full bg-slate-100">
                  <Image
                    src={m.photo}
                    alt={`${m.name}, ${m.role}`}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-contain object-center"
                  />
                </div>
              ) : (
                <div className="flex aspect-[3/4] w-full items-center justify-center bg-slate-50">
                  <span
                    aria-hidden
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-cta text-white font-serif text-xl font-semibold"
                  >
                    {m.initials}
                  </span>
                </div>
              )}
              <div className="flex flex-col gap-1 p-6">
                <p className="font-serif text-lg font-semibold text-slate-900">
                  {m.name}
                </p>
                <p className="text-slate-700">{m.role}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        <div className="mt-10">
          <Link href="/about" className="inline-link text-base">
            Meet the whole team →
          </Link>
        </div>
      </Section>

      {/* FAQ preview */}
      <Section
        id="faq-preview"
        eyebrow="Common questions"
        title="Clarity before the conversation"
        lead="Clear answers help people feel comfortable taking the next step."
        tone="paper"
      >
        <dl className="grid gap-6 md:grid-cols-2">
          {FAQS.slice(0, 4).map((f, index) => (
            <Reveal
              key={f.q}
              delayMs={index * 90}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
            >
              <dt className="font-serif text-lg font-semibold text-slate-900">
                {f.q}
              </dt>
              <dd className="mt-3 text-slate-700 leading-relaxed">{f.a}</dd>
            </Reveal>
          ))}
        </dl>
        <div className="mt-10">
          <Link href="/faq" className="inline-link text-base">
            Read all questions →
          </Link>
        </div>
      </Section>

      {/* Final CTA */}
      <section
        className="bg-white border-t border-slate-200 py-16 sm:py-20"
        aria-labelledby="home-cta-heading"
      >
        <Container narrow>
          <Reveal className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
              Next step
            </p>
            <h2
              id="home-cta-heading"
              className="mt-3 font-serif text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight"
            >
              Request a confidential callback
            </h2>
            <p className="mt-4 text-lg text-slate-700 leading-relaxed">
              Share a few details and your preferred time. We read every
              submission personally and respond with care—never with bulk mail
              or pressure.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row sm:justify-center gap-3">
              <LinkButton href="/contact">Start the conversation</LinkButton>
              <LinkButton
                href={`tel:${CONTACT_PHONE_TEL}`}
                variant="secondary"
                external
              >
                Or call {CONTACT_PHONE_DISPLAY}
              </LinkButton>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
