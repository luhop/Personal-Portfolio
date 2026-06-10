import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
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
  const [scrollDirection, setScrollDirection] = useState<'left' | 'right'>('right');
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);
  const currentStepRef = useRef(0);

  // Keep currentStepRef in sync with currentStep state
  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      
      // Ignore scroll events when wheel navigation is active
      if (isScrollingRef.current) return;

      const container = timelineRef.current;
      const scrollPosition = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      // Calculate which step should be active based on scroll position
      const stepWidth = container.scrollWidth / steps.length;
      const newCurrentStep = Math.round(scrollPosition / stepWidth);
      
      // Use ref to get current step value
      const current = currentStepRef.current;
      
      if (newCurrentStep !== current) {
        setCurrentStep(Math.min(newCurrentStep, steps.length - 1));
        
        // Determine scroll direction
        if (newCurrentStep > current) {
          setScrollDirection('right');
        } else {
          setScrollDirection('left');
        }
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
    const targetScroll = stepIndex * stepWidth;
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  // Wheel event handler for scroll-based navigation
  useEffect(() => {
    const contentElement = contentRef.current;
    if (!contentElement) return;

    const handleWheel = (e: WheelEvent) => {
      // Prevent page scroll when interacting with timeline
      e.preventDefault();

      // Ignore if already processing a scroll
      if (isScrollingRef.current) return;

      // Determine direction based on wheel delta
      const direction = e.deltaY > 0 ? 'next' : 'previous';
      
      // Use ref value to get the latest current step
      const current = currentStepRef.current;
      
      // Calculate new step
      let newStep = current;
      if (direction === 'next' && current < steps.length - 1) {
        newStep = current + 1;
        setScrollDirection('right');
      } else if (direction === 'previous' && current > 0) {
        newStep = current - 1;
        setScrollDirection('left');
      }

      // Only proceed if step changed
      if (newStep !== current) {
        isScrollingRef.current = true;
        setCurrentStep(newStep);
        scrollToStep(newStep);

        // Clear existing timeout
        if (wheelTimeoutRef.current) {
          clearTimeout(wheelTimeoutRef.current);
        }

        // Reset scrolling flag after debounce period
        // Using slightly longer timeout than transition to ensure smooth scroll completes
        wheelTimeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false;
        }, 1000);
      }
    };

    contentElement.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      contentElement.removeEventListener('wheel', handleWheel);
    };
  }, [steps.length]);

  // Cleanup timeout on unmount
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
        className="overflow-x-auto scrollbar-hide"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <div ref={contentRef} className="flex" style={{ width: `${steps.length * 100}vw` }}>
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="flex-shrink-0 px-6 py-8"
              style={{ width: '100vw' }}
              initial={{ 
                opacity: 0, 
                x: scrollDirection === 'right' ? 100 : -100,
                scale: 0.85,
                z: -100
              }}
              animate={{ 
                opacity: index === currentStep ? 1 : 0.3, 
                x: 0,
                scale: index === currentStep ? 1 : 0.95,
                z: index === currentStep ? 0 : -50
              }}
              transition={{ 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94],
                scale: {
                  duration: 0.6,
                  ease: "easeOut"
                },
                z: {
                  duration: 0.7,
                  ease: "backOut"
                }
              }}
            >
              <div className="max-w-6xl mx-auto">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}>
                  
                  {/* Content */}
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="space-y-2">
                      <p className="text-sm uppercase tracking-wider text-muted-foreground">
                        {step.date}
                      </p>
                      <h3 className="text-2xl lg:text-3xl font-medium">
                        {step.title}
                      </h3>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {step.description}
                    </p>

                    {/* Progress Indicator */}
                    <div className="pt-4">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">{t('project.challenge')}:</span> {step.challenge}
                      </p>
                    </div>
                  </div>

                  {/* Image */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <motion.div 
                      className="aspect-[4/3] rounded-lg overflow-hidden bg-muted"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ImageWithFallback
                        src={step.imageUrl}
                        alt={step.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timeline Navigation Lines */}
      <div className="flex justify-center space-x-2 mt-8 mb-4">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToStep(index)}
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
        <p className="text-sm text-muted-foreground">
          {t('projectTimeline.scrollInstructions')}
        </p>
      </div>
    </div>
  );
}