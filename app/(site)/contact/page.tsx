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
      />
      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-6">
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
