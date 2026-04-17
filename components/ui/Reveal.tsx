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
  up: "translate-y-6",
  left: "-translate-x-8",
  right: "translate-x-8",
};

export default function Reveal({
  children,
  className = "",
  as = "div",
  direction = "up",
  delayMs = 0,
  durationMs = 700,
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
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`motion-reduce:transform-none motion-reduce:transition-none motion-reduce:opacity-100 transition-all ease-out will-change-transform ${
        visible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${directionClass[direction]}`
      } ${className}`}
      style={{
        transitionDuration: `${durationMs}ms`,
        transitionDelay: `${delayMs}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

