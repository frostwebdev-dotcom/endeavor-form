"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  PRIMARY_NAV,
} from "@/lib/site";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="lg:hidden inline-flex items-center justify-center h-11 w-11 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {open && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 lg:hidden"
        >
          <div
            className="absolute inset-0 bg-slate-900/40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute right-0 top-0 h-full w-full sm:w-80 bg-white shadow-card flex flex-col">
            <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200">
              <span className="font-serif text-lg font-semibold text-slate-900">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center h-11 w-11 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                aria-label="Close menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-2" aria-label="Mobile">
              <ul className="flex flex-col px-2">
                {PRIMARY_NAV.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center h-14 px-4 text-lg text-slate-800 hover:bg-slate-50 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-4 border-t border-slate-200 space-y-3">
              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                className="inline-flex w-full items-center justify-center h-12 px-4 rounded-md border border-slate-300 text-slate-800 font-medium bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
              >
                Call {CONTACT_PHONE_DISPLAY}
              </a>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center h-12 px-4 rounded-md text-white bg-gradient-cta font-semibold shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                Request a callback
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
