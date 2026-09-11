import React, { useEffect, useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import safeCaseSource from '../content/safe-case/source.html?raw';

interface SafeCaseLandingProps {
  onBack: () => void;
}

const extractBlock = (source: string, pattern: RegExp, label: string) => {
  const match = source.match(pattern);
  if (!match?.[1]) throw new Error(`Не удалось извлечь ${label} из Safe Case`);
  return match[1];
};

export const SafeCaseLanding: React.FC<SafeCaseLandingProps> = ({ onBack }) => {
  const styles = useMemo(
    () => extractBlock(safeCaseSource, /<style>([\s\S]*?)<\/style>/i, 'стили')
      .replaceAll("'Inter'", "'Manrope'"),
    [],
  );

  const articleMarkup = useMemo(
    () => extractBlock(safeCaseSource, /(<article class="sv-art">[\s\S]*<\/article>)/i, 'статью')
      .replaceAll('assets/img/', '/media/safe-case/'),
    [],
  );

  useEffect(() => {
    document.title = 'Как 9 из 10 россиян получают визу США — метод Safe Case';
    window.scrollTo(0, 0);
  }, []);

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
