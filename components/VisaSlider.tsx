import React, { useRef, useState, useEffect } from 'react';
import { Section } from './ui/Section';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export const VisaSlider: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [modalSrc, setModalSrc] = useState<string | null>(null);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const baseImages = [
    "https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/19m-vSpiK0K4Mw6Fug0XEw.webp",
    "https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/7GbeWqFRoki9bxqd88iT1A.webp",
    "https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/BxuwUkCT-UiukYeVEqR-Yw.webp",
    "https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/P61Gts5iKUyEkT7qAHHOEw.webp",
  ];

  const visaImages = [...baseImages, ...baseImages, ...baseImages];

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
        scrollContainer.scrollLeft += 1.0;
        const totalWidth = scrollContainer.scrollWidth;
        const oneSetWidth = totalWidth / 3;
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
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleNavClick = (direction: 'left' | 'right') => {
    pauseAutoScroll();
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const handleImageClick = (src: string) => {
    if (!isDragging) { pauseAutoScroll(); setModalSrc(src); }
  };

  return (
    <Section>
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-bold text-dark dark:text-white">Истории успеха</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400 text-xl md:text-2xl">Каждая виза — это история успеха и результат нашей совместной работы.</p>
      </div>
      <div className="relative group">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing py-4"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {visaImages.map((src, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-96 h-64 rounded-2xl overflow-hidden shadow-lg transform transition-transform hover:scale-105 bg-light dark:bg-dark-card border border-slate-100 dark:border-slate-800 cursor-pointer"
              onClick={() => handleImageClick(src)}
            >
              <img
                src={src}
                alt={`Visa example ${index + 1}`}
                className="w-full h-full object-cover pointer-events-none dark:opacity-80"
                draggable="false"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>

        {/* Виньетка — только десктоп */}
        <div className="hidden md:block absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-light dark:from-dark-deep to-transparent pointer-events-none z-20"></div>
        <div className="hidden md:block absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-light dark:from-dark-deep to-transparent pointer-events-none z-20"></div>

        {/* Navigation Buttons */}
        <button
          onClick={() => handleNavClick('left')}
          className="absolute top-1/2 left-4 -translate-y-1/2 z-30 w-12 h-12 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-full text-dark dark:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300 hover:bg-white dark:hover:bg-slate-700 shadow-md"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => handleNavClick('right')}
          className="absolute top-1/2 right-4 -translate-y-1/2 z-30 w-12 h-12 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-full text-dark dark:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300 hover:bg-white dark:hover:bg-slate-700 shadow-md"
          aria-label="Next"
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
            >
              <X className="w-4 h-4" />
            </button>
            <img src={modalSrc} alt="Visa example" className="w-full h-auto object-contain" />
          </div>
        </div>
      )}
    </Section>
  );
};
