import { User, Target, Lightbulb, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { SplitWords } from './fx/SplitWords';
import { FadeIn } from './fx/FadeIn';

export function AboutPage() {
  const { t } = useLanguage();

  const highlights = [
    {
      icon: <User className="h-5 w-5" />,
      titleKey: "about.highlight1.title",
      descriptionKey: "about.highlight1.description"
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      titleKey: "about.highlight2.title",
      descriptionKey: "about.highlight2.description"
    },
    {
      icon: <Target className="h-5 w-5" />,
      titleKey: "about.highlight3.title",
      descriptionKey: "about.highlight3.description"
    },
    {
      icon: <Users className="h-5 w-5" />,
      titleKey: "about.highlight4.title",
      descriptionKey: "about.highlight4.description"
    }
  ];

  return (
    <main className="pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <SplitWords
            as="h1"
            className="font-display text-5xl sm:text-6xl lg:text-8xl tracking-tight mb-8"
            delay={0.2}
            stagger={0.1}
          >
            {t('about.header.title')}
          </SplitWords>
          <FadeIn trigger="mount" delay={0.5} y={24}>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl leading-relaxed font-display">
              {t('about.header.subtitle')}
            </p>
          </FadeIn>
        </div>

        {/* Main Content */}
        <div className="space-y-24">
          {/* Bio Section */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <FadeIn>
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                {t('about.approach.title')}
              </h2>
            </FadeIn>
            <div className="lg:col-span-2 space-y-6 text-muted-foreground text-lg leading-relaxed">
              <FadeIn delay={0.1}><p>{t('about.approach.p1')}</p></FadeIn>
              <FadeIn delay={0.15}><p>{t('about.approach.p2')}</p></FadeIn>
              <FadeIn delay={0.2}><p>{t('about.approach.p3')}</p></FadeIn>
            </div>
          </section>

          {/* What Sets Me Apart */}
          <section>
            <FadeIn>
              <h2 className="font-display text-3xl lg:text-5xl mb-12">{t('about.highlights.title')}</h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/60 rounded-2xl overflow-hidden border border-border/60">
              {highlights.map((highlight, index) => (
                <FadeIn key={index} delay={index * 0.08} className="bg-background">
                  <div className="p-8 lg:p-10 h-full group hover:bg-muted/30 transition-colors duration-500">
                    <div className="text-primary mb-5">
                      {highlight.icon}
                    </div>
                    <h3 className="font-display text-2xl mb-3">{t(highlight.titleKey)}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                      {t(highlight.descriptionKey)}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </section>

          {/* Philosophy quotes */}
          <section className="space-y-12">
            <FadeIn>
              <figure className="border-l-2 border-primary pl-8 lg:pl-12 py-2">
                <blockquote className="font-display text-2xl lg:text-4xl leading-snug">
                  "{t('about.pmMindset.quote')}"
                </blockquote>
                <figcaption className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {t('about.pmMindset.title')}
                </figcaption>
              </figure>
            </FadeIn>

            <FadeIn>
              <figure className="border-l-2 border-border pl-8 lg:pl-12 py-2">
                <blockquote className="font-display italic text-2xl lg:text-4xl leading-snug text-muted-foreground">
                  "{t('about.philosophy.quote')}"
                </blockquote>
                <figcaption className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {t('about.philosophy.title')}
                </figcaption>
              </figure>
            </FadeIn>
          </section>
        </div>
      </div>
    </main>
  );
}
