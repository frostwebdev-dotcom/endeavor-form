import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { SERVICES } from "@/lib/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Recruiting and consulting services for financial advisors—evaluation, career coaching, consultation, interview facilitation, and ongoing guidance.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | Endeavor Search Partners",
    description:
      "Advisor-first recruiting and consulting services across evaluation, coaching, consultation, interview facilitation, and ongoing guidance.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />
      <PageHero
        eyebrow="Services"
        title="Advisor-first recruiting and consulting"
        lead="Support tailored to your career stage and goals—from evaluating what's possible to negotiating what's next."
      />
      <Section tone="paper">
        <ul className="grid gap-6 lg:grid-cols-2">
          {SERVICES.map((s) => (
            <li
              key={s.slug}
              id={s.slug}
              className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft scroll-mt-28"
            >
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-slate-900">
                {s.title}
              </h2>
              <p className="mt-3 text-slate-700 leading-relaxed">{s.summary}</p>
              <ul className="mt-5 space-y-2.5">
                {s.points.map((pt) => (
                  <li
                    key={pt}
                    className="flex items-start gap-3 text-slate-700"
                  >
                    <svg
                      aria-hidden
                      className="mt-1 h-5 w-5 flex-shrink-0 text-brand-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-col sm:flex-row gap-3">
          <LinkButton href="/contact">Request a callback</LinkButton>
          <LinkButton href="/process" variant="secondary">
            See our process
          </LinkButton>
        </div>
      </Section>
    </>
  );
}
