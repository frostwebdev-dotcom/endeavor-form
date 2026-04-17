import type { Metadata } from "next";
import Image from "next/image";
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
    <li className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
      {m.photo ? (
        <div className="relative aspect-[3/4] w-full bg-slate-100">
          <Image
            src={m.photo}
            alt={`${m.name}, ${m.role}`}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            className="object-contain object-center"
            priority={featured}
          />
        </div>
      ) : (
        <div className="flex aspect-[3/4] w-full items-center justify-center bg-slate-50">
          <span
            aria-hidden
            className={`flex h-20 w-20 items-center justify-center rounded-full font-serif text-2xl font-semibold ${
              featured
                ? "bg-gradient-cta text-white"
                : "border border-brand-100 bg-brand-50 text-brand-800"
            }`}
          >
            {m.initials}
          </span>
        </div>
      )}
      <div className="flex flex-col gap-2 p-6">
        <p className="font-serif text-lg sm:text-xl font-semibold text-slate-900">
          {m.name}
        </p>
        <p className="text-slate-700">{m.role}</p>
        {m.bio && (
          <p className="mt-3 text-slate-700 leading-relaxed">{m.bio}</p>
        )}
      </div>
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
