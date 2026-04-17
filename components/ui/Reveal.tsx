"use client";

import { ElementType, ReactNode, useEffect, useRef, useState } from "react";

type RevealDirection = "up" | "left" | "right";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  direction?: RevealDirection;
  delayMs?: number;
  durationMs?: number;
};

const directionClass: Record<RevealDirection, string> = {
  up: "translate-y-4",
  left: "-translate-x-5",
  right: "translate-x-5",
};

/**
 * Scroll-triggered reveal. Tuned for a refined, premium feel:
 *  - soft cubic-bezier easing (matches high-end editorial sites)
 *  - subtle travel distance so the motion feels calm, not busy
 *  - respects prefers-reduced-motion automatically
 */
export default function Reveal({
  children,
  className = "",
  as = "div",
  direction = "up",
  delayMs = 0,
  durationMs = 900,
}: RevealProps) {
  const Tag = as;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`motion-reduce:transform-none motion-reduce:transition-none motion-reduce:opacity-100 transition-[opacity,transform] will-change-transform ${
        visible
          ? "opacity-100 translate-x-0 translate-y-0"
          : `opacity-0 ${directionClass[direction]}`
      } ${className}`}
      style={{
        transitionDuration: `${durationMs}ms`,
        transitionDelay: `${delayMs}ms`,
        transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      }}
    >
      {children}
    </Tag>
  );
}
