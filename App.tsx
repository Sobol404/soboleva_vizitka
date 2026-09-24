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
import { CookiesPage } from './components/CookiesPage';
import { PrivacyPage } from './components/PrivacyPage';
import { ClientDataConsentPage } from './components/ClientDataConsentPage';
import { AdvertisingConsentPage } from './components/AdvertisingConsentPage';
import { CookieBanner } from './components/CookieBanner';
import { getMetrikaVirtualPath, MetrikaTracker } from './analytics/MetrikaTracker';

const safeCaseCard: ArticleData = {
  id: 'safe-case',
  title: 'Safe Case: стратегия для сложного визового кейса',
  description: 'Большой разбор метода, типичных ошибок, кейсов и пути подготовки к интервью.',
  date: 'Спецпроект',
  author: 'Ирина Соболева',
  mainImage: '/media/pages/safe-case/article-preview.jpeg',
  href: '/usa-safecase',
};

type StaticPage = 'home' | 'safe-case' | 'policy' | 'privacy' | 'client-consent' | 'advertising-consent' | 'offer' | 'blog' | 'mini' | 'mini-max' | 'cookies';

const legacyRoutes: Record<string, string> = {
  '#/safe-case': '/usa-safecase',
  '#/policy': '/policy',
  '#/privacy': '/privacy',
  '#/client-data-consent': '/client-data-consent',
  '#/advertising-consent': '/advertising-consent',
  '#/offer': '/offer',
  '#/cookies': '/cookies',
  '#/blog': '/blog',
};

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [currentArticle, setCurrentArticle] = useState<ArticleData | null>(null);
  const [staticPage, setStaticPage] = useState<StaticPage>('home');

  const articleRegistry = useMemo(
    () => Object.fromEntries(markdownArticles.map((article) => [article.id, article])),
    [],
  );
  const blogArticles = useMemo(() => [safeCaseCard, ...markdownArticles], []);

  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash;
      const legacyArticleId = hash.startsWith('#/article/') ? hash.replace('#/article/', '') : '';
      const legacyPath = legacyArticleId ? `/article/${legacyArticleId}` : legacyRoutes[hash];
      let pathname = window.location.pathname.replace(/\/+$/, '') || '/';

      if (legacyPath) {
        window.history.replaceState({}, '', legacyPath);
        pathname = legacyPath;
      }

      const articleId = pathname.startsWith('/article/') ? pathname.replace('/article/', '') : '';
      if (articleId && articleRegistry[articleId]) {
        setStaticPage('home');
        setCurrentArticle(articleRegistry[articleId]);
        window.scrollTo(0, 0);
        return;
      }

      const routeMap: Record<string, StaticPage> = {
        '/': 'home',
        '/usa-safecase': 'safe-case',
        '/policy': 'policy',
        '/privacy': 'privacy',
        '/client-data-consent': 'client-consent',
        '/advertising-consent': 'advertising-consent',
        '/offer': 'offer',
        '/cookies': 'cookies',
        '/blog': 'blog',
        '/mini1': 'mini',
        '/mini1-max': 'mini-max',
      };

      const nextPage = routeMap[pathname] || 'home';
      setCurrentArticle(null);
      setStaticPage(nextPage);

      if (nextPage === 'safe-case') document.title = 'Safe Case | Ирина Соболева';
      if (nextPage === 'blog') document.title = 'Ира Соболева про визы | Блог';
      if (nextPage === 'home') document.title = 'Эксперт по визам США | Safe Case';
      window.scrollTo(0, 0);
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
  const isSafeCaseOpen = staticPage === 'safe-case';
  const isPolicyOpen = staticPage === 'policy';
  const isPrivacyOpen = staticPage === 'privacy';
  const isClientConsentOpen = staticPage === 'client-consent';
  const isAdvertisingConsentOpen = staticPage === 'advertising-consent';
  const isOfferOpen = staticPage === 'offer';
  const isBlogOpen = staticPage === 'blog';
  const isMiniOpen = staticPage === 'mini' || staticPage === 'mini-max';
  const isCookiesOpen = staticPage === 'cookies';
  const isMiniPath = window.location.pathname.replace(/\/+$/, '') === '/mini1';
  const metrikaVirtualPath = getMetrikaVirtualPath(window.location.pathname, window.location.hash);
  const trackReading = Boolean(currentArticle) || isSafeCaseOpen || isPolicyOpen || isPrivacyOpen || isClientConsentOpen || isAdvertisingConsentOpen || isOfferOpen || isCookiesOpen;

  return (
    <div className="min-h-screen w-full overflow-x-clip transition-colors duration-300">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 dark:opacity-20">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      </div>

      {!isMiniOpen && <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
      <MetrikaTracker virtualPath={metrikaVirtualPath} trackReading={trackReading} />
      <main className="relative z-10">
        {isPolicyOpen ? (
          <PolicyPage onBack={goBack} />
        ) : isPrivacyOpen ? (
          <PrivacyPage onBack={goBack} />
        ) : isClientConsentOpen ? (
          <ClientDataConsentPage onBack={goBack} />
        ) : isAdvertisingConsentOpen ? (
          <AdvertisingConsentPage onBack={goBack} />
        ) : isOfferOpen ? (
          <OfferPage onBack={goBack} />
        ) : isCookiesOpen ? (
          <CookiesPage onBack={goBack} />
        ) : isSafeCaseOpen ? (
          <SafeCaseLanding onBack={goBack} relatedArticles={markdownArticles} />
        ) : isMiniOpen ? (
          <MiniLanding ctaChannel={staticPage === 'mini-max' ? 'max' : 'telegram'} />
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
      {!isMiniOpen && <Footer compact={isMiniPath} />}
      <CookieBanner />
    </div>
  );
};

export default App;
