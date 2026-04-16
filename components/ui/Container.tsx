import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
  as?: keyof JSX.IntrinsicElements;
};

export default function Container({
  children,
  className = "",
  narrow = false,
  as = "div",
}: Props) {
  const Tag = as as keyof JSX.IntrinsicElements;
  const max = narrow ? "max-w-3xl" : "max-w-7xl";
  return (
    <Tag className={`mx-auto w-full ${max} px-5 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Tag>
  );
}
