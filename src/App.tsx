import { useState, useEffect, useRef, useCallback } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { LanguageProvider } from './contexts/LanguageContext';
import { SmoothScrollProvider, useLenis } from './lib/smooth-scroll';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SiteFooter } from './components/SiteFooter';
import { CustomCursor } from './components/fx/CustomCursor';
import { HomePage } from './components/HomePage';
import { ResumePage } from './components/ResumePage';
import { AboutPage } from './components/AboutPage';
import { ProjectPage } from './components/ProjectPage';
import { projectsData } from './data/projectsData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentProject, setCurrentProject] = useState<string | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.slice(1) || 'home';
      if (hash.startsWith('project/')) {
        const projectId = hash.split('/')[1];
        setCurrentPage('project');
        setCurrentProject(projectId);
      } else {
        setCurrentPage(hash);
        setCurrentProject(null);
      }
    };

    window.addEventListener('popstate', handlePopState);

    const initialHash = window.location.hash.slice(1) || 'home';
    if (initialHash.startsWith('project/')) {
      const projectId = initialHash.split('/')[1];
      setCurrentPage('project');
      setCurrentProject(projectId);
    } else {
      setCurrentPage(initialHash);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Soft fade transition between pages
  const transitionTo = useCallback((update: () => void, hash: string) => {
    const el = pageRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const apply = () => {
      update();
      window.history.pushState(null, '', hash);
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    };

    if (!el || prefersReducedMotion) {
      apply();
      return;
    }

    gsap.to(el, {
      opacity: 0,
      y: 12,
      duration: 0.22,
      ease: 'power2.in',
      onComplete: () => {
        apply();
        ScrollTrigger.refresh();
        gsap.fromTo(
          el,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
        );
      },
    });
  }, [lenis]);

  const handleNavigate = (page: string) => {
    if (page === currentPage && !currentProject) return;
    transitionTo(() => {
      setCurrentPage(page);
      setCurrentProject(null);
    }, `#${page}`);
  };

  const handleProjectSelect = (projectId: string) => {
    transitionTo(() => {
      setCurrentProject(projectId);
      setCurrentPage('project');
    }, `#project/${projectId}`);
  };

  const handleBackToHome = () => {
    transitionTo(() => {
      setCurrentPage('home');
      setCurrentProject(null);
    }, '#home');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'resume':
        return <ResumePage onProjectSelect={handleProjectSelect} />;
      case 'about':
        return <AboutPage />;
      case 'project':
        if (currentProject) {
          const project = projectsData.find(p => p.id === currentProject);
          if (project) {
            return (
              <ProjectPage
                project={project}
                onBack={handleBackToHome}
              />
            );
          }
        }
        return <HomePage onProjectSelect={handleProjectSelect} />;
      default:
        return <HomePage onProjectSelect={handleProjectSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <div ref={pageRef}>
        {renderCurrentPage()}
        <SiteFooter onNavigate={handleNavigate} />
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SmoothScrollProvider>
          <AppContent />
        </SmoothScrollProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
