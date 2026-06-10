import Thumbnail from '../imports/Thumbnail';
import imgJobwareMainDesign from "figma:asset/14bd1f241b4c8b23d02c01b8beaa1f5425b38385.png";

export interface Project {
  id: string;
  title: { en: string; de: string };
  context: { en: string; de: string };
  goal: { en: string; de: string };
  description: { en: string; de: string };
  problem: { en: string; de: string };
  solution: { en: string; de: string };
  myRole: string[];
  tools: string[];
  beforeImageUrl?: string;
  afterImageUrl?: string;
  imageUrl: string | (() => JSX.Element);
  imageAlt: { en: string; de: string };
  metrics: Array<{
    label: { en: string; de: string };
    value: string;
    description: { en: string; de: string };
  }>;
  timeline: Array<{
    id: string;
    title: { en: string; de: string };
    description: { en: string; de: string };
    challenge: { en: string; de: string };
    imageUrl: string;
    imageAlt: { en: string; de: string };
    date: { en: string; de: string };
  }>;
}

export const projectsData: Project[] = [
  {
    id: 'ai-design-system',
    title: {
      en: "AI-Native Design System",
      de: "KI-natives Design-System"
    },
    context: {
      en: "Currently building a scalable, code-first design system for my new employer — uniting design tokens, a React component library, and AI-assisted workflows that let the team move from idea to shipped UI faster.",
      de: "Ich baue aktuell ein skalierbares, code-first Design-System für meinen neuen Arbeitgeber — es vereint Design-Tokens, eine React-Komponentenbibliothek und KI-gestützte Workflows, mit denen das Team schneller von der Idee zur fertigen UI kommt."
    },
    goal: {
      en: "Establish one source of truth that bridges design and engineering, so every product ships consistent, accessible interfaces — accelerated by AI tooling baked directly into the workflow.",
      de: "Eine zentrale Quelle der Wahrheit schaffen, die Design und Engineering verbindet, damit jedes Produkt konsistente, barrierefreie Interfaces liefert — beschleunigt durch KI-Tooling direkt im Workflow."
    },
    description: {
      en: "An ongoing, code-first design system that pairs semantic tokens and a React component library with AI-assisted generation — closing the gap between Figma and production for an entire product organisation.",
      de: "Ein laufendes, code-first Design-System, das semantische Tokens und eine React-Komponentenbibliothek mit KI-gestützter Generierung verbindet — und so die Lücke zwischen Figma und Produktion für eine ganze Produktorganisation schließt."
    },
    problem: {
      en: "A growing product org with no shared design foundation: every team rebuilt buttons, forms and layouts their own way. Design and engineering spoke different languages, handoffs were slow, and accessibility was an afterthought.",
      de: "Eine wachsende Produktorganisation ohne gemeinsame Design-Grundlage: jedes Team baute Buttons, Formulare und Layouts auf eigene Weise. Design und Engineering sprachen verschiedene Sprachen, Handoffs waren langsam und Barrierefreiheit kam zu kurz."
    },
    solution: {
      en: "A token-driven system where Figma variables map 1:1 to coded components, with AI assistants that scaffold new components and translate designs into production-ready code — so consistency and speed come for free.",
      de: "Ein token-getriebenes System, in dem Figma-Variablen 1:1 auf gecodete Komponenten abgebildet werden, mit KI-Assistenten, die neue Komponenten erzeugen und Designs in produktionsreifen Code übersetzen — Konsistenz und Tempo gibt es so gratis dazu."
    },
    myRole: ["Design System Lead", "Architecture", "Component Engineering", "AI Tooling"],
    tools: ["Figma", "React", "Design Tokens", "Claude Code", "TypeScript"],
    imageUrl: "https://images.unsplash.com/photo-1737918543099-dfa8ec2e3909?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBzeXN0ZW0lMjBjb21wb25lbnRzfGVufDF8fHx8MTc1OTAxMDQ5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    imageAlt: {
      en: "Design system component library",
      de: "Design-System-Komponentenbibliothek"
    },
    metrics: [
      {
        label: { en: "Status", de: "Status" },
        value: "2026",
        description: {
          en: "In active development at my current role",
          de: "In aktiver Entwicklung in meiner aktuellen Rolle"
        }
      },
      {
        label: { en: "Token-Driven", de: "Token-getrieben" },
        value: "100%",
        description: {
          en: "Every component themed entirely through semantic design tokens",
          de: "Jede Komponente vollständig über semantische Design-Tokens gethemt"
        }
      },
      {
        label: { en: "Components Shipped", de: "Komponenten ausgeliefert" },
        value: "30+",
        description: {
          en: "Accessible, documented components in the live library",
          de: "Barrierefreie, dokumentierte Komponenten in der Live-Bibliothek"
        }
      },
      {
        label: { en: "AI-Assisted", de: "KI-gestützt" },
        value: "100%",
        description: {
          en: "New components scaffolded and reviewed with AI in the loop",
          de: "Neue Komponenten mit KI im Loop erstellt und reviewt"
        }
      }
    ],
    timeline: [
      {
        id: 'foundations',
        title: {
          en: 'Tokens & Foundations',
          de: 'Tokens & Grundlagen'
        },
        description: {
          en: 'Defined the semantic token layer — colour, type, spacing, elevation — as a single source shared between Figma variables and the codebase, with light/dark and accessibility built in from day one.',
          de: 'Definition der semantischen Token-Ebene — Farbe, Typografie, Spacing, Elevation — als zentrale Quelle, geteilt zwischen Figma-Variablen und Codebasis, mit Light/Dark und Barrierefreiheit von Tag eins an.'
        },
        challenge: {
          en: 'Designing a token structure flexible enough for many products yet strict enough to stay consistent',
          de: 'Eine Token-Struktur entwerfen, flexibel genug für viele Produkte und doch streng genug für Konsistenz'
        },
        imageUrl: 'https://images.unsplash.com/photo-1546437593-3d0258c28037?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlZnJhbWUlMjBza2V0Y2hpbmclMjBkZXNpZ258ZW58MXx8fHwxNzU5MDg5NTU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        imageAlt: { en: 'Design token foundations', de: 'Design-Token-Grundlagen' },
        date: { en: 'Phase 1', de: 'Phase 1' }
      },
      {
        id: 'component-library',
        title: {
          en: 'Component Library in Code',
          de: 'Komponentenbibliothek im Code'
        },
        description: {
          en: 'Built the React component library on top of the tokens — accessible primitives with documented states and variants, mirrored 1:1 by their Figma counterparts so design and code never drift apart.',
          de: 'Aufbau der React-Komponentenbibliothek auf Basis der Tokens — barrierefreie Primitives mit dokumentierten States und Varianten, 1:1 gespiegelt von ihren Figma-Pendants, damit Design und Code nie auseinanderlaufen.'
        },
        challenge: {
          en: 'Keeping design and coded components in perfect sync as both evolve',
          de: 'Design- und Code-Komponenten perfekt synchron halten, während sich beide weiterentwickeln'
        },
        imageUrl: 'https://images.unsplash.com/photo-1758611974287-8ca7147860a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXNpZ24lMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU5OTE5Nzc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        imageAlt: { en: 'Component library development', de: 'Komponenten-Bibliotheks-Entwicklung' },
        date: { en: 'Phase 2', de: 'Phase 2' }
      },
      {
        id: 'ai-workflows',
        title: {
          en: 'AI-Assisted Workflows',
          de: 'KI-gestützte Workflows'
        },
        description: {
          en: 'Integrated AI tooling into the system: generating new components from specs, translating Figma designs into token-based code, and reviewing pull requests against the system\'s rules — multiplying the team\'s output.',
          de: 'Integration von KI-Tooling ins System: Generierung neuer Komponenten aus Specs, Übersetzung von Figma-Designs in token-basierten Code und Review von Pull Requests gegen die System-Regeln — das vervielfacht den Output des Teams.'
        },
        challenge: {
          en: 'Embedding AI so it accelerates the team without compromising quality or consistency',
          de: 'KI so einbetten, dass sie das Team beschleunigt, ohne Qualität oder Konsistenz zu opfern'
        },
        imageUrl: 'https://images.unsplash.com/photo-1748609160056-7b95f30041f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBjaGFydHN8ZW58MXx8fHwxNzU4OTk2MDg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        imageAlt: { en: 'AI-assisted workflow', de: 'KI-gestützter Workflow' },
        date: { en: 'Phase 3', de: 'Phase 3' }
      }
    ]
  },
  {
    id: 'bewerbung2go-mobile-app',
    title: {
      en: "Mobile App for bewerbung2go",
      de: "Mobile App für bewerbung2go"
    },
    context: {
      en: "I created the concept, designed the application, and managed the early phases of this mobile app project for quick and simple job applications.",
      de: "Ich habe das Konzept erstellt, die Anwendung designed und die frühen Phasen dieses Mobile-App-Projekts für schnelle und einfache Bewerbungen geleitet."
    },
    goal: {
      en: "Create a simple and quick way to create a complete job application in minutes on your phone.",
      de: "Einen einfachen und schnellen Weg schaffen, um in wenigen Minuten eine vollständige Bewerbung auf dem Handy zu erstellen."
    },
    description: {
      en: "A mobile app that simplifies the job application process, allowing users to create and submit applications in minutes.",
      de: "Eine Mobile App, die den Bewerbungsprozess vereinfacht und es Nutzern ermöglicht, Bewerbungen in Minuten zu erstellen und abzusenden."
    },
    problem: {
      en: "Job seekers were abandoning applications on mobile because the process required switching between multiple tools, uploading documents manually, and filling out lengthy forms — all on a small screen.",
      de: "Jobsuchende brachen Bewerbungen auf dem Handy ab, weil der Prozess das Wechseln zwischen mehreren Tools, manuelles Hochladen von Dokumenten und das Ausfüllen langer Formulare auf einem kleinen Bildschirm erforderte."
    },
    solution: {
      en: "A streamlined mobile-first app that guides users through the entire application in under 5 minutes — with smart pre-fill, document management, and a one-tap submit flow designed from scratch.",
      de: "Eine mobile-first App, die Nutzer in unter 5 Minuten durch die gesamte Bewerbung führt — mit intelligentem Pre-Fill, Dokumentenverwaltung und einem One-Tap-Submit-Flow, der von Grund auf neu gestaltet wurde."
    },
    myRole: ["Concept & Strategy", "UX/UI Design", "Project Management", "User Research"],
    tools: ["Figma", "User Interviews", "Firebase Studio", "Scrum"],
    imageUrl: Thumbnail,
    imageAlt: {
      en: "Mobile app design mockup",
      de: "Mobile App-Design-Mockup"
    },
    metrics: [
      {
        label: {
          en: "Time to Complete Application",
          de: "Zeit bis zur Bewerbungsfertigstellung"
        },
        value: "5 min",
        description: {
          en: "Average time users need to create a complete job application",
          de: "Durchschnittliche Zeit, die Nutzer für eine vollständige Bewerbung benötigen"
        }
      },
      {
        label: {
          en: "User Satisfaction",
          de: "Nutzerzufriedenheit"
        },
        value: "4.5/5",
        description: {
          en: "User satisfaction rating for the simplified application process",
          de: "Nutzerzufriedenheitsbewertung für den vereinfachten Bewerbungsprozess"
        }
      },
      {
        label: {
          en: "Application Completion Rate",
          de: "Bewerbungsabschlussrate"
        },
        value: "78%",
        description: {
          en: "Percentage of users who complete applications after starting",
          de: "Prozentsatz der Nutzer, die Bewerbungen nach dem Start abschließen"
        }
      }
    ],
    timeline: [
      {
        id: 'concept',
        title: {
          en: 'Concept Development',
          de: 'Konzeptentwicklung'
        },
        description: {
          en: 'Developed the initial concept for a streamlined mobile application process. Focused on reducing friction and making job applications accessible on-the-go.',
          de: 'Entwicklung des initialen Konzepts für einen optimierten mobilen Bewerbungsprozess. Fokus auf Reduzierung von Reibung und Zugänglichkeit von Bewerbungen unterwegs.'
        },
        challenge: {
          en: 'Creating a simple process that still collects all necessary application information',
          de: 'Schaffung eines einfachen Prozesses, der trotzdem alle notwendigen Bewerbungsinformationen erfasst'
        },
        imageUrl: 'https://images.unsplash.com/photo-1546437593-3d0258c28037?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlZnJhbWUlMjBza2V0Y2hpbmclMjBkZXNpZ258ZW58MXx8fHwxNzU5MDg5NTU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        imageAlt: {
          en: 'Concept sketches',
          de: 'Konzept-Skizzen'
        },
        date: {
          en: 'Week 1-2',
          de: 'Woche 1-2'
        }
      },
      {
        id: 'design',
        title: {
          en: 'UI/UX Design',
          de: 'UI/UX-Design'
        },
        description: {
          en: 'Designed intuitive mobile interfaces optimized for quick data entry. Created smart form flows with auto-fill capabilities and document upload features.',
          de: 'Gestaltung intuitiver mobiler Oberflächen optimiert für schnelle Dateneingabe. Erstellung intelligenter Formular-Flows mit Auto-Fill-Funktionen und Dokumenten-Upload-Features.'
        },
        challenge: {
          en: 'Balancing simplicity with comprehensive application requirements',
          de: 'Ausbalancierung von Einfachheit mit umfassenden Bewerbungsanforderungen'
        },
        imageUrl: 'https://images.unsplash.com/photo-1678667720699-5c0fc04ac166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBtb2NrdXB8ZW58MXx8fHwxNzU5MDA0MzU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        imageAlt: {
          en: 'Mobile app UI design',
          de: 'Mobile App-UI-Design'
        },
        date: {
          en: 'Week 3-5',
          de: 'Woche 3-5'
        }
      },
      {
        id: 'early-management',
        title: {
          en: 'Early Phase Project Management',
          de: 'Frühphasen-Projektmanagement'
        },
        description: {
          en: 'Managed initial development phases, coordinating with stakeholders and development team. Established project timeline and feature priorities.',
          de: 'Leitung der initialen Entwicklungsphasen, Koordination mit Stakeholdern und Entwicklungsteam. Etablierung von Projekt-Timeline und Feature-Prioritäten.'
        },
        challenge: {
          en: 'Aligning stakeholder expectations with technical feasibility and timeline',
          de: 'Abstimmung von Stakeholder-Erwartungen mit technischer Machbarkeit und Timeline'
        },
        imageUrl: 'https://images.unsplash.com/photo-1603975711481-18b7aaca4caa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm90b3R5cGluZyUyMGRlc2lnbiUyMHByb2Nlc3N8ZW58MXx8fHwxNzU5MDg5NTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        imageAlt: {
          en: 'Project management planning',
          de: 'Projektmanagement-Planung'
        },
        date: {
          en: 'Week 6-8',
          de: 'Woche 6-8'
        }
      }
    ]
  },
  {
    id: 'mobile-job-search-app',
    title: {
      en: "Rebuild of the Mobile Apps",
      de: "Neuentwicklung der mobilen Apps"
    },
    context: {
      en: "Complete rebuild of the native iOS and Android apps for job seekers, focusing on modernizing the tech stack, improving performance, and creating a more intuitive user experience aligned with current mobile design standards.",
      de: "Vollständige Neuentwicklung der nativen iOS- und Android-Apps für Jobsuchende mit Fokus auf Modernisierung des Tech-Stacks, Verbesserung der Performance und Schaffung einer intuitiveren Nutzererfahrung im Einklang mit aktuellen mobilen Design-Standards."
    },
    goal: {
      en: "Transform the mobile job search experience through a ground-up rebuild that addresses technical debt while delivering a best-in-class user interface optimized for modern mobile devices.",
      de: "Transformation des mobilen Jobsuche-Erlebnisses durch eine grundlegende Neuentwicklung, die technische Schulden adressiert und gleichzeitig eine erstklassige Benutzeroberfläche liefert, die für moderne mobile Geräte optimiert ist."
    },
    description: {
      en: "A ground-up mobile app rebuild that revolutionized how job seekers discover and apply for opportunities, achieving 4.8 app store rating and 300% increase in mobile applications.",
      de: "Eine grundlegende mobile App-Neuentwicklung, die revolutionierte, wie Jobsuchende Gelegenheiten entdecken und sich bewerben, mit 4,8 App-Store-Bewertung und 300% Anstieg mobiler Bewerbungen."
    },
    problem: {
      en: "The existing iOS and Android apps were built on legacy architecture — slow, buggy, and visually outdated. User reviews averaged 2.9 stars, and mobile application rates were declining quarter over quarter despite growing mobile traffic.",
      de: "Die bestehenden iOS- und Android-Apps basierten auf veralteter Architektur — langsam, fehlerhaft und visuell überholt. Nutzerbewertungen lagen bei durchschnittlich 2,9 Sternen, und mobile Bewerbungsraten sanken trotz wachsendem mobilen Traffic."
    },
    solution: {
      en: "A complete rebuild from the ground up: native platform patterns for iOS and Android, swipe-based job discovery, AI-powered recommendations, and a redesigned application flow — resulting in a 4.8-star rating and 300% more mobile applications.",
      de: "Ein vollständiger Neuaufbau von Grund auf: native Plattformmuster für iOS und Android, Swipe-basierte Job-Entdeckung, KI-gestützte Empfehlungen und ein neu gestalteter Bewerbungsflow — mit 4,8-Sterne-Bewertung und 300% mehr mobilen Bewerbungen."
    },
    myRole: ["Product Owner", "UX/UI Design", "Stakeholder Management", "Beta Testing Coordination"],
    tools: ["Figma", "Jira", "Google Analytics", "Scrum", "User Testing"],
    imageUrl: imgJobwareMainDesign,
    imageAlt: {
      en: "Mobile app design mockup",
      de: "Mobile App-Design-Mockup"
    },
    metrics: [
      {
        label: {
          en: "App Store Rating",
          de: "App-Store-Bewertung"
        },
        value: "4.8/5",
        description: {
          en: "Achieved high user satisfaction ratings on both iOS and Android stores",
          de: "Hohe Nutzerzufriedenheitsbewertungen in iOS- und Android-Stores erreicht"
        }
      },
      {
        label: {
          en: "Mobile Applications Increase",
          de: "Mobile Bewerbungen Anstieg"
        },
        value: "300%",
        description: {
          en: "Dramatic increase in job applications submitted through mobile devices",
          de: "Dramatischer Anstieg der über mobile Geräte eingereichten Bewerbungen"
        }
      },
      {
        label: {
          en: "User Retention Rate",
          de: "Nutzer-Retention-Rate"
        },
        value: "72%",
        description: {
          en: "30-day user retention rate, significantly above industry average",
          de: "30-Tage-Nutzer-Retention-Rate, deutlich über dem Branchendurchschnitt"
        }
      },
      {
        label: {
          en: "Download Conversion Rate",
          de: "Download-Conversion-Rate"
        },
        value: "45%",
        description: {
          en: "Users who complete onboarding after downloading the app",
          de: "Nutzer, die das Onboarding nach dem App-Download abschließen"
        }
      }
    ],
    timeline: [
      {
        id: 'market-research',
        title: {
          en: 'Technical Assessment & Market Research',
          de: 'Technische Bewertung & Marktforschung'
        },
        description: {
          en: 'Conducted comprehensive technical audit of existing apps to identify performance bottlenecks and technical debt. Analyzed 15+ competitive job search apps and studied user reviews to understand mobile-specific needs and market opportunities.',
          de: 'Durchführung umfassender technischer Auditierung bestehender Apps zur Identifikation von Performance-Engpässen und technischen Schulden. Analyse von 15+ konkurrierenden Jobsuche-Apps und Studium von Nutzer-Reviews zum Verständnis mobilspezifischer Bedürfnisse und Marktchancen.'
        },
        challenge: {
          en: 'Legacy codebase and outdated architecture limited feature development and app performance',
          de: 'Legacy-Codebasis und veraltete Architektur begrenzten Feature-Entwicklung und App-Performance'
        },
        imageUrl: 'https://images.unsplash.com/photo-1636390877494-3ba0c41c7e5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcmVzZWFyY2glMjBpbnRlcnZpZXd8ZW58MXx8fHwxNzU5MDU4NDQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        imageAlt: {
          en: 'Market research analysis',
          de: 'Marktforschungsanalyse'
        },
        date: {
          en: 'Week 1-2',
          de: 'Woche 1-2'
        }
      },
      {
        id: 'user-flows',
        title: {
          en: 'Mobile User Journey Redesign',
          de: 'Neugestaltung der mobilen User Journey'
        },
        description: {
          en: 'Reimagined user flows from scratch, optimized for modern mobile interactions and smaller screen sizes. Focused on reducing steps to application and improving discovery through smart filters and AI-powered recommendations.',
          de: 'Neugestaltung der User Flows von Grund auf, optimiert für moderne mobile Interaktionen und kleinere Bildschirmgrößen. Fokus auf Reduzierung von Schritten zur Bewerbung und Verbesserung der Entdeckung durch intelligente Filter und KI-gestützte Empfehlungen.'
        },
        challenge: {
          en: 'Simplifying complex web workflows while maintaining full functionality on mobile',
          de: 'Vereinfachung komplexer Web-Workflows bei gleichzeitiger Aufrechterhaltung voller Funktionalität auf Mobilgeräten'
        },
        imageUrl: 'https://images.unsplash.com/photo-1546437593-3d0258c28037?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlZnJhbWUlMjBza2V0Y2hpbmclMjBkZXNpZ258ZW58MXx8fHwxNzU5MDg5NTU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        imageAlt: {
          en: 'User flow mapping',
          de: 'User-Flow-Mapping'
        },
        date: {
          en: 'Week 3-4',
          de: 'Woche 3-4'
        }
      },
      {
        id: 'mobile-prototyping',
        title: {
          en: 'Native Mobile Design & Prototyping',
          de: 'Natives mobiles Design & Prototyping'
        },
        description: {
          en: 'Designed completely new native iOS and Android interfaces following latest platform-specific guidelines. Created swipe-based interactions, location-aware features, and push notification systems to maximize engagement on modern devices.',
          de: 'Gestaltung komplett neuer nativer iOS- und Android-Oberflächen nach neuesten plattformspezifischen Richtlinien. Erstellung swipe-basierter Interaktionen, standortbewusster Features und Push-Benachrichtigungssysteme zur Maximierung des Engagements auf modernen Geräten.'
        },
        challenge: {
          en: 'Designing for both iOS and Android while maintaining consistent brand experience',
          de: 'Design für iOS und Android bei gleichzeitiger Aufrechterhaltung konsistenter Markenerfahrung'
        },
        imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTkwMjEzNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        imageAlt: {
          en: 'Mobile app development mockups',
          de: 'Mobile App-Entwicklungs-Mockups'
        },
        date: {
          en: 'Week 5-8',
          de: 'Woche 5-8'
        }
      },
      {
        id: 'beta-testing',
        title: {
          en: 'Beta Testing & Performance Optimization',
          de: 'Beta-Testing & Performance-Optimierung'
        },
        description: {
          en: 'Launched closed beta with 500 users to gather real-world usage data on the rebuilt apps. Analyzed user behavior through analytics and direct feedback. Optimized app performance and refined onboarding flow based on modern best practices.',
          de: 'Launch eines geschlossenen Betas mit 500 Nutzern zur Sammlung realer Nutzungsdaten der neu entwickelten Apps. Analyse des Nutzerverhaltens durch Analytics und direktes Feedback. Optimierung der App-Performance und Verfeinerung des Onboarding-Flows basierend auf modernen Best Practices.'
        },
        challenge: {
          en: 'Ensuring smooth performance across wide range of device types and OS versions',
          de: 'Sicherstellung reibungsloser Performance über breites Spektrum von Gerätetypen und OS-Versionen'
        },
        imageUrl: 'https://images.unsplash.com/photo-1738152878182-869a3fc9e220?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwdGVzdGluZyUyMGZlZWRiYWNrfGVufDF8fHx8MTc1OTA4OTU2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        imageAlt: {
          en: 'Beta testing feedback',
          de: 'Beta-Testing-Feedback'
        },
        date: {
          en: 'Week 9-11',
          de: 'Woche 9-11'
        }
      },
      {
        id: 'app-store-launch',
        title: {
          en: 'App Store Launch & Migration',
          de: 'App-Store-Launch & Migration'
        },
        description: {
          en: 'Coordinated seamless transition from old to new apps with smooth migration strategy for existing users. Designed enhanced onboarding experiences that increased conversion rates by 45%. Achieved featured placement on both iOS and Android stores.',
          de: 'Koordination nahtloser Übergang von alten zu neuen Apps mit reibungsloser Migrationsstrategie für bestehende Nutzer. Gestaltung verbesserter Onboarding-Erlebnisse, die Conversion-Raten um 45% erhöhten. Featured-Platzierung in iOS- und Android-Stores erreicht.'
        },
        challenge: {
          en: 'Migrating existing users without disruption while attracting new downloads',
          de: 'Migration bestehender Nutzer ohne Unterbrechung bei gleichzeitiger Anziehung neuer Downloads'
        },
        imageUrl: 'https://images.unsplash.com/photo-1678667720699-5c0fc04ac166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBtb2NrdXB8ZW58MXx8fHwxNzU5MDA0MzU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        imageAlt: {
          en: 'Mobile app store launch',
          de: 'Mobile App-Store-Launch'
        },
        date: {
          en: 'Week 12-14',
          de: 'Woche 12-14'
        }
      }
    ]
  },
  {
    id: 'analytics-dashboard',
    title: {
      en: "Analytics Dashboard",
      de: "Analytics-Dashboard"
    },
    context: {
      en: "Real-time analytics dashboard for HR professionals to track recruitment metrics, candidate pipelines, and performance insights with interactive data visualizations.",
      de: "Echtzeit-Analytics-Dashboard für HR-Profis zur Verfolgung von Recruiting-Metriken, Kandidaten-Pipelines und Performance-Insights mit interaktiven Datenvisualisierungen."
    },
    goal: {
      en: "Transform complex recruitment data into actionable insights through clear, intuitive visualizations that help HR teams make data-driven decisions.",
      de: "Transformation komplexer Recruiting-Daten in umsetzbare Insights durch klare, intuitive Visualisierungen, die HR-Teams bei datengestützten Entscheidungen unterstützen."
    },
    description: {
      en: "A comprehensive analytics platform that empowers HR teams with real-time insights, resulting in 35% faster hiring decisions and improved candidate quality metrics.",
      de: "Eine umfassende Analytics-Plattform, die HR-Teams mit Echtzeit-Insights befähigt, was zu 35% schnelleren Einstellungsentscheidungen und verbesserten Kandidatenqualitäts-Metriken führt."
    },
    problem: {
      en: "HR teams were spending hours each week manually compiling recruitment reports from fragmented data sources. Hiring decisions were delayed because key metrics — time-to-hire, pipeline health, source quality — were never visible in real time.",
      de: "HR-Teams verbrachten wöchentlich Stunden damit, Recruiting-Berichte manuell aus fragmentierten Datenquellen zusammenzustellen. Einstellungsentscheidungen verzögerten sich, weil wichtige Metriken — Time-to-Hire, Pipeline-Health, Source-Qualität — nie in Echtzeit sichtbar waren."
    },
    solution: {
      en: "A modular real-time dashboard that consolidates all recruitment data into one place — with role-based views for executives and operators, drill-down capabilities, and automated reporting that eliminated manual work entirely.",
      de: "Ein modulares Echtzeit-Dashboard, das alle Recruiting-Daten an einem Ort zusammenführt — mit rollenbasierten Ansichten für Führungskräfte und Operatoren, Drill-Down-Funktionen und automatisiertem Reporting, das manuelle Arbeit vollständig eliminierte."
    },
    myRole: ["Product Design", "Information Architecture", "Stakeholder Research", "Prototyping & Testing"],
    tools: ["Figma", "Google Analytics", "User Interviews", "Agile", "Data Visualization"],
    imageUrl: "https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjB1aSUyMGRlc2lnbnxlbnwxfHx8fDE3NTkwMDYyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    imageAlt: {
      en: "Dashboard UI design",
      de: "Dashboard-UI-Design"
    },
    metrics: [
      {
        label: {
          en: "Faster Hiring Decisions",
          de: "Schnellere Einstellungsentscheidungen"
        },
        value: "35%",
        description: {
          en: "Reduced time from candidate screening to hiring decision",
          de: "Reduzierte Zeit vom Kandidaten-Screening zur Einstellungsentscheidung"
        }
      },
      {
        label: {
          en: "Dashboard Adoption Rate",
          de: "Dashboard-Akzeptanzrate"
        },
        value: "85%",
        description: {
          en: "HR team members actively using the dashboard within first month",
          de: "HR-Teammitglieder nutzen aktiv das Dashboard im ersten Monat"
        }
      },
      {
        label: {
          en: "Data Processing Speed",
          de: "Datenverarbeitungsgeschwindigkeit"
        },
        value: "90%",
        description: {
          en: "Improvement in real-time data visualization performance",
          de: "Verbesserung der Echtzeit-Datenvisualisierungs-Performance"
        }
      },
      {
        label: {
          en: "Reporting Efficiency",
          de: "Berichtseffizienz"
        },
        value: "65%",
        description: {
          en: "Reduction in time spent creating manual reports",
          de: "Reduzierung der Zeit für manuelle Berichtserstellung"
        }
      }
    ],
    timeline: [
      {
        id: 'data-audit',
        title: {
          en: 'Data Requirements & Stakeholder Alignment',
          de: 'Datenanforderungen & Stakeholder-Abstimmung'
        },
        description: {
          en: 'Collaborated with HR teams and data analysts to understand current reporting gaps and pain points. Mapped existing data sources and identified key metrics that drive hiring decisions.',
          de: 'Zusammenarbeit mit HR-Teams und Datenanalysten zum Verständnis aktueller Berichtslücken und Schmerzpunkte. Kartierung bestehender Datenquellen und Identifikation wichtiger Metriken, die Einstellungsentscheidungen antreiben.'
        },
        challenge: {
          en: 'Fragmented data sources and conflicting stakeholder priorities for metrics',
          de: 'Fragmentierte Datenquellen und widersprüchliche Stakeholder-Prioritäten für Metriken'
        },
        imageUrl: 'https://images.unsplash.com/photo-1636390877494-3ba0c41c7e5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcmVzZWFyY2glMjBpbnRlcnZpZXd8ZW58MXx8fHwxNzU5MDU4NDQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        imageAlt: {
          en: 'Stakeholder research session',
          de: 'Stakeholder-Forschungssitzung'
        },
        date: {
          en: 'Week 1-2',
          de: 'Woche 1-2'
        }
      },
      {
        id: 'dashboard-architecture',
        title: {
          en: 'Information Architecture & Dashboard Strategy',
          de: 'Informationsarchitektur & Dashboard-Strategie'
        },
        description: {
          en: 'Designed modular dashboard architecture that allows customization based on user roles. Created hierarchy of metrics from high-level KPIs to detailed operational data.',
          de: 'Gestaltung modularer Dashboard-Architektur, die Anpassung basierend auf Nutzerrollen ermöglicht. Erstellung einer Metrik-Hierarchie von High-Level-KPIs bis zu detaillierten operativen Daten.'
        },
        challenge: {
          en: 'Creating scalable architecture that serves both executives and operational users',
          de: 'Schaffung skalierbarer Architektur, die sowohl Führungskräfte als auch operative Nutzer bedient'
        },
        imageUrl: 'https://images.unsplash.com/photo-1546437593-3d0258c28037?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlZnJhbWUlMjBza2V0Y2hpbmclMjBkZXNpZ258ZW58MXx8fHwxNzU5MDg5NTU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        imageAlt: {
          en: 'Dashboard wireframe architecture',
          de: 'Dashboard-Wireframe-Architektur'
        },
        date: {
          en: 'Week 3-4',
          de: 'Woche 3-4'
        }
      },
      {
        id: 'data-visualization',
        title: {
          en: 'Data Visualization Design',
          de: 'Datenvisualisierungs-Design'
        },
        description: {
          en: 'Created comprehensive chart library and visualization patterns optimized for HR metrics. Focused on scannable layouts, progressive disclosure, and contextual insights that drive action.',
          de: 'Erstellung umfassender Chart-Bibliothek und Visualisierungsmuster optimiert für HR-Metriken. Fokus auf scanbare Layouts, progressive Offenlegung und kontextuelle Insights, die Aktion antreiben.'
        },
        challenge: {
          en: 'Making complex recruitment data accessible and actionable for all skill levels',
          de: 'Komplexe Recruiting-Daten für alle Fähigkeitslevel zugänglich und umsetzbar machen'
        },
        imageUrl: 'https://images.unsplash.com/photo-1748609160056-7b95f30041f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBjaGFydHN8ZW58MXx8fHwxNzU4OTk2MDg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        imageAlt: {
          en: 'Analytics dashboard charts',
          de: 'Analytics-Dashboard-Charts'
        },
        date: {
          en: 'Week 5-7',
          de: 'Woche 5-7'
        }
      },
      {
        id: 'interactive-prototyping',
        title: {
          en: 'Interactive Dashboard Prototyping',
          de: 'Interaktives Dashboard-Prototyping'
        },
        description: {
          en: 'Built working prototypes with real data connections to test filtering, drilling down, and cross-dashboard navigation. Incorporated responsive design for mobile access.',
          de: 'Erstellung funktionierender Prototypen mit echten Datenverbindungen zum Testen von Filtern, Drill-Downs und Dashboard-übergreifender Navigation. Integration von responsivem Design für mobilen Zugriff.'
        },
        challenge: {
          en: 'Ensuring responsive design worked effectively with complex data visualizations',
          de: 'Sicherstellung, dass responsives Design effektiv mit komplexen Datenvisualisierungen funktioniert'
        },
        imageUrl: 'https://images.unsplash.com/photo-1603975711481-18b7aaca4caa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm90b3R5cGluZyUyMGRlc2lnbiUyMHByb2Nlc3N8ZW58MXx8fHwxNzU5MDg5NTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        imageAlt: {
          en: 'Interactive prototyping process',
          de: 'Interaktiver Prototyping-Prozess'
        },
        date: {
          en: 'Week 8-10',
          de: 'Woche 8-10'
        }
      },
      {
        id: 'user-validation',
        title: {
          en: 'User Testing & Dashboard Optimization',
          de: 'Nutzertests & Dashboard-Optimierung'
        },
        description: {
          en: 'Conducted task-based testing with HR professionals to validate dashboard usability. Refined layouts based on scanning patterns and information seeking behaviors.',
          de: 'Durchführung aufgabenbasierter Tests mit HR-Profis zur Validierung der Dashboard-Benutzerfreundlichkeit. Verfeinerung von Layouts basierend auf Scan-Mustern und Informationssuch-Verhaltensweisen.'
        },
        challenge: {
          en: 'Balancing comprehensive data display with cognitive load management',
          de: 'Ausbalancierung umfassender Datenanzeige mit Management der kognitiven Belastung'
        },
        imageUrl: 'https://images.unsplash.com/photo-1738152878182-869a3fc9e220?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwdGVzdGluZyUyMGZlZWRiYWNrfGVufDF8fHx8MTc1OTA4OTU2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        imageAlt: {
          en: 'User testing validation',
          de: 'Nutzertest-Validierung'
        },
        date: {
          en: 'Week 11-12',
          de: 'Woche 11-12'
        }
      },
      {
        id: 'dashboard-rollout',
        title: {
          en: 'Phased Rollout & Adoption',
          de: 'Stufenweiser Rollout & Akzeptanz'
        },
        description: {
          en: 'Implemented phased rollout strategy starting with power users. Created training materials and dashboard guides. Achieved 85% adoption rate within first month of launch.',
          de: 'Implementierung stufenweiser Rollout-Strategie beginnend mit Power-Nutzern. Erstellung von Schulungsmaterialien und Dashboard-Guides. 85% Akzeptanzrate im ersten Monat nach Launch erreicht.'
        },
        challenge: {
          en: 'Driving adoption across teams with varying data literacy levels',
          de: 'Förderung der Akzeptanz über Teams mit unterschiedlichen Datenkompetenz-Leveln'
        },
        imageUrl: 'https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjB1aSUyMGRlc2lnbnxlbnwxfHx8fDE3NTkwMDYyNjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        imageAlt: {
          en: 'Dashboard rollout success',
          de: 'Dashboard-Rollout-Erfolg'
        },
        date: {
          en: 'Week 13-15',
          de: 'Woche 13-15'
        }
      }
    ]
  },
  {
    id: 'design-system-components',
    title: {
      en: "Design System & Components",
      de: "Design-System & Komponenten"
    },
    context: {
      en: "Comprehensive design system development for consistent user experiences across all Jobware products, including component library and design tokens.",
      de: "Umfassende Design-System-Entwicklung für konsistente Nutzererlebnisse über alle Jobware-Produkte hinweg, einschließlich Komponentenbibliothek und Design-Tokens."
    },
    goal: {
      en: "Establish a scalable design foundation that ensures consistency, improves development efficiency, and maintains accessibility standards across the platform.",
      de: "Etablierung einer skalierbaren Design-Grundlage, die Konsistenz gewährleistet, Entwicklungseffizienz verbessert und Barrierefreiheitsstandards über die Plattform hinweg aufrechterhält."
    },
    description: {
      en: "A foundational design system that standardized the entire product ecosystem, reducing design-to-development time by 60% and ensuring consistent user experiences across all touchpoints.",
      de: "Ein grundlegendes Design-System, das das gesamte Produkt-Ökosystem standardisierte, Design-zu-Entwicklung-Zeit um 60% reduzierte und konsistente Nutzererlebnisse über alle Touchpoints hinweg gewährleistet."
    },
    problem: {
      en: "Each Jobware product had evolved its own visual language — different button styles, inconsistent spacing, diverging color usage. Designers were rebuilding the same components repeatedly, and developers implemented them differently each time, creating a fragmented user experience.",
      de: "Jedes Jobware-Produkt hatte seine eigene visuelle Sprache entwickelt — unterschiedliche Button-Stile, inkonsistentes Spacing, divergierende Farbnutzung. Designer bauten dieselben Komponenten wiederholt neu, und Entwickler implementierten sie jedes Mal anders, was eine fragmentierte Nutzererfahrung schuf."
    },
    solution: {
      en: "A single source of truth: a comprehensive design system with semantic tokens, a full component library with accessibility baked in, and documentation that served both designers and developers. 95% component reusability. 100% team adoption.",
      de: "Eine einzige Quelle der Wahrheit: ein umfassendes Design-System mit semantischen Tokens, einer vollständigen Komponentenbibliothek mit eingebetteter Barrierefreiheit und Dokumentation, die sowohl Designern als auch Entwicklern diente. 95% Komponenten-Wiederverwendbarkeit. 100% Team-Adoption."
    },
    myRole: ["Design System Architecture", "Component Design", "Documentation", "Team Training & Adoption"],
    tools: ["Figma", "Design Tokens", "Accessibility Standards", "Component Library"],
    imageUrl: "https://images.unsplash.com/photo-1758611974287-8ca7147860a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXNpZ24lMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU5OTE5Nzc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    imageAlt: {
      en: "Modern web design interface",
      de: "Modernes Web-Design-Interface"
    },
    metrics: [
      {
        label: {
          en: "Design-to-Development Time",
          de: "Design-zu-Entwicklung-Zeit"
        },
        value: "60%",
        description: {
          en: "Reduction in time from design completion to development implementation",
          de: "Reduzierung der Zeit von Design-Fertigstellung bis Entwicklungs-Implementierung"
        }
      },
      {
        label: {
          en: "Component Reusability",
          de: "Komponenten-Wiederverwendbarkeit"
        },
        value: "95%",
        description: {
          en: "Percentage of new features built using existing design system components",
          de: "Prozentsatz neuer Features, die mit bestehenden Design-System-Komponenten erstellt wurden"
        }
      },
      {
        label: {
          en: "Cross-Product Consistency",
          de: "Produkt-übergreifende Konsistenz"
        },
        value: "98%",
        description: {
          en: "Visual consistency score across all Jobware product touchpoints",
          de: "Visuelle Konsistenz-Bewertung über alle Jobware-Produkt-Touchpoints"
        }
      },
      {
        label: {
          en: "Developer Adoption",
          de: "Entwickler-Akzeptanz"
        },
        value: "100%",
        description: {
          en: "All development teams actively using the design system",
          de: "Alle Entwicklungsteams nutzen aktiv das Design-System"
        }
      }
    ],
    timeline: [
      {
        id: 'system-audit',
        title: {
          en: 'Design Audit & System Planning',
          de: 'Design-Audit & System-Planung'
        },
        description: {
          en: 'Conducted comprehensive audit of existing design patterns across all Jobware products. Identified inconsistencies and gaps that needed standardization. Created roadmap for design system implementation.',
          de: 'Durchführung umfassender Auditierung bestehender Design-Muster über alle Jobware-Produkte. Identifikation von Inkonsistenzen und Lücken, die Standardisierung benötigten. Erstellung einer Roadmap für Design-System-Implementierung.'
        },
        challenge: {
          en: 'Unifying disparate design approaches across multiple established products',
          de: 'Vereinheitlichung unterschiedlicher Design-Ansätze über mehrere etablierte Produkte'
        },
        imageUrl: 'https://images.unsplash.com/photo-1636390877494-3ba0c41c7e5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcmVzZWFyY2glMjBpbnRlcnZpZXd8ZW58MXx8fHwxNzU5MDU4NDQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        imageAlt: {
          en: 'Design system audit process',
          de: 'Design-System-Audit-Prozess'
        },
        date: {
          en: 'Week 1-3',
          de: 'Woche 1-3'
        }
      },
      {
        id: 'foundations',
        title: {
          en: 'Design Foundations & Tokens',
          de: 'Design-Grundlagen & Tokens'
        },
        description: {
          en: 'Established core design tokens including color palettes, typography scales, spacing systems, and elevation principles. Created semantic naming conventions and accessibility guidelines.',
          de: 'Etablierung von Kern-Design-Tokens einschließlich Farbpaletten, Typografie-Skalen, Abstandssystemen und Höhen-Prinzipien. Erstellung semantischer Namenskonventionen und Barrierefreiheits-Richtlinien.'
        },
        challenge: {
          en: 'Creating flexible token system that works across diverse product requirements',
          de: 'Schaffung eines flexiblen Token-Systems, das über diverse Produktanforderungen funktioniert'
        },
        imageUrl: 'https://images.unsplash.com/photo-1546437593-3d0258c28037?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlZnJhbWUlMjBza2V0Y2hpbmclMjBkZXNpZ258ZW58MXx8fHwxNzU5MDg5NTU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        imageAlt: {
          en: 'Design token foundations',
          de: 'Design-Token-Grundlagen'
        },
        date: {
          en: 'Week 4-6',
          de: 'Woche 4-6'
        }
      },
      {
        id: 'component-library',
        title: {
          en: 'Component Library Development',
          de: 'Komponenten-Bibliotheks-Entwicklung'
        },
        description: {
          en: 'Built comprehensive component library starting with atomic elements and building up to complex patterns. Each component includes multiple states, variations, and usage guidelines.',
          de: 'Erstellung umfassender Komponentenbibliothek beginnend mit atomaren Elementen und Aufbau zu komplexen Mustern. Jede Komponente beinhaltet mehrere States, Variationen und Nutzungsrichtlinien.'
        },
        challenge: {
          en: 'Balancing component flexibility with consistency and ease of use',
          de: 'Ausbalancierung von Komponenten-Flexibilität mit Konsistenz und Benutzerfreundlichkeit'
        },
        imageUrl: 'https://images.unsplash.com/photo-1737918543099-dfa8ec2e3909?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBzeXN0ZW0lMjBjb21wb25lbnRzfGVufDF8fHx8MTc1OTAxMDQ5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        imageAlt: {
          en: 'Component library development',
          de: 'Komponenten-Bibliotheks-Entwicklung'
        },
        date: {
          en: 'Week 7-12',
          de: 'Woche 7-12'
        }
      },
      {
        id: 'documentation',
        title: {
          en: 'Documentation & Guidelines',
          de: 'Dokumentation & Richtlinien'
        },
        description: {
          en: 'Created comprehensive documentation including component usage guidelines, accessibility standards, and implementation examples. Built interactive documentation site for teams.',
          de: 'Erstellung umfassender Dokumentation einschließlich Komponenten-Nutzungsrichtlinien, Barrierefreiheitsstandards und Implementierungsbeispielen. Aufbau interaktiver Dokumentationsseite für Teams.'
        },
        challenge: {
          en: 'Creating documentation that serves both designers and developers effectively',
          de: 'Erstellung von Dokumentation, die sowohl Designer als auch Entwickler effektiv bedient'
        },
        imageUrl: 'https://images.unsplash.com/photo-1603975711481-18b7aaca4caa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm90b3R5cGluZyUyMGRlc2lnbiUyMHByb2Nlc3N8ZW58MXx8fHwxNzU5MDg5NTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        imageAlt: {
          en: 'Documentation and guidelines',
          de: 'Dokumentation und Richtlinien'
        },
        date: {
          en: 'Week 13-15',
          de: 'Woche 13-15'
        }
      },
      {
        id: 'team-adoption',
        title: {
          en: 'Team Training & Adoption',
          de: 'Team-Training & Akzeptanz'
        },
        description: {
          en: 'Conducted design system training workshops for design and development teams. Created migration guides for existing products and established governance processes.',
          de: 'Durchführung von Design-System-Trainingsworkshops für Design- und Entwicklungsteams. Erstellung von Migrationsguides für bestehende Produkte und Etablierung von Governance-Prozessen.'
        },
        challenge: {
          en: 'Convincing teams to adopt new workflow and migrate from existing solutions',
          de: 'Überzeugung von Teams, neuen Workflow zu übernehmen und von bestehenden Lösungen zu migrieren'
        },
        imageUrl: 'https://images.unsplash.com/photo-1738152878182-869a3fc9e220?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwdGVzdGluZyUyMGZlZWRiYWNrfGVufDF8fHx8MTc1OTA4OTU2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        imageAlt: {
          en: 'Team training session',
          de: 'Team-Training-Sitzung'
        },
        date: {
          en: 'Week 16-18',
          de: 'Woche 16-18'
        }
      },
      {
        id: 'system-evolution',
        title: {
          en: 'System Evolution & Maintenance',
          de: 'System-Evolution & Wartung'
        },
        description: {
          en: 'Established processes for design system evolution and maintenance. Created feedback loops with product teams and implemented version control for component updates.',
          de: 'Etablierung von Prozessen für Design-System-Evolution und Wartung. Erstellung von Feedback-Schleifen mit Produktteams und Implementierung von Versionskontrolle für Komponenten-Updates.'
        },
        challenge: {
          en: 'Maintaining system relevance while ensuring backwards compatibility',
          de: 'Aufrechterhaltung der System-Relevanz bei gleichzeitiger Gewährleistung der Rückwärtskompatibilität'
        },
        imageUrl: 'https://images.unsplash.com/photo-1758611974287-8ca7147860a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXNpZ24lMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU4OTE5Nzc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        imageAlt: {
          en: 'Design system evolution',
          de: 'Design-System-Evolution'
        },
        date: {
          en: 'Ongoing',
          de: 'Laufend'
        }
      }
    ]
  }
];