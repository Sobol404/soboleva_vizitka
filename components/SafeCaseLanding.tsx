import React, { useEffect, useMemo, useState } from 'react';
import { ArrowUp, ArrowUpRight, BookOpenText, ChevronRight } from 'lucide-react';
import { ArticleData } from '../articles/types';
import safeCaseSource from '../content/safe-case/source.html?raw';
import { DocumentToc, DocumentTocItem, scrollToDocumentSection, useActiveDocumentSection } from './DocumentToc';
import { ArticleAuthorCard } from './ArticleAuthorCard';

interface SafeCaseLandingProps {
  onBack: () => void;
  relatedArticles: ArticleData[];
}

const safeCaseTocItems: DocumentTocItem[] = [
  { id: 'safe-case-refusals', label: 'Почему визу дают не с первого раза' },
  { id: 'safe-case-myths', label: '6 мифов о визах США' },
  { id: 'safe-case-insights', label: 'Три инсайта о собеседовании' },
  { id: 'safe-case-formula', label: 'Формула одобрения Safe Case' },
  { id: 'safe-case-expertise', label: 'Почему мне можно доверять' },
  { id: 'safe-case-path', label: 'Путь к получению визы' },
  { id: 'safe-case-result', label: 'Что вы получаете' },
  { id: 'zayavka', label: 'Бесплатный разбор кейса' },
  { id: 'safe-case-guarantees', label: 'Честные гарантии' },
  { id: 'safe-case-cost', label: 'Сколько стоит отказ' },
  { id: 'safe-case-stories', label: 'Кейсы клиентов' },
];

const safeCaseImagePaths: Record<string, string> = {
  'assets/img/аватарка ира флаг.png': '/media/pages/safe-case/irina-avatar-flag.png',
  'assets/img/еще отзывы.jpeg': '/media/pages/safe-case/client-reviews-collage.jpeg',
  'assets/img/ленд виза картинка_safe case на доске.png': '/media/pages/safe-case/method-on-whiteboard.png',
  'assets/img/ленд виза картинка_Ира с визой в руке.jpeg': '/media/pages/safe-case/irina-with-visa.jpeg',
  'assets/img/ленд виза картинка_гарантии.jpeg': '/media/pages/safe-case/guarantees.jpeg',
  'assets/img/ленд виза картинка_кейсы.jpeg': '/media/pages/safe-case/success-cases.jpeg',
  'assets/img/ленд виза картинка_мифы.jpeg': '/media/pages/safe-case/visa-myths.jpeg',
  'assets/img/ленд виза картинка_отказ.jpeg': '/media/pages/safe-case/visa-refusal.jpeg',
  'assets/img/ленд виза картинка_оценка шансов.jpeg': '/media/pages/safe-case/chances-assessment.jpeg',
  'assets/img/ленд виза картинка_потрачено.jpeg': '/media/pages/safe-case/cost-of-refusal.jpeg',
  'assets/img/ленд виза картинка_превью safe case.jpeg': '/media/pages/safe-case/article-preview.jpeg',
  'assets/img/ленд виза картинка_путь 8 шагов.jpeg': '/media/pages/safe-case/eight-steps.jpeg',
  'assets/img/ленд виза картинка_темная сторона.jpeg': '/media/pages/safe-case/interview-risks.jpeg',
  'assets/img/матрешка.png': '/media/pages/safe-case/matryoshka.png',
  'assets/img/много виз 2.jpeg': '/media/pages/safe-case/client-visas-02.jpeg',
  'assets/img/много виз.jpeg': '/media/pages/safe-case/client-visas-01.jpeg',
  'assets/img/много отзывов.jpeg': '/media/pages/safe-case/client-reviews-overview.jpeg',
  'assets/img/отзыв на флаге_2.jpeg': '/media/pages/safe-case/client-review-flag-01.jpeg',
  'assets/img/очки.png': '/media/pages/safe-case/glasses.png',
  'assets/img/получили_визы.png': '/media/pages/safe-case/approved-visas.png',
};

const extractBlock = (source: string, pattern: RegExp, label: string) => {
  const match = source.match(pattern);
  if (!match?.[1]) throw new Error(`Не удалось извлечь ${label} из Safe Case`);
  return match[1];
};

const replaceSafeCaseImagePath = (sourcePath: string) => (
  Object.entries(safeCaseImagePaths).find(
    ([candidate]) => candidate.normalize('NFC') === sourcePath.normalize('NFC'),
  )?.[1] ?? sourcePath
);

