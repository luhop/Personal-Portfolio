import { useState, useRef, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface BeforeAfterProps {
  beforeImageUrl: string;
  afterImageUrl: string;
  beforeAlt?: string;
  afterAlt?: string;
}

export function BeforeAfter({ beforeImageUrl, afterImageUrl, beforeAlt = 'Before', afterAlt = 'After' }: BeforeAfterProps) {
  const { t } = useLanguage();
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    updatePosition(e.clientX);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    updatePosition(e.touches[0].clientX);
  }, [updatePosition]);

  const handleContainerMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    updatePosition(e.clientX);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', () => {
      isDragging.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
    }, { once: true });
  };

  const handleContainerTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    updatePosition(e.touches[0].clientX);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', () => {
      isDragging.current = false;
      window.removeEventListener('touchmove', handleTouchMove);
    }, { once: true });
  };

  return (
    <section className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl lg:text-3xl font-medium text-center mb-8">
          {t('project.beforeAfter')}
        </h2>
        <div
          ref={containerRef}
          className="relative aspect-[16/9] rounded-xl overflow-hidden cursor-col-resize select-none"
          onMouseDown={handleContainerMouseDown}
          onTouchStart={handleContainerTouchStart}
        >
          {/* After image (full width, underneath) */}
          <img
            src={afterImageUrl}
            alt={afterAlt}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />

          {/* Before image (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={beforeImageUrl}
              alt={beforeAlt}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ width: `${10000 / sliderPosition}%`, maxWidth: 'none' }}
              draggable={false}
            />
          </div>

          {/* Divider line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            {/* Handle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 5L3 10L7 15M13 5L17 10L13 15" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs font-medium px-3 py-1 rounded-full pointer-events-none">
            {t('project.beforeLabel')}
          </div>
          <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs font-medium px-3 py-1 rounded-full pointer-events-none">
            {t('project.afterLabel')}
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Drag to compare
        </p>
      </div>
    </section>
  );
}
