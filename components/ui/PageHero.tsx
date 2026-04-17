import { ReactNode } from "react";
import Container from "./Container";

type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  align?: "left" | "center";
  aside?: ReactNode;
};

export default function PageHero({
  eyebrow,
  title,
  lead,
  children,
  align = "left",
  aside,
}: Props) {
  const alignClass = align === "center" ? "mx-auto text-center" : "";
  return (
    <section
      className="relative bg-gradient-hero pt-14 pb-10 sm:pt-20 sm:pb-14 lg:pt-28 lg:pb-20 border-b border-slate-200/80"
      aria-labelledby="page-title"
    >
      <Container>
        <div
          className={
            aside
              ? "grid items-start gap-8 lg:grid-cols-12 lg:gap-12"
              : undefined
          }
        >
          <div className={`${aside ? "lg:col-span-7" : "max-w-3xl"} ${alignClass}`}>
            {eyebrow && (
            <p className="ui-kicker">
                {eyebrow}
              </p>
            )}
            <h1
              id="page-title"
              className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 leading-[1.15] tracking-tight"
            >
              {title}
            </h1>
            {lead && (
              <p className="mt-5 text-lg sm:text-xl text-slate-700 leading-relaxed max-w-2xl">
                {lead}
              </p>
            )}
            {children && <div className="mt-8">{children}</div>}
          </div>
          {aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
      </Container>
    </section>
  );
}
