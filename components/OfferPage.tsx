import React, { useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, FileCheck2, Mail, Scale, ShieldCheck } from 'lucide-react';
import offerMarkdown from '../content/legal/oferta.md?raw';
import { DocumentToc, DocumentTocItem, scrollToDocumentSection, useActiveDocumentSection } from './DocumentToc';
import { LegalLinks } from './LegalLinks';

interface OfferPageProps {
  onBack: () => void;
}

const offerBody = offerMarkdown.replace(/^# [^\n]+\n## [^\n]+\n\n/, '');

const makeHeadingId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^а-яёa-z0-9 ]/gi, '')
    .trim()
    .replace(/\s+/g, '-') || undefined;

const headingId = (children: React.ReactNode) => makeHeadingId(String(children));

export const OfferPage: React.FC<OfferPageProps> = ({ onBack }) => {
  const [tocOpen, setTocOpen] = useState(false);
  const tocItems = useMemo<DocumentTocItem[]>(
    () => Array.from(offerBody.matchAll(/^## (.+)$/gm), ([, label]) => ({ id: makeHeadingId(label), label: label.trim() })).filter((item): item is DocumentTocItem => Boolean(item.id)),
    [],
  );
  const activeId = useActiveDocumentSection(tocItems);
  const navigateTo = (id: string) => {
    setTocOpen(false);
    scrollToDocumentSection(id);
  };

  useEffect(() => {
    document.title = 'Публичная оферта | Safe Visa';
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="px-4 pb-20 pt-28 md:px-6 md:pb-28 md:pt-32">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-dark px-6 py-10 text-white shadow-2xl md:px-12 md:py-14">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative z-10 max-w-4xl">
            <button
              type="button"
              onClick={onBack}
              className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Вернуться на главную
            </button>
            <div className="mb-5 flex items-center gap-3 text-primary">
              <Scale className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Юридическая информация</span>
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">Публичная оферта</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
              Условия информационно-консультационного сопровождения при обращении за визой.
              Решение о выдаче визы принимает только уполномоченный орган иностранного государства.
            </p>
            <div className="mt-8 grid gap-3 text-sm sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <FileCheck2 className="mb-3 h-5 w-5 text-primary" />
                Редакция от 17.09.2026
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <ShieldCheck className="mb-3 h-5 w-5 text-primary" />
                Без гарантии решения консульства
              </div>
              <a href="mailto:Irina.sapozhkova@gmail.com" className="rounded-2xl border border-white/10 bg-white/10 p-4 transition-colors hover:bg-white/15">
                <Mail className="mb-3 h-5 w-5 text-primary" />
                Написать по вопросам
              </a>
            </div>
          </div>
      </div>

        <DocumentToc
          variant="mobile"
          items={tocItems}
          activeId={activeId}
          isOpen={tocOpen}
          onToggle={() => setTocOpen((open) => !open)}
          onNavigate={navigateTo}
        />

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] xl:gap-14">
          <article className="min-w-0 rounded-[2rem] border border-slate-200 bg-white px-5 py-8 shadow-xl dark:border-slate-700 dark:bg-dark-card sm:px-8 md:px-12 md:py-12">
            <div className="offer-markdown text-base leading-relaxed text-slate-700 dark:text-slate-200">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => <h2 id={headingId(children)} className="mt-12 scroll-mt-40 border-t border-slate-200 pt-8 text-2xl font-bold text-dark first:mt-0 first:border-0 first:pt-0 dark:border-slate-700 dark:text-white md:text-3xl lg:scroll-mt-28">{children}</h2>,
                  h3: ({ children }) => <h3 id={headingId(children)} className="mt-8 text-xl font-bold text-dark dark:text-white md:text-2xl">{children}</h3>,
                  p: ({ children }) => <p className="my-4">{children}</p>,
                  ul: ({ children }) => <ul className="my-5 list-disc space-y-2 pl-6">{children}</ul>,
                  ol: ({ children }) => <ol className="my-5 list-decimal space-y-2 pl-6">{children}</ol>,
                  li: ({ children }) => <li className="pl-1">{children}</li>,
                  strong: ({ children }) => <strong className="font-bold text-dark dark:text-white">{children}</strong>,
                  a: ({ href, children }) => <a href={href} className="text-accent underline underline-offset-4 hover:text-accent-hover">{children}</a>,
                }}
              >
                {offerBody}
              </ReactMarkdown>

              <footer className="mt-12 border-t border-slate-200 pt-6 text-sm italic leading-relaxed text-slate-500 dark:border-slate-700 dark:text-slate-400">
                <p>
                  Примечание: повторное сопровождение предусмотрено только отдельными тарифами и не является обещанием
                  выдачи визы. При отказе клиента учитываются фактически оказанные услуги и подтверждённые прямые расходы.
                  Цена сопровождения ребёнка указана за одного заявителя в возрасте до 16 лет.
                </p>
                <p className="mt-3">
                  Состав выбранного тарифа и возможные дополнительные расходы можно уточнить до оплаты по адресу{' '}
                  <a href="mailto:Irina.sapozhkova@gmail.com" className="text-accent underline underline-offset-4 hover:text-accent-hover">
                    Irina.sapozhkova@gmail.com
                  </a>.
                </p>
              </footer>
              <div className="mt-8 not-italic">
                <LegalLinks />
              </div>
            </div>
          </article>

          <DocumentToc variant="desktop" items={tocItems} activeId={activeId} onNavigate={navigateTo} />
        </div>
      </div>
    </section>
  );
};
