import SectionShell from "./SectionShell";

const steps = [
  {
    step: "01",
    title: "Share your goals",
    body: "Tell us how you prefer to connect—email, phone, or a scheduled time. A few details help us prepare for a productive first conversation.",
  },
  {
    step: "02",
    title: "Speak with our team",
    body: "We listen to your background, timing, and what “right fit” means for you. There is no pressure to move faster than you are ready.",
  },
  {
    step: "03",
    title: "Explore aligned opportunities",
    body: "When there is mutual interest, we introduce roles and organizations that reflect your criteria—and we stay engaged as things evolve.",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      className="relative py-16 lg:py-24"
      aria-labelledby="how-heading"
    >
      <SectionShell>
        <div className="max-w-2xl mb-12 lg:mb-14">
          <h2
            id="how-heading"
            className="font-serif text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-white tracking-tight"
          >
            How it works
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
            A straightforward path from first touch to meaningful next
            steps—always at a pace that respects your calendar and career.
          </p>
        </div>
        <ol className="grid gap-8 lg:grid-cols-3 lg:gap-10">
          {steps.map((s) => (
            <li key={s.step} className="flex gap-5 lg:block">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-zinc-200 dark:border-white/15 bg-white dark:bg-white/[0.04] font-serif text-sm font-semibold text-accent dark:text-crypto-cyan"
                aria-hidden
              >
                {s.step}
              </div>
              <div className="pt-0.5 lg:mt-6 lg:pt-0">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </SectionShell>
    </section>
  );
}
