import { useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FadeIn } from './fx/FadeIn';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Metric {
  label: string;
  value: string;
  description: string;
}

interface ProjectMetricsProps {
  metrics: Metric[];
}

/** Animates the numeric part of a value like "4.8/5", "300%", "5 min" counting up from 0 */
function CountUpValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^(\d+(?:[.,]\d+)?)(.*)$/);
    if (!match) return;

    const target = parseFloat(match[1].replace(',', '.'));
    const suffix = match[2];
    const decimals = match[1].includes('.') || match[1].includes(',') ? 1 : 0;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const counter = { val: 0 };
    const animation = gsap.to(counter, {
      val: target,
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
      onUpdate: () => {
        el.textContent = counter.val.toFixed(decimals) + suffix;
      },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [value]);

  return <span ref={ref}>{value}</span>;
}

export function ProjectMetrics({ metrics }: ProjectMetricsProps) {
  const { t } = useLanguage();

  return (
    <section className="py-16 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl lg:text-5xl mb-4">
              {t('project.impact')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('project.impactDescription')}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/60 rounded-2xl overflow-hidden border border-border/60">
          {metrics.map((metric, index) => (
            <FadeIn key={metric.label} delay={index * 0.08} className="bg-background">
              <div className="text-center space-y-3 p-8 h-full">
                <div className="font-display text-5xl lg:text-6xl text-primary">
                  <CountUpValue value={metric.value} />
                </div>
                <h3 className="font-medium text-foreground text-sm uppercase tracking-wider">
                  {metric.label}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {metric.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
