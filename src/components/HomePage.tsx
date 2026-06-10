import { ProjectCard } from './ProjectCard';
import { projectsData } from '../data/projectsData';
import { useLanguage } from '../contexts/LanguageContext';
import Group17 from '../imports/Group17-11-1137';
import { motion } from 'motion/react';

interface HomePageProps {
  onProjectSelect: (projectId: string) => void;
}

export function HomePage({ onProjectSelect }: HomePageProps) {
  const { language, t } = useLanguage();
  
  // Reorder projects to show mobile-job-search-app first
  const reorderedProjects = [
    projectsData.find(p => p.id === 'mobile-job-search-app'),
    ...projectsData.filter(p => p.id !== 'mobile-job-search-app')
  ].filter(Boolean) as typeof projectsData;

  return (
    <main className="pt-0 pb-20 md:pb-0">
      {/* Hero Section - Full viewport height minus header */}
      <section className="min-h-screen flex items-center justify-center px-6 relative">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1, 
            delay: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6">
            {t('hero.title')}
            <br />
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
        </motion.div>
        
        {/* Hand-drawn "My work" design from Figma */}
        <motion.div 
          className="absolute bottom-16 right-8 w-[140px] h-[100px] [&_p]:!text-foreground [&_path]:!fill-foreground text-foreground"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 2,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <Group17 />
        </motion.div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-medium mb-4">{t('home.selectedWork')}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('home.selectedWorkDescription')}
            </p>
          </div>

          <div className="space-y-20 lg:space-y-32">
            {reorderedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{
                  opacity: 0,
                  y: 100,
                  z: -50
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  z: 0
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <ProjectCard
                  title={project.title[language]}
                  context={project.context[language]}
                  goal={project.goal[language]}
                  imageUrl={project.imageUrl}
                  imageAlt={project.imageAlt[language]}
                  reversed={index % 2 === 1}
                  onSeeMore={() => onProjectSelect(project.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}