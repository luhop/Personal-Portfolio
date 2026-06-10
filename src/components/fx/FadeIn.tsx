import { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** 'mount' animates immediately, 'scroll' animates when scrolled into view */
  trigger?: 'mount' | 'scroll';
}

export function FadeIn({ children, className, delay = 0, y = 40, trigger = 'scroll' }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.set(el, { opacity: 0, y });

    const animation = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay,
      ease: 'power3.out',
      ...(trigger === 'scroll'
        ? {
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          }
        : {}),
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [delay, y, trigger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
