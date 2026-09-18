import React, { useEffect, useRef, useState } from 'react';
import { List, X } from 'lucide-react';

export interface DocumentTocItem {
  id: string;
  label: string;
}

export const scrollToDocumentSection = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return;

  const isDesktop = window.innerWidth >= 1024;
  const fixedHeaderOffset = isDesktop ? 112 : 104;
  const targetTop = element.getBoundingClientRect().top + window.scrollY - fixedHeaderOffset;

  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: 'smooth',
  });
};

interface DocumentTocProps {
  items: DocumentTocItem[];
  activeId: string;
  variant: 'desktop' | 'mobile';
  isOpen?: boolean;
  onToggle?: () => void;
  onNavigate: (id: string) => void;
  mobileWithTopButton?: boolean;
}

export const useActiveDocumentSection = (items: DocumentTocItem[]) => {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');

  useEffect(() => {
    if (!items.length) {
      setActiveId('');
      return;
    }

    const getElements = () => items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    const updateActiveSection = () => {
      const elements = getElements();
      if (!elements.length) return;

      const readingLine = window.innerWidth >= 1024 ? 132 : 164;
      const current = elements.reduce((selected, element) => {
        return element.getBoundingClientRect().top <= readingLine ? element.id : selected;
      }, items[0].id);

      setActiveId((previous) => previous === current ? previous : current);
    };

    let frame = 0;
    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    const observer = new IntersectionObserver(scheduleUpdate, {
      rootMargin: '-96px 0px -65% 0px',
      threshold: [0, 0.01, 1],
    });

    getElements().forEach((element) => observer.observe(element));

    updateActiveSection();
    const initialFrame = window.requestAnimationFrame(updateActiveSection);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    document.addEventListener('scroll', scheduleUpdate, { passive: true, capture: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(initialFrame);
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      document.removeEventListener('scroll', scheduleUpdate, true);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [items]);

  return activeId;
};

const TocList: React.FC<Pick<DocumentTocProps, 'items' | 'activeId' | 'onNavigate'>> = ({ items, activeId, onNavigate }) => (
  <nav aria-label="Содержание документа">
    <ol className="space-y-1">
      {items.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            onClick={() => onNavigate(item.id)}
            data-toc-id={item.id}
            aria-current={activeId === item.id ? 'location' : undefined}
            className={`relative w-full text-left outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent/30 ${
              activeId === item.id
                ? 'border-l-2 border-accent bg-accent/10 font-semibold text-accent'
                : 'border-l-2 border-transparent text-slate-500 hover:border-slate-300 hover:text-dark dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-white'
            }`}
          >
            <span className="block px-3 py-2 text-sm leading-snug">{item.label}</span>
          </button>
        </li>
      ))}
    </ol>
  </nav>
);

const scrollPanelToActive = (panel: HTMLElement | null, activeId: string, behavior: ScrollBehavior) => {
  if (!panel || !activeId) return;

  const activeButton = Array.from(panel.querySelectorAll<HTMLButtonElement>('[data-toc-id]'))
    .find((button) => button.dataset.tocId === activeId);

  if (!activeButton) return;

  const panelRect = panel.getBoundingClientRect();
  const buttonRect = activeButton.getBoundingClientRect();
  const isVisible = buttonRect.top >= panelRect.top + 8 && buttonRect.bottom <= panelRect.bottom - 8;

  if (isVisible) return;

  panel.scrollTo({
    top: panel.scrollTop + buttonRect.top - panelRect.top - (panel.clientHeight - buttonRect.height) / 2,
    behavior,
  });
};

export const DocumentToc: React.FC<DocumentTocProps> = ({
  items,
  activeId,
  variant,
  isOpen = false,
  onToggle,
  onNavigate,
  mobileWithTopButton = false,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = `document-toc-${variant}`;
  const titleId = `${panelId}-title`;
  const activeLabel = items.find((item) => item.id === activeId)?.label ?? items[0]?.label ?? '';

  useEffect(() => {
    if (!isOpen) return;
    const frame = window.requestAnimationFrame(() => scrollPanelToActive(panelRef.current, activeId, 'auto'));
    return () => window.cancelAnimationFrame(frame);
  }, [activeId, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onToggle?.();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onToggle]);

  if (variant === 'mobile') {
    return (
      <div className="lg:hidden">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className={`fixed bottom-5 z-40 flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-4 py-3 text-sm font-bold text-dark shadow-xl backdrop-blur-md transition-transform hover:-translate-y-0.5 dark:border-slate-700 dark:bg-dark-card/95 dark:text-white ${mobileWithTopButton ? 'right-[4.75rem]' : 'right-4'}`}
        >
          <List className="h-4 w-4 text-accent" />
          Содержание
        </button>

        {isOpen && (
          <>
            <button
              type="button"
              aria-label="Закрыть содержание"
              onClick={onToggle}
              className="fixed inset-0 z-50 bg-dark/35 backdrop-blur-[2px]"
            />
            <section
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="fixed inset-x-3 bottom-3 z-[60] flex max-h-[82vh] flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-dark-card"
            >
              <header className="border-b border-slate-200 px-5 py-4 dark:border-slate-700">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 id={titleId} className="text-xl font-bold text-dark dark:text-white">Содержание</h2>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">Сейчас: {activeLabel}</p>
                  </div>
                  <button
                    type="button"
                    onClick={onToggle}
                    aria-label="Закрыть содержание"
                    className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-dark dark:hover:bg-slate-800 dark:hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </header>
              <div ref={panelRef} className="min-h-0 overflow-y-auto overscroll-contain p-3">
                <TocList items={items} activeId={activeId} onNavigate={onNavigate} />
              </div>
            </section>
          </>
        )}
      </div>
    );
  }

  return (
    <aside
      id={panelId}
      aria-labelledby={titleId}
      className="hidden min-w-0 lg:sticky lg:top-28 lg:block lg:h-[calc(100vh-8rem)]"
    >
      <div className="flex h-full min-h-0 flex-col pl-2 xl:pl-4">
        <header className="shrink-0 pb-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">Содержание</p>
          <h2 id={titleId} className="sr-only">Содержание документа</h2>
        </header>
        <div ref={panelRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-2 [scrollbar-width:thin]">
          <TocList items={items} activeId={activeId} onNavigate={onNavigate} />
        </div>
      </div>
    </aside>
  );
};
