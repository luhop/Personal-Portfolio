# Portfolio – Projektdokumentation

## Scope

Persönliches Portfolio von Lukas. Ursprünglich in **Figma Make** erstellt und gehostet, jetzt selbst gemanaged und gehostet. Zeigt UX/Product-Design-Projekte mit Kontext, Metriken und Prozess-Timeline.

---

## Tech-Stack

| Schicht | Technologie |
|---|---|
| Framework | React 18 + TypeScript |
| Build-Tool | Vite 6 |
| Styling | Tailwind CSS |
| UI-Komponenten | shadcn/ui (Radix UI Primitives) |
| Animationen | Framer Motion / Motion |
| Theming | next-themes |
| i18n | Custom Context (EN/DE) |
| Linting / Types | `@types/node`, TypeScript via Vite |

---

## Projektstruktur

```
Portfolio/
├── index.html               # Einstiegspunkt (SPA-Shell)
├── vite.config.ts           # Vite-Konfiguration inkl. Figma-Asset-Aliases
├── package.json
└── src/
    ├── main.tsx             # React-Root-Mount
    ├── App.tsx              # Routing-Logik (Hash-Router)
    ├── index.css            # Tailwind-Direktiven + globale Styles
    ├── assets/              # Figma-exportierte PNGs (Hash-Dateinamen)
    ├── components/
    │   ├── Header.tsx       # Navigation + Theme/Language-Toggle
    │   ├── Footer.tsx
    │   ├── HomePage.tsx     # Projektübersicht / Landing
    │   ├── ResumePage.tsx   # Lebenslauf-Ansicht
    │   ├── AboutPage.tsx    # Über mich
    │   ├── ProjectPage.tsx  # Einzelne Projektansicht
    │   ├── ProjectCard.tsx  # Karte für Projektliste
    │   ├── ProjectMetrics.tsx
    │   ├── ProjectTimeline.tsx
    │   ├── ThemeProvider.tsx
    │   ├── figma/
    │   │   └── ImageWithFallback.tsx  # Bild-Komponente mit Fallback
    │   └── ui/              # shadcn/ui Komponenten (Button, Card, etc.)
    ├── contexts/
    │   └── LanguageContext.tsx  # EN/DE-Sprachumschaltung + localStorage
    ├── data/
    │   ├── projectsData.ts  # Projektinhalte (bilinguale Felder)
    │   ├── projects.ts      # Projekt-Typdefinitionen / Hilfsdaten
    │   └── translations.ts  # UI-Strings EN/DE
    ├── imports/             # Asset-Imports (Thumbnails)
    └── styles/              # Zusätzliche CSS-Dateien
```

---

## Routing

Kein React Router. Routing über `window.location.hash` + `History API` in [App.tsx](src/App.tsx).

| Route | Komponente |
|---|---|
| `#home` | `HomePage` |
| `#resume` | `ResumePage` |
| `#about` | `AboutPage` |
| `#project/:id` | `ProjectPage` |

Browser-Back/Forward wird über den `popstate`-Event unterstützt.

---

## Datenmodell

Projekte sind statische TypeScript-Objekte in [src/data/projectsData.ts](src/data/projectsData.ts).

```ts
interface Project {
  id: string;
  title: { en: string; de: string };
  context: { en: string; de: string };
  goal: { en: string; de: string };
  description: { en: string; de: string };
  imageUrl: string | (() => JSX.Element);
  imageAlt: { en: string; de: string };
  metrics: Array<{ label, value, description }>;
  timeline: Array<{ id, title, description, challenge, imageUrl, imageAlt, date }>;
}
```

**Aktuelle Projekte:**
- `bewerbung2go-mobile-app` – Mobile App für schnelle Bewerbungen
- `mobile-job-search-app` – Neuentwicklung nativer iOS/Android-Apps
- `analytics-dashboard` – HR-Analytics-Dashboard
- `design-system-components` – Design System & Komponentenbibliothek

---

## Internationalisierung

Sprache (EN/DE) wird im `LanguageContext` verwaltet, in `localStorage` persistiert. Alle Texte in Daten und UI-Strings sind bilateral definiert. Hook: `useLanguage()` → `{ language, setLanguage, t(key) }`.

---

## Figma-Make-Erbe

Das Projekt wurde aus Figma Make exportiert. Dabei entstanden:
- Bild-Aliases in [vite.config.ts](vite.config.ts): `figma:asset/<hash>.png` → `src/assets/<hash>.png`
- Hash-benannte Asset-Dateien in `src/assets/`
- `src/components/figma/ImageWithFallback.tsx`

Diese Aliases können schrittweise durch normale Imports ersetzt werden.

---

## Entwicklung

```bash
npm install      # Abhängigkeiten installieren
npm run dev      # Dev-Server auf http://localhost:3000 (HMR aktiv)
npm run build    # Produktions-Build → build/
```

---

## Bekannte Abhängigkeiten / Hinweise

- `vite` ist nur als devDependency gelistet, `tailwindcss` fehlt explizit (wird vermutlich über Vite-Plugin oder CSS-Import eingebunden – prüfen)
- Moderate npm-Vulnerability vorhanden (`npm audit` für Details)
- Keine TypeScript-Config (`tsconfig.json`) im Root sichtbar – Vite übernimmt die TS-Verarbeitung via `@vitejs/plugin-react-swc`
