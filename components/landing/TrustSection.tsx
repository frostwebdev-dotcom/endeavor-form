import SectionShell from "./SectionShell";

/** Placeholder quotes — replace with real client testimonials when available. */
const testimonials = [
  {
    quote:
      "Placeholder testimonial: replace with a brief quote from a placed candidate or hiring leader about discretion, communication, and fit.",
    attribution: "Name, Title",
    note: "Replace with real name and role",
  },
  {
    quote:
      "Second placeholder: a sentence or two on trust, follow-through, or how the process felt from the candidate’s perspective.",
    attribution: "Name, Title",
    note: "Replace with real name and role",
  },
];

/** Placeholder metrics — replace with verified figures when you have them. */
const stats = [
  { label: "Trusted guidance", value: "Senior-led", sub: "Every conversation" },
  { label: "Confidential process", value: "Discretion", sub: "Built into how we work" },
  { label: "Personalized support", value: "One-to-one", sub: "No mass outreach" },
];

export default function TrustSection() {
  return (
    <section
      className="relative border-t border-zinc-200/80 dark:border-white/[0.08] bg-white/50 dark:bg-[#0c0c12]/60 py-16 lg:py-24"
      aria-labelledby="trust-heading"
    >
      <SectionShell>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2
            id="trust-heading"
            className="font-serif text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-white tracking-tight"
          >
            Built on trust and follow-through
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
            We are proud to serve professionals who expect judgment, clarity,
            and respect. Below are placeholders you can swap for real stories
            and metrics as they become available.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-14 lg:mb-16">
          {stats.map((s) => (
            <div
              key={s.label}
              className="text-center rounded-2xl border border-zinc-200/90 dark:border-white/[0.08] bg-zinc-50/90 dark:bg-white/[0.03] px-6 py-8 shadow-soft"
            >
              <p className="font-serif text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-white">
                {s.value}
              </p>
              <p className="mt-2 text-sm font-semibold text-accent dark:text-warm-300 uppercase tracking-wide">
                {s.label}
              </p>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
                {s.sub}
              </p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="rounded-2xl border border-zinc-200/90 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] p-6 sm:p-8 shadow-soft"
            >
              <blockquote className="text-zinc-700 dark:text-zinc-300 text-base sm:text-lg leading-relaxed font-serif italic">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 pt-6 border-t border-zinc-200 dark:border-white/10">
                <p className="font-semibold text-zinc-900 dark:text-white">
                  {t.attribution}
                </p>
                <p className="text-xs text-amber-700/90 dark:text-amber-400/90 mt-1">
                  {t.note}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </SectionShell>
    </section>
  );
}
