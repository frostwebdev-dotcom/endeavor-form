import Link from "next/link";
import Container from "@/components/ui/Container";
import MobileNav from "./MobileNav";
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  PRIMARY_NAV,
  SITE_NAME,
} from "@/lib/site";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-nav">
      <Container>
        <div className="flex items-center justify-between gap-4 h-16 sm:h-20">
          <Link
            href="/"
            className="flex items-center gap-2 min-h-[44px] rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
            aria-label={`${SITE_NAME} — Home`}
          >
            <span
              aria-hidden
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-gradient-cta text-white font-serif text-sm font-semibold shadow-soft"
            >
              E
            </span>
            <span className="font-serif text-base sm:text-lg font-semibold text-slate-900 tracking-tight leading-tight">
              <span className="sm:hidden">Endeavor</span>
              <span className="hidden sm:inline">Endeavor Search Partners</span>
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-1"
          >
            {PRIMARY_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center h-10 px-3 rounded-md text-[0.975rem] font-medium text-slate-700 hover:text-brand-800 hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${CONTACT_PHONE_TEL}`}
              className="inline-flex items-center gap-2 h-11 px-3 rounded-md text-[0.975rem] text-slate-700 hover:text-brand-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              aria-label={`Call ${CONTACT_PHONE_DISPLAY}`}
            >
              <svg
                className="h-5 w-5 text-brand-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="font-medium">{CONTACT_PHONE_DISPLAY}</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-11 px-5 rounded-md text-[0.975rem] font-semibold text-white bg-gradient-cta shadow-soft hover:brightness-[1.05] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 transition"
            >
              Request a callback
            </Link>
          </div>

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
