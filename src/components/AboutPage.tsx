import { User, Target, Lightbulb, Users } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { useLanguage } from '../contexts/LanguageContext';

export function AboutPage() {
  const { t } = useLanguage();
  
  const highlights = [
    {
      icon: <User className="h-6 w-6" />,
      titleKey: "about.highlight1.title",
      descriptionKey: "about.highlight1.description"
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      titleKey: "about.highlight2.title",
      descriptionKey: "about.highlight2.description"
    },
    {
      icon: <Target className="h-6 w-6" />,
      titleKey: "about.highlight3.title",
      descriptionKey: "about.highlight3.description"
    },
    {
      icon: <Users className="h-6 w-6" />,
      titleKey: "about.highlight4.title",
      descriptionKey: "about.highlight4.description"
    }
  ];

  return (
    <main className="pt-20 pb-20 md:pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">{t('about.header.title')}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('about.header.subtitle')}
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-16">
          {/* Bio Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">{t('about.approach.title')}</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                {t('about.approach.p1')}
              </p>
              
              <p>
                {t('about.approach.p2')}
              </p>
              
              <p>
                {t('about.approach.p3')}
              </p>
            </div>
          </section>

          {/* What Sets Me Apart */}
          <section>
            <h2 className="text-2xl font-semibold mb-8">{t('about.highlights.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <Card key={index} className="border border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-primary mt-1">
                        {highlight.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{t(highlight.titleKey)}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {t(highlight.descriptionKey)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Project Management Mindset */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">{t('about.pmMindset.title')}</h2>
            <div className="bg-muted/30 rounded-lg p-8">
              <blockquote className="text-lg italic text-center max-w-3xl mx-auto leading-relaxed">
                "{t('about.pmMindset.quote')}"
              </blockquote>
            </div>
          </section>

          {/* Design Philosophy */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">{t('about.philosophy.title')}</h2>
            <div className="bg-muted/30 rounded-lg p-8">
              <blockquote className="text-lg italic text-center max-w-3xl mx-auto leading-relaxed">
                "{t('about.philosophy.quote')}"
              </blockquote>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center pt-8">
            <h2 className="text-2xl font-semibold mb-4">{t('about.cta.title')}</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('about.cta.description')}
            </p>
            <a href="mailto:lukas@hoppenberg.de" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              {t('about.cta.button')}
            </a>
          </section>
        </div>
      </div>
    </main>
  );
}