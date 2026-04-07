import SectionShell from "./SectionShell";

const cards = [
  {
    title: "Confidential & professional",
    body: "Your search and conversations stay private. We treat every introduction with discretion and care.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    ),
  },
  {
    title: "Personalized guidance",
    body: "No one-size-fits-all playbook. We take time to understand your priorities before suggesting next steps.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    ),
  },
  {
    title: "Industry expertise",
    body: "Deep familiarity with leadership and specialist roles helps us speak your language and spot real fit.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    ),
  },
  {
    title: "Long-term career alignment",
    body: "We focus on roles and cultures that match where you want to grow—not just the next title on paper.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    ),
  },
];

export default function WhyChooseSection() {
  return (
    <section
      className="relative border-t border-zinc-200/80 dark:border-white/[0.08] bg-zinc-50/80 dark:bg-[#08080c]/80 py-16 lg:py-24"
      aria-labelledby="why-heading"
    >
      <SectionShell>
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-14">
          <h2
            id="why-heading"
            className="font-serif text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-white tracking-tight"
          >
            Why professionals choose us
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
            Whether you are actively exploring or quietly considering a change,
            we offer a steady, senior-level experience from first call to
            placement.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((c) => (
            <article
              key={c.title}
              className="group rounded-2xl border border-zinc-200/90 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] p-6 sm:p-8 shadow-soft hover:shadow-card dark:hover:border-white/[0.12] transition-shadow duration-300"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-warm-100/80 dark:bg-crypto-cyan/10 text-accent dark:text-crypto-cyan border border-warm-200/60 dark:border-crypto-cyan/20">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  {c.icon}
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-zinc-900 dark:text-white">
                {c.title}
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                {c.body}
              </p>
            </article>
          ))}
        </div>
      </SectionShell>
    </section>
  );
}
