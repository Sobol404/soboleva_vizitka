import React, { ReactNode, useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { DocumentToc, DocumentTocItem, scrollToDocumentSection, useActiveDocumentSection } from './DocumentToc';
import { LegalLinks } from './LegalLinks';

interface LegalDocumentPageProps {
  children: ReactNode;
  icon: ReactNode;
  onBack: () => void;
  title: string;
  browserTitle: string;
  updatedAt: string;
  tocItems: DocumentTocItem[];
}

export const LegalDocumentPage: React.FC<LegalDocumentPageProps> = ({
  children,
  icon,
  onBack,
  title,
  browserTitle,
  updatedAt,
  tocItems,
}) => {
  const [tocOpen, setTocOpen] = useState(false);
  const activeId = useActiveDocumentSection(tocItems);
  const navigateTo = (id: string) => {
    setTocOpen(false);
    scrollToDocumentSection(id);
  };

  useEffect(() => {
    document.title = browserTitle;
    window.scrollTo(0, 0);
  }, [browserTitle]);

  return (
    <section className="px-4 pb-16 pt-28 md:px-6 md:pb-24 md:pt-32">
      <div className="mx-auto max-w-7xl">
        <DocumentToc
          variant="mobile"
          items={tocItems}
          activeId={activeId}
          isOpen={tocOpen}
          onToggle={() => setTocOpen((open) => !open)}
          onNavigate={navigateTo}
        />

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] xl:gap-14">
          <article className="min-w-0 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-dark-card md:rounded-[2.5rem]">
            <header className="bg-dark px-5 py-8 text-white sm:px-8 md:px-12 md:py-12">
              <button
                type="button"
                onClick={onBack}
                className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Вернуться на главную
              </button>
              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-2xl bg-white/10 p-3 text-primary">{icon}</div>
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">Юридическая информация</p>
                  <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">{title}</h1>
                  <p className="mt-4 text-sm text-slate-300">Последнее обновление: {updatedAt}</p>
                </div>
              </div>
            </header>

            <div className="space-y-8 px-5 py-8 text-base leading-relaxed text-slate-700 dark:text-slate-200 sm:px-8 md:px-12 md:py-12">
              {children}
              <LegalLinks />
            </div>
          </article>

          <DocumentToc variant="desktop" items={tocItems} activeId={activeId} onNavigate={navigateTo} />
        </div>
      </div>
    </section>
  );
};
