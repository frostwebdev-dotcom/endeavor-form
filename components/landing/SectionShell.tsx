import type { ReactNode } from "react";

type SectionShellProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Narrower inner width for text-heavy sections */
  narrow?: boolean;
};

export default function SectionShell({
  children,
  className = "",
  id,
  narrow = false,
}: SectionShellProps) {
  return (
    <div
      id={id}
      className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {narrow ? (
        <div className="max-w-3xl mx-auto">{children}</div>
      ) : (
        children
      )}
    </div>
  );
}
