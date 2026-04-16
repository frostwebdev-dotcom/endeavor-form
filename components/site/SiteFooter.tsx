import Link from "next/link";
import Container from "@/components/ui/Container";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/site";
import { OFFICES } from "@/lib/content/offices";

const QUICK_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/process", label: "Our Process" },
  { href: "/about", label: "About Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white border-t border-slate-200">
      <Container>
        <div className="pt-12">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-8 sm:px-8 sm:py-10 shadow-soft">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
                  Confidential conversation
                </p>
                <h2 className="mt-3 font-serif text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
                  When you are ready, we are here to help you think clearly.
                </h2>
                <p className="mt-3 text-slate-700 leading-relaxed">
                  Reach out by phone or email, or request a callback. We review
                  every inquiry personally.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center min-h-[48px] rounded-md bg-gradient-cta px-5 text-white font-semibold shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                >
                  Request a callback
                </Link>
                <a
                  href={`tel:${CONTACT_PHONE_TEL}`}
                  className="inline-flex items-center justify-center min-h-[48px] rounded-md border border-slate-300 bg-white px-5 text-slate-900 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
                >
                  Call {CONTACT_PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="py-14 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-serif text-xl font-semibold text-slate-900">
              {SITE_NAME}
            </p>
            <p className="mt-3 text-slate-700 leading-relaxed max-w-md">
              {SITE_TAGLINE}
            </p>
            <div className="mt-6 space-y-2 text-slate-700">
              <p>
                <a className="inline-link" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p>
                <a className="inline-link" href={`tel:${CONTACT_PHONE_TEL}`}>
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </p>
            </div>
          </div>

          <nav aria-label="Quick links" className="md:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Quick links
            </p>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Offices
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-slate-700">
              {OFFICES.map((o) => (
                <li key={`${o.city}-${o.region}`}>
                  {o.city}, {o.region}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-slate-600">
          <p>© {year} Endeavor S.P., Inc. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-link">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
