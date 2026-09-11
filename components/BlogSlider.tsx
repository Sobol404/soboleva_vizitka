import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import { ArticleData } from '../articles/types';

interface BlogSliderProps {
  articles: ArticleData[];
  darkContainer?: boolean;
}

export const BlogSlider: React.FC<BlogSliderProps> = ({ articles, darkContainer }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const allArticles = [...articles, ...articles];

  const pauseAutoScroll = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 3000);
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    let animationFrameId: number;
    const animate = () => {
      if (!isDragging && !isPaused) {
        scrollContainer.scrollLeft += 0.8;
        const totalWidth = scrollContainer.scrollWidth;
        const oneSetWidth = totalWidth / 2;
        if (scrollContainer.scrollLeft >= oneSetWidth) {
          scrollContainer.scrollLeft -= oneSetWidth;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [isDragging, isPaused]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    pauseAutoScroll();
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => { setIsDragging(false); };
  const handleMouseUp = () => { setIsDragging(false); };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleNavClick = (direction: 'left' | 'right') => {
    pauseAutoScroll();
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing py-4"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={() => { setIsDragging(true); pauseAutoScroll(); }}
        onTouchEnd={() => {
          setIsDragging(false);
          if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
          pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 2000);
        }}
      >
        {allArticles.map((art, idx) => (
          <a
            key={`${art.id}-${idx}`}
            href={art.href || `#/article/${art.id}`}
            className="flex-shrink-0 w-[85vw] md:w-[400px] group/card flex flex-col bg-white dark:bg-dark-card rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 dark:border-slate-800"
            draggable="false"
          >
            <div className="h-48 overflow-hidden relative">
              <div className="absolute inset-0 bg-dark/20 group-hover/card:bg-transparent transition-colors z-10" />
              <img
                src={art.mainImage}
                alt={art.title}
                className="w-full h-full object-cover transform group-hover/card:scale-105 transition-transform duration-500 pointer-events-none"
                draggable="false"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-2 text-xs font-semibold text-accent mb-3 uppercase tracking-wider">
                <Calendar size={14} />
                {art.date}
              </div>
              <h3 className="text-xl font-bold text-dark dark:text-white mb-3 line-clamp-2 leading-tight group-hover/card:text-accent transition-colors">
                {art.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 mb-6">
                {art.description}
              </p>
              <div className="mt-auto flex items-center gap-2 text-sm font-bold text-dark dark:text-white group-hover/card:text-accent transition-colors">
                Читать статью <ArrowRight size={16} />
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Виньетка — только десктоп */}
      {darkContainer ? (
        <>
          <div className="hidden md:block absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-dark to-transparent pointer-events-none z-20"></div>
          <div className="hidden md:block absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-dark to-transparent pointer-events-none z-20"></div>
        </>
      ) : (
        <>
          <div className="hidden md:block absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-light-200 dark:from-slate-900 to-transparent pointer-events-none z-20"></div>
          <div className="hidden md:block absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-light-200 dark:from-slate-900 to-transparent pointer-events-none z-20"></div>
        </>
      )}

      {/* Navigation Buttons */}
      <button
        onClick={() => handleNavClick('left')}
        className="absolute top-1/2 left-4 -translate-y-1/2 z-30 w-12 h-12 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-full text-dark dark:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300 hover:bg-white dark:hover:bg-slate-700 shadow-md hidden md:flex"
        aria-label="Previous article"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => handleNavClick('right')}
        className="absolute top-1/2 right-4 -translate-y-1/2 z-30 w-12 h-12 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-full text-dark dark:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300 hover:bg-white dark:hover:bg-slate-700 shadow-md hidden md:flex"
        aria-label="Next article"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};
