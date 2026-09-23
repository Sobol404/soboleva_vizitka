import React, { useMemo } from 'react';
import { ArrowLeft, ArrowUpRight, BookOpenText, CalendarDays, Send } from 'lucide-react';
import { ArticleData } from '../articles/types';

interface BlogPageProps {
  articles: ArticleData[];
  onBack: () => void;
}

interface BlogCardData {
  id: string;
  type: 'article' | 'telegram';
  title: string;
  description: string;
  date: string;
  image: string;
  href?: string;
}

const telegramDrafts: BlogCardData[] = [
  {
    id: 'telegram-draft-1',
    type: 'telegram',
    title: 'Пост 1',
    description: 'Короткий анонс будущего поста из Telegram — полезное наблюдение или разбор визовой ситуации.',
    date: 'Ссылка появится позже',
    image: '/media/shared/irina-video-preview-01.jpg',
  },
  {
    id: 'telegram-draft-2',
    type: 'telegram',
    title: 'Пост 2',
    description: 'Здесь будет название, краткое описание в две строки и прямая ссылка на пост в канале.',
    date: 'Ссылка появится позже',
    image: '/media/shared/irina-video-preview-02.jpg',
  },
];

const formatDate = (date: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;

  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`));
};

export const BlogPage: React.FC<BlogPageProps> = ({ articles, onBack }) => {
  const cards = useMemo<BlogCardData[]>(() => {
    const articleCards = [...articles]
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((article) => ({
        id: article.id,
        type: 'article' as const,
        title: article.title,
        description: article.description,
        date: formatDate(article.date),
        image: article.mainImage,
        href: article.href || `/article/${article.id}`,
      }));

    return [...articleCards, ...telegramDrafts];
  }, [articles]);

  const renderCardContent = (card: BlogCardData) => (
    <>
      <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={card.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          {card.type === 'article' ? (
            <BookOpenText className="h-4 w-4 text-accent" aria-hidden="true" />
          ) : (
            <Send className="h-4 w-4 text-[#229ED9]" aria-hidden="true" />
          )}
          <span>{card.type === 'article' ? 'Статья' : 'Telegram'}</span>
          <span aria-hidden="true">·</span>
          <span className="min-w-0 truncate">{card.date}</span>
        </div>
        <h2 className="mt-3 text-xl font-bold leading-snug text-dark transition-colors group-hover:text-accent dark:text-white">
          {card.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {card.description}
        </p>
        <div className="mt-auto flex items-center gap-2 pt-5 text-sm font-bold text-accent">
          {card.type === 'article' ? 'Читать материал' : 'Ссылка скоро'}
          {card.type === 'article' && <ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-light pt-24 text-dark dark:bg-dark-deep dark:text-white md:pt-28">
      <main className="container mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-accent dark:text-slate-400 dark:hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          На главную
        </button>

        <section className="mt-6 rounded-[1.75rem] border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-dark-card sm:p-8 md:mt-8 md:rounded-[2rem] md:p-12">
          <div className="flex items-center gap-3 sm:gap-4">
            <img
              src="/media/shared/irina-blog-avatar.png"
              alt="Ирина Соболева"
              className="h-12 w-12 flex-shrink-0 rounded-full object-cover ring-2 ring-accent/20 sm:h-14 sm:w-14 md:h-16 md:w-16"
            />
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent sm:text-xs">Блог</p>
              <h1 className="mt-1 max-w-4xl text-2xl font-bold leading-[1.08] sm:text-3xl md:text-5xl lg:text-6xl">Ира Соболева про визы</h1>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base md:mt-7 md:text-lg">
            Понятно и бережно о визах США: подготовке к интервью, сложных ситуациях, документах и новостях, которые действительно влияют на поездку.
          </p>
        </section>

        <section className="mt-8">
          <div className="mb-5 flex items-end justify-between gap-4 md:mb-7">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Блог и канал</p>
              <h2 className="mt-1 text-2xl font-bold sm:text-3xl md:text-4xl">Все материалы</h2>
            </div>
            <div className="hidden items-center gap-2 text-sm text-slate-500 dark:text-slate-400 sm:flex">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              Статьи и посты
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => card.href ? (
              <a
                key={card.id}
                href={card.href}
                className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-dark-card"
              >
                {renderCardContent(card)}
              </a>
            ) : (
              <article
                key={card.id}
                className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-dark-card"
              >
                {renderCardContent(card)}
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
