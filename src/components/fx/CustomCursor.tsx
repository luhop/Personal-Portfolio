import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

type CursorVariant = 'default' | 'link' | 'view';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.documentElement.classList.add('custom-cursor-active');

    const dot = dotRef.current;
    if (!dot) return;

    const xTo = gsap.quickTo(dot, 'x', { duration: 0.18, ease: 'power3.out' });
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.18, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      setVisible(true);
      xTo(e.clientX);
      yTo(e.clientY);

      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="view"]')) {
        setVariant('view');
      } else if (target.closest('a, button, [role="button"], [data-cursor="link"]')) {
        setVariant('link');
      } else {
        setVariant('default');
      }
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
      ref={dotRef}
      className="cursor-dot"
      data-variant={variant}
      style={{ opacity: visible ? 1 : 0 }}
    >
      <span className="cursor-label">View</span>
    </div>
  );
}
