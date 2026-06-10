import { useState } from 'react';
import { Sun, Moon, Monitor, Languages } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from './ThemeProvider';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
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

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <motion.div
        className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between md:grid md:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.6,
          delay: 0.3,
          ease: 'easeOut',
        }}
      >
        {/* Memoji */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={isHovered ? memojiHappyImage : memojiImage}
              alt="Lukas Hoppenberg Memoji"
              className="w-full h-full object-cover"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          </div>
          <span className="text-foreground font-medium hidden md:block">{t('header.greeting')}</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center justify-center gap-8">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors hover:text-foreground ${
              currentPage === 'home' ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            {t('nav.home')}.
          </button>
          <button
            onClick={() => onNavigate('resume')}
            className={`transition-colors hover:text-foreground ${
              currentPage === 'resume' ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            {t('nav.resume')}.
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`transition-colors hover:text-foreground ${
              currentPage === 'about' ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            {t('nav.about')}.
          </button>
        </nav>

        {/* Theme and Language toggles */}
        <div className="hidden md:flex justify-end gap-2">
          {/* Language toggle */}
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

          {/* Theme toggle */}
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
      </motion.div>
    </motion.header>
  );
}