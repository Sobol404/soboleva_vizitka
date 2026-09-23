import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: 'Обо мне', href: '/', section: 'about' },
    { name: 'Услуги', href: '/', section: 'services' },
    { name: 'Блог', href: '/blog', route: true },
    { name: 'Отзывы', href: '/', section: 'reviews' },
    { name: 'Контакты', href: '/', section: 'contact' },
  ];

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const openPage = window.location.pathname !== '/';

    if (openPage) {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.setTimeout(() => {
        const target = targetId === 'root' ? document.getElementById('root') : document.getElementById(targetId);
        target?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      setIsOpen(false);
      return;
    }

    const targetElement = targetId === 'root' ? document.getElementById('root') : document.getElementById(targetId);
    
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navigateToRoute = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    window.history.pushState({}, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
    setIsOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-dark-deep/80 shadow-md backdrop-blur-md' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          <a href="/" onClick={(e) => scrollToSection(e, 'root')} className="text-2xl font-bold text-dark dark:text-white tracking-tight">
            Safe Visa<span className="text-accent">.</span>
          </a>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => link.route ? navigateToRoute(e, link.href) : scrollToSection(e, link.section || 'root')}
                className="text-sm font-semibold text-dark dark:text-slate-300 hover:text-accent dark:hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-dark dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>
          
          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-2">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-dark dark:text-white mr-2"
              aria-label="Переключить тему"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-dark dark:text-white p-2"
              aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-dark-deep shadow-lg border-t dark:border-slate-800">
          <nav className="flex flex-col items-center gap-6 py-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => link.route ? navigateToRoute(e, link.href) : scrollToSection(e, link.section || 'root')}
                className="text-lg font-semibold text-dark dark:text-slate-200 hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
