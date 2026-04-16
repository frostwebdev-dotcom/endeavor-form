import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { LEADERSHIP, TEAM, TeamMember } from "@/lib/content/team";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team at Endeavor Search Partners—senior professionals who advocate for financial advisors through the most important decisions of their career.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | Endeavor Search Partners",
    description:
      "Senior-led advocates for financial advisors: learn more about the Endeavor Search Partners team.",
    url: "/about",
  },
};

function MemberCard({ m, featured }: { m: TeamMember; featured?: boolean }) {
  return (
    <li className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
      <div className="flex items-start gap-4">
        <span
          aria-hidden
          className={`flex h-14 w-14 items-center justify-center rounded-full font-serif font-semibold shrink-0 ${
            featured
              ? "bg-gradient-cta text-white text-base"
              : "bg-brand-50 text-brand-800 text-base border border-brand-100"
          }`}
        >
          {m.initials}
        </span>
        <div className="min-w-0">
          <p className="font-serif text-lg sm:text-xl font-semibold text-slate-900">
            {m.name}
          </p>
          <p className="text-slate-700">{m.role}</p>
        </div>
      </div>
      {m.bio && (
        <p className="mt-5 text-slate-700 leading-relaxed">{m.bio}</p>
      )}
    </li>
  );
}

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ]}
      />
      <PageHero
        eyebrow="About us"
        title="Your advocates through the most important decisions of your career."
        lead="Endeavor Search Partners is a senior-led team of industry professionals focused on one thing: guiding financial advisors to better outcomes—confidentially and thoughtfully."
      />
      <Section tone="paper" eyebrow="Leadership" title="A team built around judgment">
        <ul className="grid gap-6 lg:grid-cols-3">
          {LEADERSHIP.map((m) => (
            <MemberCard key={m.name} m={m} featured />
          ))}
        </ul>
      </Section>
      <Section eyebrow="Advisor outreach" title="The people you'll speak with">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m) => (
            <MemberCard key={m.name} m={m} />
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
