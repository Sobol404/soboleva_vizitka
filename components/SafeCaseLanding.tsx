import React, { useEffect, useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import safeCaseSource from '../content/safe-case/source.html?raw';

interface SafeCaseLandingProps {
  onBack: () => void;
}

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

export const SafeCaseLanding: React.FC<SafeCaseLandingProps> = ({ onBack }) => {
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
    const anchor = target.closest<HTMLAnchorElement>('a[href="#zayavka"]');
    if (!anchor) return;

    event.preventDefault();
    document.getElementById('zayavka')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#F4F7F9] pt-20">
      <style>{styles}</style>
      <div className="mx-auto max-w-[920px] px-4 py-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm transition hover:text-accent hover:shadow-md"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад к главной
        </button>
      </div>
      <div onClick={handleArticleClick} dangerouslySetInnerHTML={{ __html: articleMarkup }} />
    </div>
  );
};
