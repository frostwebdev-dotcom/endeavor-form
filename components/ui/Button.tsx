import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center rounded-md font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-gradient-cta shadow-soft hover:brightness-[1.05] active:scale-[0.99]",
  secondary:
    "text-slate-900 bg-white border border-slate-300 hover:bg-slate-50 active:scale-[0.99]",
  ghost:
    "text-brand-800 hover:bg-brand-50/60 active:scale-[0.99]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-base",
  lg: "h-12 px-6 text-base sm:text-[1.05rem]",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
    external?: boolean;
  };

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function LinkButton({
  href,
  external,
  variant = "primary",
  size = "lg",
  className = "",
  children,
  ...rest
}: LinkButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "lg",
  className = "",
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
