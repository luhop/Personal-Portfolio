import { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ResumePage } from './components/ResumePage';
import { AboutPage } from './components/AboutPage';
import { ProjectPage } from './components/ProjectPage';
import { projectsData } from './data/projectsData';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentProject, setCurrentProject] = useState<string | null>(null);

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
    
    // Set initial page from URL hash
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

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setCurrentProject(null);
    window.history.pushState(null, '', `#${page}`);
  };

  const handleProjectSelect = (projectId: string) => {
    setCurrentProject(projectId);
    setCurrentPage('project');
    window.history.pushState(null, '', `#project/${projectId}`);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setCurrentProject(null);
    window.history.pushState(null, '', '#home');
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
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-background">
          <Header currentPage={currentPage} onNavigate={handleNavigate} />
          {renderCurrentPage()}
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}