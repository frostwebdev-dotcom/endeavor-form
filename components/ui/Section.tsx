import { ReactNode } from "react";
import Container from "./Container";

type Props = {
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  children: ReactNode;
  tone?: "page" | "paper" | "muted";
  className?: string;
  narrow?: boolean;
  titleAs?: "h2" | "h3";
};

const toneClass: Record<NonNullable<Props["tone"]>, string> = {
  page: "bg-surface-page",
  paper: "bg-surface-paper",
  muted: "bg-surface-muted",
};

export default function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  tone = "page",
  className = "",
  narrow = false,
  titleAs = "h2",
}: Props) {
  const ariaLabelledBy = title ? `${id || "section"}-title` : undefined;
  const Heading = titleAs;
  return (
    <section
      id={id}
      className={`${toneClass[tone]} py-14 sm:py-20 lg:py-24 border-t border-slate-200/70 ${className}`}
      aria-labelledby={ariaLabelledBy}
    >
      <Container narrow={narrow}>
        {(eyebrow || title || lead) && (
          <div className="max-w-3xl mb-10 sm:mb-14">
            {eyebrow && (
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">
                {eyebrow}
              </p>
            )}
            {title && (
              <Heading
                id={ariaLabelledBy}
                className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight leading-tight"
              >
                {title}
              </Heading>
            )}
            {lead && (
              <p className="mt-4 text-lg text-slate-700 leading-relaxed">
                {lead}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
