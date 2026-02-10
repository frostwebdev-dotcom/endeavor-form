import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
        warm: {
          50: "#faf8f5",
          100: "#f5f0e8",
          200: "#e8dfd0",
          300: "#d4c4a8",
          400: "#bda67a",
          500: "#a88b5a",
        },
        accent: {
          DEFAULT: "#7C4A3D",
          light: "#9C6B5A",
          dark: "#5C3529",
          muted: "#B8958A",
        },
        surface: {
          DEFAULT: "#f5f3f0",
          warm: "#f8f6f2",
        },
        /* Crypto-style dark theme */
        dark: {
          bg: "#0a0a0f",
          card: "#12121a",
          border: "rgba(255,255,255,0.08)",
          muted: "#6b7280",
        },
        crypto: {
          cyan: "#00d4ff",
          blue: "#6366f1",
          purple: "#8b5cf6",
          glow: "rgba(0, 212, 255, 0.4)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      maxWidth: {
        content: "1200px",
        readable: "72ch",
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(0, 0, 0, 0.08), 0 2px 8px -2px rgba(0, 0, 0, 0.04)",
        card: "0 8px 32px -8px rgba(0, 0, 0, 0.1), 0 4px 16px -4px rgba(0, 0, 0, 0.06)",
        glow: "0 0 40px -8px rgba(0, 212, 255, 0.35)",
        "glow-lg": "0 0 60px -12px rgba(0, 212, 255, 0.4)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)",
        "grid-dark":
          "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
        "gradient-cta": "linear-gradient(135deg, #00d4ff 0%, #6366f1 100%)",
        "gradient-glow": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 212, 255, 0.15), transparent)",
      },
      backgroundSize: {
        grid: "24px 24px",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.55s ease-out forwards",
        "fade-in-up-slow": "fade-in-up 0.65s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
