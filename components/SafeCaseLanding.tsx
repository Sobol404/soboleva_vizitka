import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ArrowUp, ChevronRight } from 'lucide-react';
import safeCaseSource from '../content/safe-case/source.html?raw';
import { DocumentToc, DocumentTocItem, scrollToDocumentSection, useActiveDocumentSection } from './DocumentToc';
import { ArticleAuthorCard } from './ArticleAuthorCard';

interface SafeCaseLandingProps {
  onBack: () => void;
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

const safeCaseImageDimensions: Record<string, [number, number]> = {
  'article-preview': [1672, 941],
  'irina-avatar-flag': [1254, 1254],
  'client-reviews-overview': [2048, 1365],
  'visa-refusal': [1672, 941],
  'approved-visas': [1920, 1920],
  'visa-myths': [1672, 941],
  'interview-risks': [1672, 941],
  matryoshka: [1536, 1024],
  glasses: [1536, 1024],
  'client-review-flag-01': [1920, 1080],
  'method-on-whiteboard': [1660, 947],
  'client-visas-01': [2048, 1152],
  'client-reviews-collage': [2048, 2048],
  'irina-with-visa': [1254, 1254],
  'eight-steps': [1672, 941],
  'client-visas-02': [2048, 2048],
  'chances-assessment': [1672, 941],
  guarantees: [1672, 941],
  'cost-of-refusal': [1280, 720],
  'success-cases': [1672, 941],
};

const safeCaseTransparentImages = new Set(['approved-visas', 'glasses', 'matryoshka']);

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

const addResponsiveSafeCaseImages = (markup: string) => markup.replace(
  /<img([^>]*?)src="(\/media\/pages\/safe-case\/([^"]+)\.(?:jpeg|png))"([^>]*)>/g,
  (_match, beforeSrc: string, _sourcePath: string, imageName: string, afterSrc: string) => {
    const [width, height] = safeCaseImageDimensions[imageName] ?? [1200, 800];
    const fallbackType = safeCaseTransparentImages.has(imageName) ? 'png' : 'jpg';
    const basePath = `/media/pages/safe-case/${imageName}`;
    const sizes = imageName === 'irina-avatar-flag'
      ? '60px'
      : imageName === 'matryoshka' || imageName === 'glasses'
        ? '(max-width: 768px) 32vw, 220px'
        : '(max-width: 768px) calc(100vw - 40px), 872px';
    const eagerAttributes = imageName === 'article-preview'
      ? 'loading="eager" fetchpriority="high"'
      : 'loading="lazy"';
    const webpSet = [480, 800, 1200].map((size) => `${basePath}-${size}.webp ${size}w`).join(', ');
    const fallbackSet = [480, 800, 1200].map((size) => `${basePath}-${size}.${fallbackType} ${size}w`).join(', ');
    const editorialPicture = !['irina-avatar-flag', 'matryoshka', 'glasses'].includes(imageName);

    return `<picture class="responsive-picture${editorialPicture ? ' editorial-picture' : ''}"><source type="image/webp" srcset="${webpSet}" sizes="${sizes}"><img${beforeSrc}src="${basePath}-1200.${fallbackType}" srcset="${fallbackSet}" sizes="${sizes}" width="${width}" height="${height}" ${eagerAttributes} decoding="async"${afterSrc}></picture>`;
  },
);

