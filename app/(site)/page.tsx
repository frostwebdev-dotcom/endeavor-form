import Link from "next/link";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
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

export default function HomePage() {
  return (
    <>
      <PageHero
        eyebrow="Endeavor Search Partners"
        title="Guiding successful financial advisors through the most important decisions of their career."
        lead="We take time to understand what matters to you, evaluate strong options, make thoughtful introductions, and help you navigate negotiations—so you can stay focused on your practice and the clients you serve."
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <LinkButton href="/contact">Request a confidential callback</LinkButton>
          <LinkButton href="/process" variant="secondary">
            See how it works
          </LinkButton>
        </div>
        <p className="mt-6 text-sm text-slate-600">
          Prefer to talk first?{" "}
          <a className="inline-link" href={`tel:${CONTACT_PHONE_TEL}`}>
            Call {CONTACT_PHONE_DISPLAY}
          </a>
        </p>
      </PageHero>

      {/* Pillars */}
      <Section
        id="pillars"
        eyebrow="Our approach"
        title="Understand · Evaluate · Connect · Consult"
        lead="A disciplined process built for financial advisors who expect discretion, judgment, and follow-through at every stage."
        tone="paper"
      >
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {PROCESS_PHASES.map((p) => (
            <li
              key={p.slug}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
            >
              <p className="font-serif text-xs font-semibold tracking-[0.2em] uppercase text-brand-700">
                Step {p.step}
              </p>
              <h3 className="mt-2 font-serif text-xl font-semibold text-slate-900">
                {p.title}
              </h3>
              <p className="mt-1 text-slate-800 font-medium">{p.lead}</p>
              <p className="mt-3 text-slate-700 leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ul>
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
          {WHY_POINTS.map((point) => (
            <li
              key={point.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
            >
              <h3 className="font-serif text-lg font-semibold text-slate-900">
                {point.title}
              </h3>
              <p className="mt-3 text-slate-700 leading-relaxed">{point.body}</p>
            </li>
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
          {SERVICES.map((s) => (
            <li
              key={s.slug}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
            >
              <h3 className="font-serif text-lg font-semibold text-slate-900">
                {s.title}
              </h3>
              <p className="mt-3 text-slate-700 leading-relaxed">{s.summary}</p>
            </li>
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
          {LEADERSHIP.map((m) => (
            <li
              key={m.name}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
            >
              <div className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-cta text-white font-serif font-semibold"
                >
                  {m.initials}
                </span>
                <div>
                  <p className="font-serif text-lg font-semibold text-slate-900">
                    {m.name}
                  </p>
                  <p className="text-slate-700">{m.role}</p>
                </div>
              </div>
            </li>
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
        tone="paper"
      >
        <dl className="grid gap-6 md:grid-cols-2">
          {FAQS.slice(0, 4).map((f) => (
            <div
              key={f.q}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
            >
              <dt className="font-serif text-lg font-semibold text-slate-900">
                {f.q}
              </dt>
              <dd className="mt-3 text-slate-700 leading-relaxed">{f.a}</dd>
            </div>
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
          <div className="text-center">
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
          </div>
        </Container>
      </section>
    </>
  );
}
