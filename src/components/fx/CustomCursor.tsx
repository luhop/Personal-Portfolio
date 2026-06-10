import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

type CursorVariant = 'default' | 'view';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.documentElement.classList.add('custom-cursor-active');

    const el = cursorRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.12, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.12, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      setVisible(true);
      xTo(e.clientX);
      yTo(e.clientY);

      const target = e.target as HTMLElement;
      setVariant(target.closest('[data-cursor="view"]') ? 'view' : 'default');
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      data-variant={variant}
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* Classic OS-style arrow pointer */}
      <svg
        className="custom-cursor__arrow"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 1.5 L2 16 L6 12 L8.8 18 L11 17 L8.3 11.3 L14 11.3 Z"
          fill="currentColor"
          stroke="var(--background)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
      <span className="custom-cursor__label">view</span>
    </div>
  );
}
