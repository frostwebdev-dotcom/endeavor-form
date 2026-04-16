export const SITE_NAME = "Endeavor Search Partners";

export const SITE_TAGLINE =
  "Guiding successful financial advisors through the most important decisions of their career.";

export const SITE_DESCRIPTION =
  "Endeavor Search Partners advocates for financial advisors and their clients. We provide confidential, senior-led recruiting and consulting—understand, evaluate, connect, consult.";

const DEFAULT_SITE_URL = "https://infoendeavorconnect.com";

export const SITE_URL = (() => {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) return raw.replace(/\/$/, "");
  return DEFAULT_SITE_URL;
})();

export const CONTACT_EMAIL = "hello@infoendeavorconnect.com";
export const CONTACT_PHONE_DISPLAY = "(609) 200-0245";
export const CONTACT_PHONE_TEL = "+16092000245";

export type NavLink = { href: string; label: string };

export const PRIMARY_NAV: NavLink[] = [
  { href: "/services", label: "Services" },
  { href: "/process", label: "Our Process" },
  { href: "/about", label: "About Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];