export const SafeCaseLanding: React.FC<SafeCaseLandingProps> = ({ onBack, relatedArticles }) => {
  const [tocOpen, setTocOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const activeId = useActiveDocumentSection(safeCaseTocItems);
  const related = useMemo(() => relatedArticles.filter((article) => article.id !== 'safe-case').slice(0, 3), [relatedArticles]);
  const styles = useMemo(
    () => extractBlock(safeCaseSource, /<style>([\s\S]*?)<\/style>/i, 'стили')
      .replaceAll("'Inter'", "'Manrope'"),
    [],
  );

  const articleMarkup = useMemo(() => extractBlock(
    safeCaseSource,
    /(<article class="sv-art">[\s\S]*<\/article>)/i,
    'статью',
  ).replace(/assets\/img\/[^\"]+/g, replaceSafeCaseImagePath), []);

  useEffect(() => {
    document.title = 'Как 9 из 10 россиян получают визу США — метод Safe Case';
    window.scrollTo(0, 0);
    setTocOpen(false);
  }, []);

  useEffect(() => {
    const updateScrollTopVisibility = () => setShowScrollTop(window.scrollY > window.innerHeight);
    updateScrollTopVisibility();
    window.addEventListener('scroll', updateScrollTopVisibility, { passive: true });
    window.addEventListener('resize', updateScrollTopVisibility);
    return () => {
      window.removeEventListener('scroll', updateScrollTopVisibility);
      window.removeEventListener('resize', updateScrollTopVisibility);
    };
  }, []);

  useEffect(() => {
    const widgetHost = document.getElementById('xl-visa-quiz');
    if (!widgetHost || widgetHost.dataset.xlWidgetAttached === 'true') return;

    // Scripts inside dangerouslySetInnerHTML are not executed by React. Create
    // the vendor script in the real DOM so the existing XL widget can mount.
    widgetHost.dataset.xlWidgetAttached = 'true';
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('ao-number', '6861');
    script.setAttribute('ao-widget-id', '7-qbPVBPIkGlqauNKKCtrg');
    script.setAttribute('ao-domain', 'sobolevai.com');
    script.src = 'https://idx.xl.ru/site/widget/widget.min.js';
    widgetHost.replaceChildren(script);

    // XL normally receives its frame height from the embedded page. On a local
    // preview that message may be absent, which leaves a working quiz in a
    // zero-height iframe. A minimum height keeps it usable while allowing XL
    // to grow the frame later on a configured domain.
    const ensureFrameIsVisible = () => {
      const frame = widgetHost.querySelector('iframe');
      if (frame) frame.style.minHeight = '560px';
    };
    const observer = new MutationObserver(ensureFrameIsVisible);
    observer.observe(widgetHost, { childList: true });
    const fallbackTimer = window.setTimeout(ensureFrameIsVisible, 1_000);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallbackTimer);
    };
  }, [articleMarkup]);

  const handleArticleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const flipCard = target.closest<HTMLElement>('.flip');
    if (flipCard) {
      const isFlipped = flipCard.classList.toggle('is-flipped');
      flipCard.setAttribute('aria-expanded', String(isFlipped));
      return;
    }

    const anchor = target.closest<HTMLAnchorElement>('a[href="#zayavka"]');
    if (!anchor) return;

    event.preventDefault();
    document.getElementById('zayavka')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleArticleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    const target = event.target as HTMLElement;
    const flipCard = target.closest<HTMLElement>('.flip');
    if (!flipCard) return;

    event.preventDefault();
    const isFlipped = flipCard.classList.toggle('is-flipped');
    flipCard.setAttribute('aria-expanded', String(isFlipped));
  };

  const navigateTo = (id: string) => {
    setTocOpen(false);
    scrollToDocumentSection(id);
  };

  return (
    <div className="min-h-screen bg-[#F4F7F9] pt-20 dark:bg-[#101827]">
      <style>{styles}</style>
      <nav aria-label="Хлебные крошки" className="mx-auto flex max-w-[1240px] items-center gap-2 overflow-hidden px-4 py-5 text-sm text-slate-500 dark:text-slate-400">
        <button
          type="button"
          onClick={onBack}
          className="shrink-0 font-semibold transition-colors hover:text-accent"
        >
          Главная
        </button>
        <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" aria-hidden="true" />
        <a href="/#/blog" className="shrink-0 font-semibold transition-colors hover:text-accent">Блог</a>
        <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" aria-hidden="true" />
        <span className="truncate text-slate-700 dark:text-slate-200">Метод «Safe Case»</span>
      </nav>

      <DocumentToc
        variant="mobile"
        items={safeCaseTocItems}
        activeId={activeId}
        isOpen={tocOpen}
        onToggle={() => setTocOpen((open) => !open)}
        onNavigate={navigateTo}
        mobileWithTopButton
      />

      <button
        type="button"
        aria-label="Прокрутить наверх"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-5 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-xl transition-all duration-300 hover:bg-[#1D4ED8] lg:bottom-6 lg:right-6 ${showScrollTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-10 opacity-0'}`}
      >
        <ArrowUp className="h-5 w-5" aria-hidden="true" />
      </button>

      <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[minmax(0,920px)_16rem] lg:px-4 xl:gap-14">
        <div className="min-w-0">
          <div onClick={handleArticleClick} onKeyDown={handleArticleKeyDown} dangerouslySetInnerHTML={{ __html: articleMarkup }} />

          <div aria-labelledby="related-safe-case-heading" className="mx-4 my-12 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-dark-card sm:p-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Блог Safe Visa</p>
                <h2 id="related-safe-case-heading" className="mt-1 text-2xl font-bold text-dark dark:text-white sm:text-3xl">Похожие статьи</h2>
              </div>
              <a href="/#/blog" className="hidden items-center gap-1 text-sm font-bold text-accent sm:inline-flex">
                Все статьи <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {related.map((article) => (
                <a
                  key={article.id}
                  href={`/#/article/${article.id}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img src={article.mainImage} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <BookOpenText className="h-4 w-4 text-accent" aria-hidden="true" />
                      Статья · {article.date}
                    </div>
                    <h3 className="mt-3 text-lg font-bold leading-snug text-dark transition-colors group-hover:text-accent dark:text-white">{article.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{article.description}</p>
                  </div>
                </a>
              ))}
            </div>

            <a href="/#/blog" className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-accent sm:hidden">
              Все статьи <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="hidden lg:block">
          <ArticleAuthorCard className="mb-8" />
          <DocumentToc variant="desktop" items={safeCaseTocItems} activeId={activeId} onNavigate={navigateTo} />
        </div>
      </div>
    </div>
  );
};
