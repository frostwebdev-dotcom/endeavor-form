import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f7fc",
          100: "#dbebf6",
          200: "#bcd8ec",
          300: "#8ebedd",
          400: "#5c9cc9",
          500: "#3a7fb2",
          600: "#2a6597",
          700: "#23537d",
          800: "#1f4668",
          900: "#1c3b57",
          950: "#112539",
        },
        accent: {
          DEFAULT: "#7C4A3D",
          light: "#9C6B5A",
          dark: "#5C3529",
        },
        surface: {
          page: "#f7f5f0",
          paper: "#ffffff",
          muted: "#efeae0",
          soft: "#f2ede2",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        serif: [
          "var(--font-serif)",
          "Georgia",
          "Times New Roman",
          "serif",
        ],
      },
      maxWidth: {
        content: "1200px",
        readable: "68ch",
      },
      boxShadow: {
        soft: "0 4px 20px -6px rgba(15, 23, 42, 0.08), 0 2px 8px -2px rgba(15, 23, 42, 0.04)",
        card: "0 12px 32px -12px rgba(15, 23, 42, 0.14), 0 4px 16px -4px rgba(15, 23, 42, 0.06)",
        nav: "0 1px 0 rgba(15, 23, 42, 0.04), 0 8px 24px -16px rgba(15, 23, 42, 0.12)",
      },
      backgroundImage: {
        "gradient-cta":
          "linear-gradient(135deg, #23537d 0%, #2a6597 50%, #3a7fb2 100%)",
        "gradient-hero":
          "radial-gradient(ellipse 90% 60% at 50% -10%, rgba(35, 83, 125, 0.10), transparent 55%)",
        "gradient-accent":
          "linear-gradient(135deg, #23537d 0%, #7C4A3D 100%)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.55s ease-out forwards",
        "fade-in-up-slow": "fade-in-up 0.7s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
