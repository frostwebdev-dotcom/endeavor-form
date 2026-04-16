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
