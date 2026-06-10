import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

interface Metric {
  label: string;
  value: string;
  description: string;
}

interface ProjectMetricsProps {
  metrics: Metric[];
}

export function ProjectMetrics({ metrics }: ProjectMetricsProps) {
  const { t } = useLanguage();

  return (
    <section className="py-16 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-medium mb-4">
            {t('project.impact')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('project.impactDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="text-center space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut" 
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="space-y-2">
                <div className="text-4xl lg:text-5xl font-bold text-primary">
                  {metric.value}
                </div>
                <h3 className="font-medium text-foreground">
                  {metric.label}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fade effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}