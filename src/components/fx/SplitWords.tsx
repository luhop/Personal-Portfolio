import { useRef, useEffect, ElementType, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitWordsProps {
  children: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  /** 'mount' animates immediately, 'scroll' animates when scrolled into view */
  trigger?: 'mount' | 'scroll';
  /** Render some words in the accent (primary) colour: pass word indices */
  accentWords?: number[];
}

export function SplitWords({
  children,
  as: Tag = 'div',
  className,
  delay = 0,
  stagger = 0.06,
  duration = 0.9,
  trigger = 'mount',
  accentWords = [],
}: SplitWordsProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = el.querySelectorAll('.reveal-word > span');
    if (prefersReducedMotion || targets.length === 0) return;

    const animation = gsap.to(targets, {
      y: 0,
      duration,
      delay,
      stagger,
      ease: 'power4.out',
      ...(trigger === 'scroll'
        ? {
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          }
        : {}),
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [children, delay, stagger, duration, trigger]);

  const words = children.split(' ');

  return (
    <Tag ref={ref} className={className} aria-label={children}>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true">
          <span className={`reveal-word ${accentWords.includes(i) ? 'text-primary' : ''}`}>
            <span>{word}</span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
