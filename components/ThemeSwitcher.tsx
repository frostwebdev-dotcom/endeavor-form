"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import type { Theme } from "@/components/ThemeProvider";

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

const OPTIONS: { value: Theme; label: string }[] = [
  { value: "system", label: "System" },
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-center min-h-[44px] min-w-[44px] rounded-lg text-zinc-400 hover:text-crypto-cyan dark:text-zinc-400 dark:hover:text-crypto-cyan focus:outline-none focus:ring-2 focus:ring-crypto-cyan focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#0a0a0f] transition-colors"
        aria-label="Theme"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <MoonIcon />
      </button>
      {open && (
        <div
          className="absolute right-0 top-full mt-2 py-1.5 min-w-[128px] rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-800/95 shadow-xl z-50"
          role="menu"
          aria-label="Theme options"
        >
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="menuitemradio"
              aria-checked={theme === opt.value}
              onClick={() => {
                setTheme(opt.value);
                setOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors first:rounded-t-xl last:rounded-b-xl"
            >
              <span
                className={`w-3.5 h-3.5 rounded-full shrink-0 flex items-center justify-center ${
                  theme === opt.value
                    ? "bg-zinc-400 dark:bg-zinc-500 ring-2 ring-zinc-400/30 dark:ring-white/20"
                    : "bg-transparent border-2 border-zinc-300 dark:border-zinc-500"
                }`}
                aria-hidden
              />
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
