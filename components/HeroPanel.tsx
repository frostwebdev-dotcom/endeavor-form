export default function HeroPanel() {
  const bullets = [
    "Confidential & professional",
    "Industry expertise",
    "Personalized guidance",
  ];

  return (
    <section
      className="relative rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 bg-white/80 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.08] backdrop-blur-sm min-h-0 transition-colors duration-200"
      aria-labelledby="hero-headline"
    >
      <div className="relative z-10 max-w-readable">
        <h1
          id="hero-headline"
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white leading-tight tracking-tight"
        >
          Navigate Your Career with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-crypto-cyan to-crypto-blue">
            Confidence.
          </span>
        </h1>
        <p className="mt-4 sm:mt-5 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
          We are your advocates, guiding you through the most important
          decisions of your career. Let us connect you with opportunities that
          align with your vision and values.
        </p>
        <ul
          className="mt-6 sm:mt-8 space-y-3"
          aria-label="Why work with us"
        >
          {bullets.map((label, i) => (
            <li key={i} className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
              <span
                className="flex-shrink-0 w-8 h-8 rounded-lg bg-crypto-cyan/10 border border-crypto-cyan/20 flex items-center justify-center"
                aria-hidden
              >
                <svg
                  className="w-4 h-4 text-crypto-cyan"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="text-sm sm:text-base font-medium">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
