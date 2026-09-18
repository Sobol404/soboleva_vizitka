import React from 'react';
import { links } from '../config/links';

interface ArticleAuthorCardProps {
  className?: string;
}

export const ArticleAuthorCard: React.FC<ArticleAuthorCardProps> = ({ className = '' }) => (
  <section className={`rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-dark-card ${className}`} aria-label="Об авторе статьи">
    <div className="flex items-center gap-3">
      <img
        src="/media/pages/safe-case/irina-avatar-flag.png"
        alt="Ирина Соболева"
        className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-accent/20"
      />
      <div>
        <p className="text-lg font-bold leading-tight text-dark dark:text-white">Ирина Соболева</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Основательница агентства Safe Visa</p>
      </div>
    </div>

    <p className="mt-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
      600+ успешных кейсов, 1 000+ консультаций и клиенты из 12 стран. Помогаю выстроить сильную и честную стратегию получения визы США.
    </p>
    <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
      В <a href={links.telegram.channel} target="_blank" rel="noopener noreferrer" className="font-bold text-dark underline decoration-accent underline-offset-4 transition-colors hover:text-accent dark:text-white">Telegram-канале о визах</a> разбираю отказы, подготовку к интервью и изменения, которые действительно влияют на поездку. Подписывайтесь, чтобы не пропускать разборы.
    </p>
  </section>
);
