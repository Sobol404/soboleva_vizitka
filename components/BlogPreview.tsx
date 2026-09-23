import React from 'react';
import { ArrowRight, BookOpenText, CalendarDays, Flame } from 'lucide-react';
import { ArticleData } from '../articles/types';
import { Section } from './ui/Section';

interface BlogPreviewProps {
  articles: ArticleData[];
}

const formatDate = (date: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;

  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`));
};

export const BlogPreview: React.FC<BlogPreviewProps> = ({ articles }) => {
  const previewArticles = articles.slice(0, 2);

  return (
    <Section id="blog" className="py-10 md:py-14">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-dark-card sm:p-7 md:p-10">
        <div className="flex items-center gap-3 md:gap-4">
          <img
            src="/media/shared/irina-blog-avatar.png"
            alt="Ирина Соболева"
            className="h-11 w-11 rounded-full object-cover ring-2 ring-accent/20 md:h-14 md:w-14"
          />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Блог</p>
            <h2 className="mt-0.5 whitespace-nowrap text-xl font-bold text-dark dark:text-white sm:text-2xl md:text-4xl">Ира Соболева про визы</h2>
          </div>
        </div>

        <div className="mt-7 divide-y divide-slate-100 border-y border-slate-100 dark:divide-slate-800 dark:border-slate-800">
          {previewArticles.map((article) => (
            <a
              key={article.id}
              href={article.href || `/article/${article.id}`}
              className="group flex gap-3 py-5 first:pt-5 last:pb-5"
            >
              <BookOpenText className="mt-1 h-5 w-5 flex-shrink-0 text-accent" aria-hidden="true" />
              <div className="min-w-0">
                <h3 className="text-lg font-bold leading-snug text-dark transition-colors group-hover:text-accent dark:text-white md:text-xl">
                  {article.title}
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  {article.id === 'safe-case' && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-bold text-orange-600 dark:bg-orange-500/10 dark:text-orange-300">
                      <Flame className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                      Горячая тема
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4" aria-hidden="true" />
                    {formatDate(article.date)}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <a
          href="/blog"
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-dark transition-colors hover:border-accent hover:text-accent dark:border-slate-700 dark:text-white dark:hover:border-accent dark:hover:text-accent"
        >
          Читать все материалы
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </Section>
  );
};
