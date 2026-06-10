import { useRef, useLayoutEffect } from 'react';
import { projectsData } from '../data/projectsData';
import { useLanguage } from '../contexts/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ParticleField } from './fx/ParticleField';
import { SplitWords } from './fx/SplitWords';
import { FadeIn } from './fx/FadeIn';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HomePageProps {
  onProjectSelect: (projectId: string) => void;
}

export function HomePage({ onProjectSelect }: HomePageProps) {
  const { language, t } = useLanguage();
  const gallerySectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Reorder projects to show mobile-job-search-app first
  const reorderedProjects = [
    projectsData.find(p => p.id === 'mobile-job-search-app'),
    ...projectsData.filter(p => p.id !== 'mobile-job-search-app')
  ].filter(Boolean) as typeof projectsData;

  // Horizontal scroll gallery (desktop only)
  useLayoutEffect(() => {
    const section = gallerySectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <main className="pt-0">
      {/* ── Hero ── */}
      <section className="min-h-screen flex flex-col justify-center relative px-6 overflow-hidden">
        <ParticleField />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <FadeIn trigger="mount" delay={0.4} y={20}>
            <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground mb-6">
              Product Designer · Builder · Owner
            </p>
          </FadeIn>

          <h1 className="font-display leading-[0.95] tracking-tight mb-8">
            <SplitWords
              as="span"
              className="block text-[15vw] sm:text-[12vw] lg:text-[9vw]"
              delay={0.6}
              stagger={0.12}
            >
              Lukas Hoppenberg
            </SplitWords>
          </h1>

          <SplitWords
            as="p"
            className="text-2xl sm:text-3xl lg:text-5xl text-foreground/90 tracking-tight mb-8"
            delay={1.1}
            stagger={0.1}
            italicWords={[1]}
          >
            {t('hero.title')}
          </SplitWords>

          <FadeIn trigger="mount" delay={1.6} y={20}>
            <p className="text-base lg:text-lg text-muted-foreground max-w-xl leading-relaxed">
              {t('hero.description')}
            </p>
          </FadeIn>
        </div>

        {/* Scroll hint */}
        <FadeIn trigger="mount" delay={2.2} y={0} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>
        </FadeIn>
      </section>

      {/* ── Projects: horizontal gallery on desktop, stack on mobile ── */}
      <section ref={gallerySectionRef} className="relative lg:h-screen lg:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row lg:h-screen lg:items-center gap-16 lg:gap-0 py-20 lg:py-0"
        >
          {/* Intro panel */}
          <div className="flex-shrink-0 lg:w-[45vw] lg:h-full flex items-center px-6 lg:px-20">
            <div>
              <FadeIn>
                <p className="text-sm uppercase tracking-[0.25em] text-primary mb-4">
                  {t('home.selectedWork')}
                </p>
                <h2 className="font-display text-4xl lg:text-6xl leading-tight mb-6">
                  {t('home.selectedWorkDescription').split('.')[0]}.
                </h2>
                <p className="hidden lg:block text-muted-foreground text-sm uppercase tracking-[0.2em]">
                  ({reorderedProjects.length}) — Scroll →
                </p>
              </FadeIn>
            </div>
          </div>

          {/* Project cards */}
          {reorderedProjects.map((project, index) => (
            <div
              key={project.id}
              className="flex-shrink-0 px-6 lg:px-10 lg:w-[60vw] xl:w-[52vw]"
            >
              <FadeIn delay={index === 0 ? 0 : 0.1}>
                <button
                  onClick={() => onProjectSelect(project.id)}
                  data-cursor="view"
                  className="group block w-full text-left"
                >
                  <div className="relative aspect-[16/10] bg-muted rounded-2xl overflow-hidden mb-6">
                    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                      {typeof project.imageUrl === 'string' ? (
                        <ImageWithFallback
                          src={project.imageUrl}
                          alt={project.imageAlt[language]}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full">{project.imageUrl()}</div>
                      )}
                    </div>
                    <span className="absolute top-5 left-5 text-xs font-medium uppercase tracking-[0.2em] bg-background/80 backdrop-blur-sm rounded-full px-3 py-1.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl lg:text-4xl tracking-tight group-hover:text-primary transition-colors duration-300">
                      {project.title[language]}
                    </h3>
                    <span className="hidden sm:block text-sm text-muted-foreground whitespace-nowrap">
                      {t('project.seeMore')} →
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-2 line-clamp-2 max-w-xl text-sm lg:text-base">
                    {project.goal[language]}
                  </p>
                </button>
              </FadeIn>
            </div>
          ))}

          {/* End spacer on desktop */}
          <div className="hidden lg:block flex-shrink-0 w-[10vw]" />
        </div>
      </section>
    </main>
  );
}
