import React, { useRef, useState, useEffect } from 'react';
import { Section } from './ui/Section';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export const Reviews: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [modalSrc, setModalSrc] = useState<string | null>(null);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const baseImages = [
    "https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/f3ByCfvM6UCnXFHbaDziTg.jpg",
    "https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/JqxFQHnDJUm5CY4R4OQmRg.jpg",
    "https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/wFVQjXkXzUSP2THHd2GzYw.jpg",
    "https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/N7VxJASuaEu_GXmi9EqeCA.jpg",
    "https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/1kwKwhxBOU6UvIcZjNFgeA.jpg",
    "https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/94ZeCYoFr0GEM-MSmy84gw.jpg",
    "https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/nlDFowklyEutymyj-HVJzg.jpg",
    "https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/mDKRzF07D0WnX33TRKE55w.jpg",
    "https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/GXS47mBhYEOwBCIWcS2JwA.jpg",
    "https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/bh6JXQ4aAE6LoQpm-h3H8g.jpg",
    "https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/hbCKLIXTJUWSLPRZ54QYWA.jpg",
  ];

  const allImages = [...baseImages, ...baseImages];

  const pauseAutoScroll = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    let animationFrameId: number;
    const animate = () => {
      if (!isDragging && !isPaused && !modalSrc) {
        scrollContainer.scrollLeft += 1.2;
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
  }, [isDragging, isPaused, modalSrc]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    pauseAutoScroll();
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeftState(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleNavClick = (direction: 'left' | 'right') => {
    pauseAutoScroll();
    if (scrollRef.current) {
        const scrollAmount = scrollRef.current.clientWidth * 0.9;
        scrollRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
    }
  };

  const handleImageClick = (src: string) => {
    if (!isDragging) {
      pauseAutoScroll();
      setModalSrc(src);
    }
  };

  return (
    <Section id="reviews">
      <div className="mb-10 max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 text-dark dark:text-white">Отзывы клиентов</h2>
        <p className="text-slate-600 dark:text-slate-300 text-xl md:text-2xl">
          Реальные истории людей, которые уже получили свои визы благодаря методу Safe Case.
        </p>
      </div>

      <div className="relative group">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing pb-4"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={() => {
            setIsDragging(true);
            pauseAutoScroll();
          }}
          onTouchEnd={() => {
            setIsDragging(false);
            if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
            pauseTimeoutRef.current = setTimeout(() => {
              setIsPaused(false);
            }, 2000);
          }}
          style={{ scrollBehavior: 'auto' }}
        >
          {allImages.map((src, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[85vw] sm:w-[400px] aspect-video bg-white rounded-2xl overflow-hidden shadow-lg transform transition-transform hover:scale-[1.02] border border-slate-100 dark:border-slate-800 cursor-pointer"
              onClick={() => handleImageClick(src)}
            >
              <img
                src={src}
                alt={`Review ${index + 1}`}
                className="w-full h-full object-cover pointer-events-none"
                draggable="false"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>

        <div className="text-center text-slate-500 dark:text-slate-400 mt-6 text-sm">
          Нажмите на отзыв для увеличения. Потяните ленту или используйте стрелки, чтобы посмотреть больше.
        </div>

        {/* Виньетка — только десктоп */}
        <div className="hidden md:block absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-light dark:from-dark-deep to-transparent pointer-events-none z-20"></div>
        <div className="hidden md:block absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-light dark:from-dark-deep to-transparent pointer-events-none z-20"></div>

        {/* Navigation Buttons */}
        <button
          onClick={() => handleNavClick('left')}
          className="absolute top-1/2 left-4 -translate-y-1/2 z-30 w-12 h-12 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-full text-dark dark:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300 hover:bg-white dark:hover:bg-slate-700 shadow-md hidden md:flex"
          aria-label="Previous review"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => handleNavClick('right')}
          className="absolute top-1/2 right-4 -translate-y-1/2 z-30 w-12 h-12 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-full text-dark dark:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300 hover:bg-white dark:hover:bg-slate-700 shadow-md hidden md:flex"
          aria-label="Next review"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Modal */}
      {modalSrc && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 md:p-12"
          onClick={() => setModalSrc(null)}
        >
          <div
            className="relative bg-white dark:bg-dark-card rounded-3xl shadow-2xl overflow-hidden max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors"
              onClick={() => setModalSrc(null)}
              aria-label="Закрыть"
            >
              <X className="w-4 h-4" />
            </button>
            <img
              src={modalSrc}
              alt="Отзыв"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      )}
    </Section>
  );
};
