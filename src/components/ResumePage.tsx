import { useState } from 'react';
import { Mail, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { useLanguage } from '../contexts/LanguageContext';

interface ResumePageProps {
  onProjectSelect?: (projectId: string) => void;
}

export function ResumePage({ onProjectSelect }: ResumePageProps) {
  const { t } = useLanguage();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  // PDF Download Handler — print styles live in globals.css (@media print)
  const handleDownloadPDF = () => {
    if (isGeneratingPDF) return;
    setIsGeneratingPDF(true);
    // Defer so the button label updates before the (blocking) print dialog opens
    setTimeout(() => {
      try {
        window.print();
      } finally {
        setIsGeneratingPDF(false);
      }
    }, 50);
  };

  // Map resume tasks to relevant projects
  const taskProjects = {
    'product-development': [
      { id: 'jobware-customer-portal', titleKey: 'resume.project.customerPortal' }
    ],
    'mobile-design': [
      { id: 'mobile-job-search-app', titleKey: 'resume.project.mobileApp' }
    ],
    'team-coordination': [
      { id: 'analytics-dashboard', titleKey: 'resume.project.analyticsDashboard' }
    ],
    'design-systems': [
      { id: 'design-system-components', titleKey: 'resume.project.designSystem' }
    ],
    'user-research': [
      { id: 'jobware-customer-portal', titleKey: 'resume.project.customerPortalResearch' },
      { id: 'mobile-job-search-app', titleKey: 'resume.project.mobileAppTesting' }
    ]
  };

  const handleProjectClick = (projectId: string) => {
    if (onProjectSelect) {
      onProjectSelect(projectId);
    }
  };

  return (
    <main className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto" id="resume-content">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-5xl lg:text-7xl mb-4">{t('resume.name')}</h1>
          <p className="text-xl text-muted-foreground mb-6">{t('resume.jobTitle')}</p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {t('resume.location')}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {t('resume.age')}
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {t('resume.availability')}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Experience */}
            <section>
              <h2 className="font-display text-3xl mb-6">{t('resume.experienceTitle')}</h2>
              
              <div className="space-y-8">
                <div className="border-l-2 border-border pl-6 relative">
                  <div className="absolute -left-2 top-0 w-3 h-3 bg-primary rounded-full"></div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-lg font-medium">{t('resume.position.productOwner')}</h3>
                    <span className="text-sm text-muted-foreground">{t('resume.date.productOwner')}</span>
                  </div>
                  <p className="text-muted-foreground mb-3 font-bold">{t('resume.company')}</p>
                  <ul className="text-sm text-muted-foreground space-y-3">
                    {/* <li 
                      className="resume-item-container"
                      onMouseEnter={() => handleMouseEnter('product-development')}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div
                        className="resume-item-text cursor-pointer py-3 px-2 rounded-md transition-all duration-500 ease-out hover:bg-muted/20"
                        data-active={activeItem === 'product-development'}
                      >
                        • {t('resume.task.productDevelopment')}
                      </div>
                      <div 
                        className={`resume-item-projects transition-all duration-500 ease-out overflow-hidden ${
                          activeItem === 'product-development' 
                            ? 'max-h-32 opacity-100 mt-3' 
                            : 'max-h-0 opacity-0 mt-0'
                        }`}
                      >
                        <div className="ml-6 p-3 bg-muted/20 rounded-md border border-border/20">
                          <p className="text-xs text-muted-foreground mb-2">{t('resume.relatedProjects')}</p>
                          <div className="space-y-1">
                            {taskProjects['product-development'].map((project) => (
                              <button
                                key={project.id}
                                onClick={() => handleProjectClick(project.id)}
                                className="block text-xs text-primary hover:text-primary/80 underline transition-colors duration-200"
                              >
                                → {t(project.titleKey)}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li> */}
                    
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{t('resume.task.productDevelopment')}</span>
                    </li>
                    
                    {/* <li 
                      className="resume-item-container"
                      onMouseEnter={() => handleMouseEnter('mobile-design')}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div
                        className="resume-item-text cursor-pointer py-3 px-2 rounded-md transition-all duration-500 ease-out hover:bg-muted/20"
                        data-active={activeItem === 'mobile-design'}
                      >
                        • {t('resume.task.mobileDesign')}
                      </div>
                      <div 
                        className={`resume-item-projects transition-all duration-500 ease-out overflow-hidden ${
                          activeItem === 'mobile-design' 
                            ? 'max-h-32 opacity-100 mt-3' 
                            : 'max-h-0 opacity-0 mt-0'
                        }`}
                      >
                        <div className="ml-6 p-3 bg-muted/20 rounded-md border border-border/20">
                          <p className="text-xs text-muted-foreground mb-2">{t('resume.relatedProjects')}</p>
                          <div className="space-y-1">
                            {taskProjects['mobile-design'].map((project) => (
                              <button
                                key={project.id}
                                onClick={() => handleProjectClick(project.id)}
                                className="block text-xs text-primary hover:text-primary/80 underline transition-colors duration-200"
                              >
                                → {t(project.titleKey)}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li> */}
                    
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{t('resume.task.mobileDesign')}</span>
                    </li>
                    
                    {/* <li 
                      className="resume-item-container"
                      onMouseEnter={() => handleMouseEnter('team-coordination')}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div
                        className="resume-item-text cursor-pointer py-3 px-2 rounded-md transition-all duration-500 ease-out hover:bg-muted/20"
                        data-active={activeItem === 'team-coordination'}
                      >
                        • {t('resume.task.teamCoordination')}
                      </div>
                      <div 
                        className={`resume-item-projects transition-all duration-500 ease-out overflow-hidden ${
                          activeItem === 'team-coordination' 
                            ? 'max-h-32 opacity-100 mt-3' 
                            : 'max-h-0 opacity-0 mt-0'
                        }`}
                      >
                        <div className="ml-6 p-3 bg-muted/20 rounded-md border border-border/20">
                          <p className="text-xs text-muted-foreground mb-2">{t('resume.relatedProjects')}</p>
                          <div className="space-y-1">
                            {taskProjects['team-coordination'].map((project) => (
                              <button
                                key={project.id}
                                onClick={() => handleProjectClick(project.id)}
                                className="block text-xs text-primary hover:text-primary/80 underline transition-colors duration-200"
                              >
                                → {t(project.titleKey)}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li> */}
                    
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{t('resume.task.teamCoordination')}</span>
                    </li>
                    
                    {/* <li 
                      className="resume-item-container"
                      onMouseEnter={() => handleMouseEnter('user-research')}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div
                        className="resume-item-text cursor-pointer py-3 px-2 rounded-md transition-all duration-500 ease-out hover:bg-muted/20"
                        data-active={activeItem === 'user-research'}
                      >
                        • {t('resume.task.userResearch')}
                      </div>
                      <div 
                        className={`resume-item-projects transition-all duration-500 ease-out overflow-hidden ${
                          activeItem === 'user-research' 
                            ? 'max-h-32 opacity-100 mt-3' 
                            : 'max-h-0 opacity-0 mt-0'
                        }`}
                      >
                        <div className="ml-6 p-3 bg-muted/20 rounded-md border border-border/20">
                          <p className="text-xs text-muted-foreground mb-2">{t('resume.relatedProjects')}</p>
                          <div className="space-y-1">
                            {taskProjects['user-research'].map((project) => (
                              <button
                                key={project.id}
                                onClick={() => handleProjectClick(project.id)}
                                className="block text-xs text-primary hover:text-primary/80 underline transition-colors duration-200"
                              >
                                → {t(project.titleKey)}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li> */}
                    
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{t('resume.task.userResearch')}</span>
                    </li>
                  </ul>
                </div>

                <div className="border-l-2 border-border pl-6 relative">
                  <div className="absolute -left-2 top-0 w-3 h-3 bg-primary rounded-full"></div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-lg font-medium">{t('resume.position.productManager')}</h3>
                    <span className="text-sm text-muted-foreground">{t('resume.date.productManager')}</span>
                  </div>
                  <p className="text-muted-foreground mb-3 font-bold">{t('resume.company')}</p>
                  <ul className="text-sm text-muted-foreground space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{t('resume.task.pmProjectPlanning')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{t('resume.task.pmDeveloperComms')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{t('resume.task.pmRoadmap')}</span>
                    </li>
                  </ul>
                </div>

                <div className="border-l-2 border-border pl-6 relative">
                  <div className="absolute -left-2 top-0 w-3 h-3 bg-primary rounded-full"></div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-lg font-medium">{t('resume.position.productDesigner')}</h3>
                    <span className="text-sm text-muted-foreground">{t('resume.date.productDesigner')}</span>
                  </div>
                  <p className="text-muted-foreground mb-3 font-bold">{t('resume.company')}</p>
                  <ul className="text-sm text-muted-foreground space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{t('resume.task.designSystems')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{t('resume.task.pdRapidPrototyping')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{t('resume.task.pdProductOptimization')}</span>
                    </li>
                  </ul>
                </div>

                <div className="border-l-2 border-border pl-6 relative">
                  <div className="absolute -left-2 top-0 w-3 h-3 bg-primary rounded-full"></div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-lg font-medium">{t('resume.position.internProductManagement')}</h3>
                    <span className="text-sm text-muted-foreground">{t('resume.date.internAlber')}</span>
                  </div>
                  <p className="text-muted-foreground mb-3 font-bold">{t('resume.company.alber')}</p>
                  <ul className="text-sm text-muted-foreground space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{t('resume.task.internMarketAnalysis')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{t('resume.task.internProductConcepts')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="font-display text-3xl mb-6">{t('resume.educationTitle')}</h2>
              
              <div className="border-l-2 border-border pl-6 relative">
                <div className="absolute -left-2 top-0 w-3 h-3 bg-primary rounded-full"></div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-lg font-medium">{t('resume.education.bachelor')}</h3>
                  <span className="text-sm text-muted-foreground">{t('resume.education.bachelordDate')}</span>
                </div>
                <p className="text-muted-foreground">{t('resume.education.university')}</p>
              </div>

              <div className="border-l-2 border-border pl-6 relative mt-8">
                <div className="absolute -left-2 top-0 w-3 h-3 bg-primary rounded-full"></div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-lg font-medium">{t('resume.education.abitur')}</h3>
                  <span className="text-sm text-muted-foreground">{t('resume.education.abiturDate')}</span>
                </div>
                <p className="text-muted-foreground">{t('resume.education.school')}</p>
              </div>
            </section>

            {/* Projects */}
            <section className="hidden">
              <h2 className="font-display text-3xl mb-6">{t('resume.keyProjectsTitle')}</h2>
              
              <div className="space-y-6">
                <div className="border border-border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-medium">{t('resume.keyProject1.title')}</h3>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t('resume.keyProject1.description')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{t('resume.skill.figma')}</Badge>
                    <Badge variant="secondary">{t('resume.skill.userResearch')}</Badge>
                    <Badge variant="secondary">{t('resume.skill.prototyping')}</Badge>
                  </div>
                </div>

                <div className="border border-border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-medium">{t('resume.keyProject2.title')}</h3>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t('resume.keyProject2.description')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{t('resume.skill.designSystems')}</Badge>
                    <Badge variant="secondary">{t('resume.skill.mobileUI')}</Badge>
                    <Badge variant="secondary">Component Library</Badge>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Skills */}
            <section>
              <h2 className="font-display text-2xl mb-4">{t('resume.coreSkills')}</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2 text-muted-foreground">{t('resume.skills.designPrototyping')}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{t('resume.skill.uiuxDesign')}</Badge>
                    <Badge variant="outline">{t('resume.skill.prototyping')}</Badge>
                    <Badge variant="outline">{t('resume.skill.designSystems')}</Badge>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-2 text-muted-foreground">{t('resume.skills.productManagement')}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{t('resume.skill.productStrategy')}</Badge>
                    <Badge variant="outline">{t('resume.skill.userResearch')}</Badge>
                    <Badge variant="outline">{t('resume.skill.agileScrum')}</Badge>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-2 text-muted-foreground">{t('resume.skills.projectManagement')}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{t('resume.skill.projectPlanning')}</Badge>
                    <Badge variant="outline">{t('resume.skill.scrum')}</Badge>
                    <Badge variant="outline">{t('resume.skill.kanban')}</Badge>
                    <Badge variant="outline">{t('resume.skill.agile')}</Badge>
                    <Badge variant="outline">{t('resume.skill.marketAnalysis')}</Badge>
                    <Badge variant="outline">{t('resume.skill.roadmaps')}</Badge>
                    <Badge variant="outline">{t('resume.skill.sprintPlanning')}</Badge>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-2 text-muted-foreground">{t('resume.skills.toolsPlatforms')}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{t('resume.skill.figma')}</Badge>
                    <Badge variant="outline">{t('resume.skill.jira')}</Badge>
                    <Badge variant="outline">{t('resume.skill.notion')}</Badge>
                    <Badge variant="outline">{t('resume.skill.loop')}</Badge>
                    <Badge variant="outline">{t('resume.skill.firebase')}</Badge>
                    <Badge variant="outline">{t('resume.skill.firebaseStudio')}</Badge>
                    <Badge variant="outline">{t('resume.skill.googleAnalytics')}</Badge>
                    <Badge variant="outline">{t('resume.skill.excel')}</Badge>
                    <Badge variant="outline">{t('resume.skill.teams')}</Badge>
                    <Badge variant="outline">{t('resume.skill.outlook')}</Badge>
                    <Badge variant="outline">{t('resume.skill.copilot')}</Badge>
                    <Badge variant="outline">{t('resume.skill.chatgpt')}</Badge>
                  </div>
                </div>
                
                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2 text-muted-foreground">{t('resume.skills.specializations')}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{t('resume.skill.mobileUI')}</Badge>
                    <Badge variant="outline">{t('resume.skill.accessibility')}</Badge>
                    <Badge variant="outline">{t('resume.skill.responsiveDesign')}</Badge>
                    <Badge variant="outline">{t('resume.skill.userTesting')}</Badge>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2 text-muted-foreground">{t('resume.skills.softwareAndAI')}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{t('resume.skill.softwareDevelopment')}</Badge>
                    <Badge variant="outline">{t('resume.skill.aiArchitecture')}</Badge>
                    <Badge variant="outline">{t('resume.skill.itProjectManagement')}</Badge>
                    <Badge variant="outline">{t('resume.skill.react')}</Badge>
                    <Badge variant="outline">{t('resume.skill.claudeCode')}</Badge>
                    <Badge variant="outline">{t('resume.skill.promptEngineering')}</Badge>
                  </div>
                </div>
              </div>
            </section>

            {/* Languages */}
            <section>
              <h2 className="font-display text-2xl mb-4">{t('resume.languagesTitle')}</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>{t('resume.language.german')}</span>
                  <span className="text-sm text-muted-foreground">{t('resume.language.germanLevel')}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('resume.language.english')}</span>
                  <span className="text-sm text-muted-foreground">{t('resume.language.englishLevel')}</span>
                </div>
              </div>
            </section>

            {/* Download */}
            <section id="pdf-download-section">
              <button 
                className="w-full bg-primary text-primary-foreground rounded-lg py-3 px-4 font-medium hover:bg-primary/90 transition-colors"
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
              >
                {isGeneratingPDF ? t('resume.generatingPDF') : t('resume.downloadPDF')}
              </button>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}