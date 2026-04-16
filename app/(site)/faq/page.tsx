import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import FaqJsonLd from "@/components/seo/FaqJsonLd";
import { FAQS } from "@/lib/content/faq";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about working with Endeavor Search Partners—compensation, process, firms we represent, and more.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | Endeavor Search Partners",
    description:
      "Clear answers to the questions financial advisors most often ask us.",
    url: "/faq",
  },
};

export default function FaqPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ]}
      />
      <FaqJsonLd />
      <PageHero
        eyebrow="FAQ"
        title="Common questions from advisors"
        lead="Clarity before the conversation. Here are answers to the questions we're asked most often."
      />
      <Section tone="paper">
        <ul className="space-y-4 sm:space-y-5">
          {FAQS.map((f) => (
            <li key={f.q}>
              <details className="group rounded-2xl border border-slate-200 bg-white shadow-soft open:shadow-card transition-shadow">
                <summary
                  className="cursor-pointer list-none flex items-start justify-between gap-4 font-serif text-lg sm:text-xl font-semibold text-slate-900 p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 rounded-2xl"
                >
                  <span>{f.q}</span>
                  <span
                    aria-hidden
                    className="mt-1 text-brand-700 transition-transform group-open:rotate-45 flex-shrink-0"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5v14M5 12h14"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 -mt-1">
                  <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
                    {f.a}
                  </p>
                </div>
              </details>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-col sm:flex-row gap-3">
          <LinkButton href="/contact">Ask your question</LinkButton>
          <LinkButton href="/services" variant="secondary">
            Explore services
          </LinkButton>
        </div>
      </Section>
    </>
  );
}
