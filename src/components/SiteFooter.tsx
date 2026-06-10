import { useLanguage } from '../contexts/LanguageContext';
import { Magnetic } from './fx/Magnetic';
import { ArrowUpRight } from 'lucide-react';

interface SiteFooterProps {
  onNavigate: (page: string) => void;
}

export function SiteFooter({ onNavigate }: SiteFooterProps) {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const marqueeText = `${t('about.cta.title')} — `;

  return (
    <footer data-site-footer className="relative border-t border-border/40 overflow-hidden pb-20 md:pb-0">
      {/* Marquee */}
      <div className="py-10 lg:py-16 overflow-hidden whitespace-nowrap select-none">
        <div className="animate-marquee inline-block">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-5xl lg:text-7xl xl:text-8xl text-foreground/90 mx-4"
            >
              {marqueeText}
              <span className="italic text-primary">{marqueeText}</span>
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-6xl mx-auto px-6 pb-16 flex flex-col items-center gap-8">
        <p className="text-muted-foreground text-center max-w-md text-base">
          {t('about.cta.description')}
        </p>
        <Magnetic>
          <a
            href="mailto:lukas@hoppenberg.de"
            className="group inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-8 py-4 text-base font-medium transition-transform duration-300"
          >
            lukas@hoppenberg.de
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Magnetic>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>© {year} Lukas Hoppenberg</span>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('home')} className="hover:text-foreground transition-colors">
              {t('nav.home')}
            </button>
            <button onClick={() => onNavigate('resume')} className="hover:text-foreground transition-colors">
              {t('nav.resume')}
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-foreground transition-colors">
              {t('nav.about')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
