import { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Monitor, Languages } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from './ThemeProvider';
import { useLanguage } from '../contexts/LanguageContext';
import gsap from 'gsap';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import memojiImage from 'figma:asset/cb2a452d54f2969d9512e8eabdac208ca12c8b83.png';
import memojiHappyImage from 'figma:asset/f815fd85ce6178161b3fe43d375b21d5e71cc30d.png';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'power3.out' }
    );
  }, []);

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'resume', label: t('nav.resume') },
    { id: 'about', label: t('nav.about') },
  ];

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-border/40"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between md:grid md:grid-cols-3">
        {/* Memoji + greeting */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 group"
          aria-label="Home"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-border">
            <img
              src={isHovered ? memojiHappyImage : memojiImage}
              alt="Lukas Hoppenberg Memoji"
              className="w-full h-full object-cover"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          </div>
          <span className="text-foreground text-sm font-medium hidden md:block tracking-tight">
            {t('header.greeting')}
          </span>
        </button>

        {/* Navigation */}
        <nav className="flex items-center justify-center gap-7">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative text-sm tracking-tight transition-colors duration-300 hover:text-foreground after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-primary after:transition-all after:duration-300 ${
                currentPage === item.id
                  ? 'text-foreground after:w-full'
                  : 'text-muted-foreground after:w-0 hover:after:w-full'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Theme and Language toggles */}
        <div className="hidden md:flex justify-end gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Languages className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')}>
                <span className="mr-2">🇬🇧</span>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('de')}>
                <span className="mr-2">🇩🇪</span>
                Deutsch
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                {getThemeIcon()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <Sun className="h-4 w-4 mr-2" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                <Monitor className="h-4 w-4 mr-2" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
