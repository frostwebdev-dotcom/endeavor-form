import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { PROCESS_PHASES } from "@/lib/content/process";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "A disciplined, advisor-first process: understand, evaluate, connect, consult. Learn how Endeavor Search Partners guides financial advisors through career decisions.",
  alternates: { canonical: "/process" },
  openGraph: {
    title: "Our Process | Endeavor Search Partners",
    description:
      "Understand, evaluate, connect, consult—our disciplined process for helping financial advisors make confident career decisions.",
    url: "/process",
  },
};

export default function ProcessPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Our Process", path: "/process" },
        ]}
      />
      <PageHero
        eyebrow="Our process"
        title="Understand. Evaluate. Connect. Consult."
        lead="A disciplined approach built for financial advisors who expect discretion, judgment, and follow-through at every stage."
      >
        <nav aria-label="Jump to phase" className="flex flex-wrap gap-2">
          {PROCESS_PHASES.map((p) => (
            <Link
              key={p.slug}
              href={`#${p.slug}`}
              className="inline-flex items-center h-10 px-4 rounded-full border border-slate-300 bg-white text-slate-800 text-sm font-medium hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
            >
              {p.step} · {p.title}
            </Link>
          ))}
        </nav>
      </PageHero>
      <Section tone="paper">
        <ol className="space-y-12 lg:space-y-16">
          {PROCESS_PHASES.map((p) => (
            <li
              key={p.slug}
              id={p.slug}
              className="grid gap-6 lg:grid-cols-12 scroll-mt-28"
            >
              <div className="lg:col-span-4">
                <p
                  aria-hidden
                  className="font-serif text-5xl sm:text-6xl font-semibold text-brand-700/90"
                >
                  {p.step}
                </p>
                <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-slate-900">
                  {p.title}
                </h2>
              </div>
              <div className="lg:col-span-8">
                <p className="font-serif text-xl text-slate-800">{p.lead}</p>
                <p className="mt-4 text-slate-700 leading-relaxed text-lg">
                  {p.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-14 flex flex-col sm:flex-row gap-3">
          <LinkButton href="/contact">Start the conversation</LinkButton>
          <LinkButton href="/services" variant="secondary">
            See our services
          </LinkButton>
        </div>
      </Section>
    </>
  );
}
