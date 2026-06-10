import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';

interface ProjectCardProps {
  title: string;
  context: string;
  goal: string;
  imageUrl: string | (() => JSX.Element);
  imageAlt: string;
  reversed?: boolean;
  onSeeMore?: () => void;
}

export function ProjectCard({
  title,
  context,
  goal,
  imageUrl,
  imageAlt,
  reversed = false,
  onSeeMore
}: ProjectCardProps) {
  const { t } = useLanguage();

  return (
    <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${reversed ? 'lg:grid-flow-dense' : ''}`}>
      <div className={`relative aspect-[16/10] bg-muted rounded-lg overflow-hidden ${reversed ? 'lg:col-start-2' : ''}`}>
        {typeof imageUrl === 'string' ? (
          <ImageWithFallback
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full">{imageUrl()}</div>
        )}
      </div>
      
      <div className={`space-y-6 ${reversed ? 'lg:col-start-1' : ''}`}>
        <h3 className="text-2xl lg:text-3xl font-medium">{title}</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">{t('project.context')}</h4>
            <p className="text-muted-foreground leading-relaxed">{context}</p>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">{t('project.goal')}</h4>
            <p className="text-muted-foreground leading-relaxed">{goal}</p>
          </div>
        </div>
        
        <Button variant="outline" className="mt-4" onClick={onSeeMore}>
          {t('project.seeMore')}
        </Button>
      </div>
    </div>
  );
}