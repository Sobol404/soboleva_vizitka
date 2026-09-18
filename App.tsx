import React, { useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { SafeCase } from './components/SafeCase';
import { SafeCaseLanding } from './components/SafeCaseLanding';
import { Socials } from './components/Socials';
import { Services } from './components/Services';
import { Reviews } from './components/Reviews';
import { Guarantees } from './components/Guarantees';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { VisaSlider } from './components/VisaSlider';
import { ArticlePage } from './components/ArticlePage';
import { ArticleData } from './articles/types';
import { markdownArticles } from './content/article-loader';
import { PolicyPage } from './components/PolicyPage';
import { OfferPage } from './components/OfferPage';
import { BlogPreview } from './components/BlogPreview';
import { BlogPage } from './components/BlogPage';
import { MiniLanding } from './components/MiniLanding';

const safeCaseCard: ArticleData = {
  id: 'safe-case',
  title: 'Safe Case: стратегия для сложного визового кейса',
  description: 'Большой разбор метода, типичных ошибок, кейсов и пути подготовки к интервью.',
  date: 'Спецпроект',
  author: 'Ирина Соболева',
  mainImage: '/media/pages/safe-case/article-preview.jpeg',
  href: '/usa-safecase',
};

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [currentArticle, setCurrentArticle] = useState<ArticleData | null>(null);
  const [isSafeCaseOpen, setIsSafeCaseOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [isOfferOpen, setIsOfferOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [isMiniOpen, setIsMiniOpen] = useState(false);

  const articleRegistry = useMemo(
    () => Object.fromEntries(markdownArticles.map((article) => [article.id, article])),
    [],
  );
  const blogArticles = useMemo(() => [safeCaseCard, ...markdownArticles], []);

  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
      const hash = window.location.hash;

      if (pathname === '/usa-safecase') {
        setCurrentArticle(null);
        setIsSafeCaseOpen(true);
        setIsPolicyOpen(false);
        setIsOfferOpen(false);
        setIsBlogOpen(false);
        setIsMiniOpen(false);
        document.title = 'Safe Case | Ирина Соболева';
        window.scrollTo(0, 0);
        return;
      }

      if (pathname === '/mini1') {
        setCurrentArticle(null);
        setIsSafeCaseOpen(false);
        setIsPolicyOpen(false);
        setIsOfferOpen(false);
        setIsBlogOpen(false);
        setIsMiniOpen(true);
        window.scrollTo(0, 0);
        return;
      }

      if (hash === '#/safe-case') {
        setCurrentArticle(null);
        setIsSafeCaseOpen(true);
        setIsPolicyOpen(false);
        setIsOfferOpen(false);
        setIsBlogOpen(false);
        setIsMiniOpen(false);
        document.title = 'Safe Case | Ирина Соболева';
        window.scrollTo(0, 0);
        return;
      }

      if (hash === '#/policy') {
        setCurrentArticle(null);
        setIsSafeCaseOpen(false);
        setIsPolicyOpen(true);
        setIsOfferOpen(false);
        setIsBlogOpen(false);
        setIsMiniOpen(false);
        window.scrollTo(0, 0);
        return;
      }

      if (hash === '#/offer') {
        setCurrentArticle(null);
        setIsSafeCaseOpen(false);
        setIsPolicyOpen(false);
        setIsOfferOpen(true);
        setIsBlogOpen(false);
        setIsMiniOpen(false);
        window.scrollTo(0, 0);
        return;
      }

      if (hash === '#/blog') {
        setCurrentArticle(null);
        setIsSafeCaseOpen(false);
        setIsPolicyOpen(false);
        setIsOfferOpen(false);
        setIsBlogOpen(true);
        setIsMiniOpen(false);
        document.title = 'Ира Соболева про визы | Блог';
        window.scrollTo(0, 0);
        return;
      }

      const articleId = hash.replace('#/article/', '');
      if (hash.startsWith('#/article/') && articleRegistry[articleId]) {
        setIsSafeCaseOpen(false);
        setIsPolicyOpen(false);
        setIsOfferOpen(false);
        setIsBlogOpen(false);
        setIsMiniOpen(false);
        setCurrentArticle(articleRegistry[articleId]);
        return;
      }

      setCurrentArticle(null);
      setIsSafeCaseOpen(false);
      setIsPolicyOpen(false);
      setIsOfferOpen(false);
      setIsBlogOpen(false);
      setIsMiniOpen(false);
      document.title = 'Эксперт по визам США | Safe Case';
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    handleLocationChange();
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [articleRegistry]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((current) => !current);
  const goBack = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen w-full overflow-x-clip transition-colors duration-300">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 dark:opacity-20">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      </div>

      {!isMiniOpen && <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
      <main className="relative z-10">
        {isPolicyOpen ? (
          <PolicyPage onBack={goBack} />
        ) : isOfferOpen ? (
          <OfferPage onBack={goBack} />
        ) : isSafeCaseOpen ? (
          <SafeCaseLanding onBack={goBack} relatedArticles={markdownArticles} />
        ) : isMiniOpen ? (
          <MiniLanding />
        ) : isBlogOpen ? (
          <BlogPage articles={blogArticles} onBack={goBack} />
        ) : currentArticle ? (
          <ArticlePage data={currentArticle} onBack={goBack} />
        ) : (
          <>
            <Hero />
            <About />
            <VisaSlider />
            <SafeCase />
            <Socials />
            <BlogPreview articles={blogArticles} />

            <Services />
            <Reviews />
            <Guarantees />
            <Contact />
          </>
        )}
      </main>
      {!isMiniOpen && <Footer />}
    </div>
  );
};

export default App;
