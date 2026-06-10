import { ArrowLeft, AlertCircle, Lightbulb, Wrench, User } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ProjectTimeline } from './ProjectTimeline';
import { ProjectMetrics } from './ProjectMetrics';
import { BeforeAfter } from './BeforeAfter';
import { useLanguage } from '../contexts/LanguageContext';
import { Project } from '../data/projectsData';
import { SplitWords } from './fx/SplitWords';
import { FadeIn } from './fx/FadeIn';

interface ProjectPageProps {
  project: Project;
  onBack: () => void;
}

export function ProjectPage({ project, onBack }: ProjectPageProps) {
  const { language, t } = useLanguage();

  return (
    <main className="pt-20 min-h-screen">

      {/* ── Hero ── */}
      <section className="px-6 py-12 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <FadeIn trigger="mount" y={10}>
            <Button
              variant="ghost"
              onClick={onBack}
              className="mb-10 p-0 h-auto hover:bg-transparent text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('project.backToHome')}
            </Button>
          </FadeIn>

          <SplitWords
            as="h1"
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.02] tracking-tight mb-8"
            delay={0.15}
            stagger={0.07}
          >
            {project.title[language]}
          </SplitWords>

          <FadeIn trigger="mount" delay={0.5} y={24}>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              {project.description[language]}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Problem → Solution ── */}
      <section className="px-6 pb-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn y={50}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-border/60">
              {/* Problem */}
              <div className="p-8 lg:p-12 space-y-5 bg-muted/40">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-4 h-4 text-destructive" />
                  </div>
                  <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {t('project.problem')}
                  </h2>
                </div>
                <p className="font-display text-xl lg:text-2xl leading-snug text-foreground">
                  {project.problem[language]}
                </p>
              </div>

              {/* Solution */}
              <div className="p-8 lg:p-12 space-y-5 bg-primary/5 border-t border-border/60 lg:border-t-0 lg:border-l">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-4 h-4 text-primary" />
                  </div>
                  <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {t('project.solution')}
                  </h2>
                </div>
                <p className="font-display text-xl lg:text-2xl leading-snug text-foreground">
                  {project.solution[language]}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── My Role + Tools ── */}
      <section className="px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <FadeIn y={30}>
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  <User className="w-3.5 h-3.5" />
                  {t('project.myRole')}
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.myRole.map((role) => (
                    <Badge key={role} variant="secondary" className="rounded-full px-3 py-1 text-sm font-normal">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="hidden sm:block w-px bg-border/60 self-stretch" />

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  <Wrench className="w-3.5 h-3.5" />
                  {t('project.tools')}
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <Badge key={tool} variant="outline" className="rounded-full px-3 py-1 text-sm font-normal">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Before / After (optional) ── */}
      {project.beforeImageUrl && project.afterImageUrl && (
        <BeforeAfter
          beforeImageUrl={project.beforeImageUrl}
          afterImageUrl={project.afterImageUrl}
        />
      )}

      {/* ── Metrics ── */}
      <ProjectMetrics
        metrics={project.metrics.map(m => ({
          label: m.label[language],
          value: m.value,
          description: m.description[language]
        }))}
      />

      {/* ── Timeline ── */}
      <section className="py-12 pb-24">
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <FadeIn>
            <h2 className="font-display text-3xl lg:text-5xl text-center mb-4">
              {t('project.projectTimeline')}
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              {t('project.journeyDescription')}
            </p>
          </FadeIn>
        </div>

        <ProjectTimeline
          steps={project.timeline.map(step => ({
            id: step.id,
            title: step.title[language],
            description: step.description[language],
            challenge: step.challenge[language],
            imageUrl: step.imageUrl,
            imageAlt: step.imageAlt[language],
            date: step.date[language]
          }))}
        />
      </section>
    </main>
  );
}
