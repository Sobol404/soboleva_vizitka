import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { SafeCase } from './components/SafeCase';
import { Socials } from './components/Socials';
import { Services } from './components/Services';
import { Reviews } from './components/Reviews';
import { Guarantees } from './components/Guarantees';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { VisaSlider } from './components/VisaSlider';
import { ArticlePage } from './components/ArticlePage';
import { ArticleData } from './articles/types';
import { Section } from './components/ui/Section';
import { ChevronRight, ArrowRight, Calendar } from 'lucide-react';
import { BlogSlider } from './components/BlogSlider';

// Пример данных первой статьи (тестовый реестр)
const ARTICLE_REGISTRY: Record<string, ArticleData> = {
  'kak-poluchit-vizu-2024': {
    id: 'kak-poluchit-vizu-2024',
    title: 'Как получить визу США в 2024 году: Полный гид',
    description: 'Пошаговая инструкция по получению визы B1/B2 в текущих реалиях.',
    date: '15 Октября 2023',
    author: 'Safe Visa',
    mainImage: 'https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/EVy7zU2StUSPfvcr_UZ_3g.webp',
    blocks: [
      { type: 'text', content: 'Ситуация с выдачей виз США постоянно меняется, но метод Safe Case остается стабильно эффективным. В этой статье мы разберем основные шаги.' },
      { type: 'heading', content: 'Шаг 1: Выбор посольства' },
      { type: 'text', content: 'Сейчас важно учитывать очереди и наличие русскоговорящих офицеров. Популярные направления: Казахстан, Сербия, Армения.' },
      { type: 'image', src: 'https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/P61Gts5iKUyEkT7qAHHOEw.webp', alt: 'Пример заполненной анкеты' },
      { type: 'heading', content: 'Шаг 2: Заполнение анкеты DS-160' },
      { type: 'text', content: 'Это самый важный этап. Любая ошибка может привести к отказу. Вот примеры того, как выглядят одобренные кейсы:' },
      { type: 'slider', images: [
        'https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/19m-vSpiK0K4Mw6Fug0XEw.webp',
        'https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/7GbeWqFRoki9bxqd88iT1A.webp',
        'https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/BxuwUkCT-UiukYeVEqR-Yw.webp'
      ]}
    ]
  },
  'kak-poluchit-vizu-posle-otkaza-2026': {
    id: 'kak-poluchit-vizu-posle-otkaza-2026',
    title: 'Как получить визу после отказа в 2026',
    description: 'Разбираем основные причины отказов и как их исправить для успешной переподачи.',
    date: '10 Января 2026',
    author: 'Safe Visa',
    mainImage: 'https://picsum.photos/seed/visa1/800/600',
    blocks: [
      { type: 'text', content: 'Отказ в визе — это не приговор. Главное — правильно проанализировать причины и подготовиться к следующему собеседованию.' }
    ]
  },
  'visa-canada-2026': {
    id: 'visa-canada-2026',
    title: 'Гайд: Как получить визу в Канаду в 2026 году',
    description: 'Пошаговое руководство по оформлению канадской визы.',
    date: '15 Января 2026',
    author: 'Safe Visa',
    mainImage: 'https://picsum.photos/seed/canada/800/600',
    blocks: [
      { type: 'text', content: 'Процесс получения визы в Канаду имеет свои особенности. В этой статье мы подробно разберем каждый этап.' }
    ]
  },
  'visa-uk-2026': {
    id: 'visa-uk-2026',
    title: 'Гайд: Как получить визу в Великобританию в 2026 году',
    description: 'Все, что нужно знать для успешного получения британской визы.',
    date: '20 Января 2026',
    author: 'Safe Visa',
    mainImage: 'https://picsum.photos/seed/uk/800/600',
    blocks: [
      { type: 'text', content: 'Британская виза требует тщательной подготовки документов. Узнайте, как избежать частых ошибок.' }
    ]
  },
  'visa-australia-2026': {
    id: 'visa-australia-2026',
    title: 'Гайд: Как получить визу в Австралию в 2026 году',
    description: 'Инструкция по оформлению визы на зеленый континент.',
    date: '25 Января 2026',
    author: 'Safe Visa',
    mainImage: 'https://picsum.photos/seed/australia/800/600',
    blocks: [
      { type: 'text', content: 'Австралия привлекает многих, но визовый процесс может показаться сложным. Мы поможем разобраться.' }
    ]
  },
  'visa-new-zealand-2026': {
    id: 'visa-new-zealand-2026',
    title: 'Гайд: Как получить визу в Новую Зеландию в 2026 году',
    description: 'Полное руководство по визе в Новую Зеландию.',
    date: '30 Января 2026',
    author: 'Safe Visa',
    mainImage: 'https://picsum.photos/seed/nz/800/600',
    blocks: [
      { type: 'text', content: 'Мечтаете о Новой Зеландии? Начните с правильного оформления визы.' }
    ]
  }
};

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  const [currentArticle, setCurrentArticle] = useState<ArticleData | null>(null);

  // Нативный роутинг через hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/article/', '');
      if (hash && ARTICLE_REGISTRY[hash]) {
        setCurrentArticle(ARTICLE_REGISTRY[hash]);
      } else {
        setCurrentArticle(null);
        document.title = 'Эксперт по визам США | Safe Case';
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Проверка при загрузке

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const goBack = () => { window.location.hash = ''; };

  return (
    <div className="min-h-screen w-full overflow-x-hidden transition-colors duration-300">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 dark:opacity-20">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="relative z-10">
        {currentArticle ? (
          <ArticlePage data={currentArticle} onBack={goBack} />
        ) : (
          <>
            <Hero />
            <About />
            <VisaSlider />
            <SafeCase />
            <Socials />
            
            {/* Блог / Статьи */}
            <Section id="blog">
               <div className="bg-dark rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none"></div>
                 <div className="text-center mb-12 relative z-10">
                    <h2 className="text-4xl md:text-6xl font-bold text-white uppercase">Блог</h2>
                    <p className="mt-4 text-slate-300 text-xl md:text-3xl">
                      Полезные статьи и разборы актуальных новостей
                    </p>
                 </div>
                 <div className="relative z-10">
                   <BlogSlider articles={Object.values(ARTICLE_REGISTRY)} darkContainer />
                 </div>
               </div>
            </Section>

            <Services />
            <Reviews />
            <Guarantees />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;