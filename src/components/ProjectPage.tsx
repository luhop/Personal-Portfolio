import { useEffect } from 'react';
import { ArrowLeft, AlertCircle, Lightbulb, Wrench, User } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ProjectTimeline } from './ProjectTimeline';
import { ProjectMetrics } from './ProjectMetrics';
import { BeforeAfter } from './BeforeAfter';
import { useLanguage } from '../contexts/LanguageContext';
import { Project } from '../data/projectsData';
import { motion } from 'motion/react';

interface ProjectPageProps {
  project: Project;
  onBack: () => void;
}

export function ProjectPage({ project, onBack }: ProjectPageProps) {
  const { language, t } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project.id]);

  return (
    <main className="pt-20 pb-20 md:pb-0 min-h-screen">

      {/* ── Hero ── */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-8 p-0 h-auto hover:bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('project.backToHome')}
          </Button>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-medium">
              {project.title[language]}
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              {project.description[language]}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Problem → Solution ── */}
      <section className="px-6 pb-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-border/50"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Problem */}
            <div className="p-8 lg:p-10 space-y-4 bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-4 h-4 text-destructive" />
                </div>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  {t('project.problem')}
                </h2>
              </div>
              <p className="text-foreground leading-relaxed text-base lg:text-lg">
                {project.problem[language]}
              </p>
            </div>

            {/* Solution */}
            <div className="p-8 lg:p-10 space-y-4 bg-primary/5 border-t border-border/50 lg:border-t-0 lg:border-l">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-4 h-4 text-primary" />
                </div>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  {t('project.solution')}
                </h2>
              </div>
              <p className="text-foreground leading-relaxed text-base lg:text-lg">
                {project.solution[language]}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── My Role + Tools ── */}
      <section className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex flex-col sm:flex-row gap-6 sm:gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                <User className="w-3.5 h-3.5" />
                {t('project.myRole')}
              </div>
              <div className="flex flex-wrap gap-2">
                {project.myRole.map((role) => (
                  <Badge key={role} variant="secondary" className="rounded-full px-3 py-1 text-sm">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="hidden sm:block w-px bg-border/50 self-stretch" />

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                <Wrench className="w-3.5 h-3.5" />
                {t('project.tools')}
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <Badge key={tool} variant="outline" className="rounded-full px-3 py-1 text-sm">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
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
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <h2 className="text-2xl lg:text-3xl font-medium text-center mb-4">
            {t('project.projectTimeline')}
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            {t('project.journeyDescription')}
          </p>
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
