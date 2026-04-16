import type { Metadata } from "next";
import MeetingRequestForm from "@/components/MeetingRequestForm";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
} from "@/lib/site";
import { OFFICES } from "@/lib/content/offices";

const NEXT_STEPS = [
  "We review every request personally.",
  "We follow up with a real person, not an automated sales sequence.",
  "If needed, we suggest alternate times that fit your schedule.",
];

const GOOD_FIT_SIGNALS = [
  "You want clearer perspective on your options.",
  "You care about confidentiality and timing.",
  "You need a process that respects your clients and your calendar.",
];

export const metadata: Metadata = {
  title: "Request a Confidential Callback",
  description:
    "Request a confidential callback with Endeavor Search Partners. Share your preferred contact details and a time—we respond personally, never with bulk mail.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Endeavor Search Partners",
    description:
      "Request a confidential callback. We read every submission personally.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <PageHero
        eyebrow="Contact"
        title="Request a confidential callback"
        lead="Share your preferred contact details and timing. We read every submission personally and respond with care—never with bulk mail or pressure."
        aside={
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 sm:p-8 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
              What happens next
            </p>
            <ol className="mt-5 space-y-4">
              {NEXT_STEPS.map((step, index) => (
                <li key={step} className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 font-serif font-semibold text-brand-800"
                  >
                    {index + 1}
                  </span>
                  <span className="pt-1 text-slate-700 leading-relaxed">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">
                Typical response time
              </p>
              <p className="mt-1 text-slate-700">
                Usually within one business day.
              </p>
            </div>
          </div>
        }
      />
      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28 self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="font-serif text-xl font-semibold text-slate-900">
                Prefer to reach us directly?
              </h2>
              <dl className="mt-4 space-y-4 text-slate-700">
                <div>
                  <dt className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                    Email
                  </dt>
                  <dd className="mt-1 text-lg">
                    <a className="inline-link" href={`mailto:${CONTACT_EMAIL}`}>
                      {CONTACT_EMAIL}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                    Phone
                  </dt>
                  <dd className="mt-1 text-lg">
                    <a
                      className="inline-link"
                      href={`tel:${CONTACT_PHONE_TEL}`}
                    >
                      {CONTACT_PHONE_DISPLAY}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="font-serif text-xl font-semibold text-slate-900">
                This is a good place to start if...
              </h2>
              <ul className="mt-4 space-y-3">
                {GOOD_FIT_SIGNALS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700">
                    <span
                      aria-hidden
                      className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"
                    >
                      <svg
                        className="h-3.5 w-3.5"
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
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="font-serif text-xl font-semibold text-slate-900">
                Our offices
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-2 text-slate-700">
                {OFFICES.map((o) => (
                  <li key={`${o.city}-${o.region}`}>
                    {o.city}, {o.region}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                We meet with advisors across the United States—typically by phone
                or video at a time that fits your schedule.
              </p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <MeetingRequestForm />
          </div>
        </div>
      </Section>
    </>
  );
}