export const SafeCaseLanding: React.FC<SafeCaseLandingProps> = ({ onBack }) => {
  const [tocOpen, setTocOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const articleHostRef = useRef<HTMLDivElement>(null);
  const widgetMutationObserverRef = useRef<MutationObserver | null>(null);
  const widgetFallbackTimerRef = useRef<number | null>(null);
  const activeId = useActiveDocumentSection(safeCaseTocItems);
  const styles = useMemo(
    () => extractBlock(safeCaseSource, /<style>([\s\S]*?)<\/style>/i, 'стили')
      .replaceAll("'Inter'", "'Manrope'")
      .replace(
        '*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}',
        '.sv-art,.sv-art *,.sv-art *::before,.sv-art *::after{box-sizing:border-box;margin:0;padding:0;}',
      )
      .replace(':root{', '.sv-art{')
      .replace(
        "html,body{background:var(--surface-page);font-family:'Manrope',system-ui,sans-serif;color:var(--brand-slate);line-height:1.6;}",
        ".sv-art{font-family:'Manrope',system-ui,sans-serif;color:var(--brand-slate);line-height:1.6;}",
      )
      .concat(`
        .responsive-picture{display:contents;}
        #xl-visa-quiz{min-height:380px !important;}
        #xl-visa-quiz iframe{min-height:380px !important;}
        .sv-art .sv-btn{width:min(100%,366px)!important;max-width:366px!important;min-height:56px!important;padding:0 24px!important;font-size:1rem!important;border-radius:9999px!important;}
        .sv-art .sv-btn-wrap{padding-left:0!important;padding-right:0!important;}
        .sv-art :is(.glass-quote,.bullet-item,.num-item,.author-quote,.myth-card,.step-card,.step-result,.stat-tile,.results-dark,.sv-acc,.offer-frame,.quiz-shell,.quiz-warning,.section-preview,.inline-section-preview,.blue-bullet,.guarantee-item,.loss-card,.choice-no,.choice-yes,.red-table,.story-quote,.dark-guarantee,.cta-disclaimer,.warn-box,.final-cta,.flip,.flip-face,[style*="border-radius:12px"],[style*="border-radius:14px"],[style*="border-radius:16px"],[style*="border-radius:18px"],[style*="border-radius:20px"],[style*="border-radius:22px"],[style*="border-radius:28px"]){border-radius:20px!important;}
        .sv-art img:not([style*="border-radius:50%"]){border-radius:20px!important;}
        .sv-art .author-avatar,.sv-art .author-avatar img,.sv-art .sv-btn{border-radius:9999px!important;}
        .sv-art .final-cta{overflow:hidden;margin-bottom:40px!important;}
        .sv-art .steps-grid{display:block;}
        .sv-art .step-card{position:sticky;top:76px;margin-bottom:20px;}
        .sv-art .step-card:nth-child(1){z-index:1}.sv-art .step-card:nth-child(2){z-index:2}.sv-art .step-card:nth-child(3){z-index:3}.sv-art .step-card:nth-child(4){z-index:4}.sv-art .step-card:nth-child(5){z-index:5}.sv-art .step-card:nth-child(6){z-index:6}.sv-art .step-card:nth-child(7){z-index:7}.sv-art .step-card:nth-child(8){z-index:8}
        @media(max-width:640px){
          .sv-art .step-card{top:60px;}
          .sv-art .guarantee-clarification{margin-top:-30px!important;margin-bottom:-60px!important;}
          .sv-art .editorial-picture img,.sv-art div:has(> .editorial-picture){border-radius:0!important;}
        }
        #xl-visa-quiz:not([data-xl-widget-attached="true"]){
          border:1px solid rgba(148,163,184,.24);
          border-radius:24px;
          background:linear-gradient(110deg,rgba(226,232,240,.45) 8%,rgba(248,250,252,.9) 18%,rgba(226,232,240,.45) 33%);
          background-size:200% 100%;
          animation:quiz-placeholder 1.8s linear infinite;
        }
        @keyframes quiz-placeholder{to{background-position-x:-200%;}}
      `),
    [],
  );

  const articleMarkup = useMemo(() => addResponsiveSafeCaseImages(extractBlock(
    safeCaseSource,
    /(<article class="sv-art">[\s\S]*<\/article>)/i,
    'статью',
  ).replace(/assets\/img\/[^\"]+/g, replaceSafeCaseImagePath)), []);

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

  // Keep the imported article DOM outside React's reconciliation. The XL
  // script replaces its mount node with an iframe; reapplying innerHTML on a
  // TOC state update would otherwise remove the live quiz from the page.
  useLayoutEffect(() => {
    const articleHost = articleHostRef.current;
    if (!articleHost || articleHost.innerHTML === articleMarkup) return;
    articleHost.innerHTML = articleMarkup;
  }, [articleMarkup]);

  useEffect(() => {
    const results = articleHostRef.current?.querySelector<HTMLElement>('.results-dark');
    const values = Array.from(results?.querySelectorAll<HTMLElement>('[data-count-to]') ?? []);
    if (!results || !values.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      const start = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - start) / 1200, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        values.forEach((element) => {
          const target = Number(element.dataset.countTo);
          element.textContent = `${Math.round(target * eased)}${element.dataset.countSuffix ?? ''}`;
        });
        if (progress < 1) frame = window.requestAnimationFrame(animate);
      };
      frame = window.requestAnimationFrame(animate);
    }, { threshold: 0.3 });

    observer.observe(results);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [articleMarkup]);

  const loadQuizWidget = useCallback(() => {
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
      const frame = widgetHost.querySelector<HTMLIFrameElement>('iframe');
      if (frame) {
        frame.style.minHeight = '380px';
        frame.title = 'Квиз для бесплатного разбора визового кейса';
      }
    };
    widgetMutationObserverRef.current = new MutationObserver(ensureFrameIsVisible);
    widgetMutationObserverRef.current.observe(widgetHost, { childList: true });
    widgetFallbackTimerRef.current = window.setTimeout(ensureFrameIsVisible, 1_000);
  }, []);

  useEffect(() => {
    const widgetHost = document.getElementById('xl-visa-quiz');
    if (!widgetHost) return;

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      loadQuizWidget();
      observer.disconnect();
    }, { rootMargin: '1000px 0px' });
    observer.observe(widgetHost);

    return () => {
      observer.disconnect();
      widgetMutationObserverRef.current?.disconnect();
      widgetMutationObserverRef.current = null;
      if (widgetFallbackTimerRef.current !== null) window.clearTimeout(widgetFallbackTimerRef.current);
      widgetFallbackTimerRef.current = null;
    };
  }, [articleMarkup, loadQuizWidget]);

  const handleArticleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const flipCard = target.closest<HTMLElement>('.flip');
    if (flipCard) {
      const isFlipped = flipCard.classList.toggle('is-flipped');
      flipCard.setAttribute('aria-expanded', String(isFlipped));
      return;
    }

    const anchor = target.closest<HTMLAnchorElement>('a[data-scroll-target="zayavka"]');
    if (!anchor) return;

    event.preventDefault();
    loadQuizWidget();
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
    <div className="min-h-screen bg-[#F4F7F9] pt-12 dark:bg-[#101827]">
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
        <a href="/blog" className="shrink-0 font-semibold transition-colors hover:text-accent">Блог</a>
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
        className={`fixed bottom-5 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#324F5C] text-white shadow-xl transition-all duration-300 hover:bg-[#263F49] lg:bottom-6 lg:right-6 ${showScrollTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-10 opacity-0'}`}
      >
        <ArrowUp className="h-5 w-5" aria-hidden="true" />
      </button>

      <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[minmax(0,920px)_16rem] lg:px-4 xl:gap-14">
        <div className="min-w-0">
          <div ref={articleHostRef} onClick={handleArticleClick} onKeyDown={handleArticleKeyDown} />

        </div>

        <div className="hidden lg:block">
          <ArticleAuthorCard className="mb-8" />
          <DocumentToc variant="desktop" items={safeCaseTocItems} activeId={activeId} onNavigate={navigateTo} />
        </div>
      </div>
    </div>
  );
};
