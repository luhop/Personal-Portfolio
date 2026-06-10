import { useState, useEffect, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';

interface TimelineStep {
  id: string;
  title: string;
  description: string;
  challenge: string;
  imageUrl: string;
  imageAlt: string;
  date: string;
}

interface ProjectTimelineProps {
  steps: TimelineStep[];
}

export function ProjectTimeline({ steps }: ProjectTimelineProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const wheelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isScrollingRef = useRef(false);
  const currentStepRef = useRef(0);

  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      if (isScrollingRef.current) return;

      const container = timelineRef.current;
      const scrollPosition = container.scrollLeft;
      const stepWidth = container.scrollWidth / steps.length;
      const newCurrentStep = Math.round(scrollPosition / stepWidth);
      const current = currentStepRef.current;

      if (newCurrentStep !== current) {
        setCurrentStep(Math.min(newCurrentStep, steps.length - 1));
      }
    };

    const container = timelineRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [steps.length]);

  const scrollToStep = (stepIndex: number) => {
    if (!timelineRef.current) return;

    const container = timelineRef.current;
    const stepWidth = container.scrollWidth / steps.length;

    container.scrollTo({
      left: stepIndex * stepWidth,
      behavior: 'smooth'
    });
  };

  // Wheel navigation between steps
  useEffect(() => {
    const contentElement = contentRef.current;
    if (!contentElement) return;

    const handleWheel = (e: WheelEvent) => {
      const current = currentStepRef.current;
      const direction = e.deltaY > 0 ? 'next' : 'previous';

      // Let the page scroll past the timeline at its edges
      if (
        (direction === 'next' && current >= steps.length - 1) ||
        (direction === 'previous' && current <= 0)
      ) {
        return;
      }

      e.preventDefault();
      if (isScrollingRef.current) return;

      const newStep = direction === 'next' ? current + 1 : current - 1;

      isScrollingRef.current = true;
      setCurrentStep(newStep);
      scrollToStep(newStep);

      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }
      wheelTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 900);
    };

    contentElement.addEventListener('wheel', handleWheel, { passive: false });
    return () => contentElement.removeEventListener('wheel', handleWheel);
  }, [steps.length]);

  useEffect(() => {
    return () => {
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full">
      {/* Horizontal Scrolling Timeline */}
      <div
        ref={timelineRef}
        data-lenis-prevent
        className="overflow-x-auto scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <div ref={contentRef} className="flex" style={{ width: `${steps.length * 100}vw` }}>
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex-shrink-0 px-6 py-8 transition-all duration-700 ease-out"
              style={{
                width: '100vw',
                opacity: index === currentStep ? 1 : 0.25,
                transform: index === currentStep ? 'scale(1)' : 'scale(0.96)',
              }}
            >
              <div className="max-w-6xl mx-auto">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}>

                  {/* Content */}
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-primary">
                        {step.date}
                      </p>
                      <h3 className="font-display text-3xl lg:text-4xl tracking-tight">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                      {step.description}
                    </p>

                    <div className="pt-4 border-t border-border/60">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">{t('project.challenge')}:</span> {step.challenge}
                      </p>
                    </div>
                  </div>

                  {/* Image */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                      <ImageWithFallback
                        src={step.imageUrl}
                        alt={step.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Navigation Lines */}
      <div className="flex justify-center space-x-2 mt-8 mb-4">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToStep(index)}
            aria-label={`Step ${index + 1}`}
            className={`h-1 transition-all duration-300 rounded-full ${
              index === currentStep
                ? 'w-12 bg-primary'
                : 'w-6 bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
          />
        ))}
      </div>

      {/* Scroll Instructions */}
      <div className="text-center mt-4">
        <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
          {t('projectTimeline.scrollInstructions')}
        </p>
      </div>
    </div>
  );
}
