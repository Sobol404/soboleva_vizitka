import React, { useEffect, useRef, useState } from 'react';
import { Section } from './ui/Section';
import { X } from 'lucide-react';

type Direction = 'left' | 'right';

interface ReviewMarqueeProps {
  images: string[];
  direction: Direction;
  onOpen: (src: string) => void;
  isModalOpen: boolean;
}

const ReviewMarquee: React.FC<ReviewMarqueeProps> = ({ images, direction, onOpen, isModalOpen }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const pauseUntilRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const repeatedImages = [...images, ...images, ...images];

  const pauseAutoScroll = (duration = 3200) => {
    pauseUntilRef.current = Date.now() + duration;
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId = 0;
    let initialised = false;

    const animate = () => {
      const oneSetWidth = scrollContainer.scrollWidth / 3;

      if (!initialised && oneSetWidth > 0) {
        scrollContainer.scrollLeft = oneSetWidth;
        initialised = true;
      }

      if (initialised && !isDragging && !isModalOpen && Date.now() > pauseUntilRef.current) {
        const speed = 1;

        if (direction === 'right') {
          scrollContainer.scrollLeft += speed;
          if (scrollContainer.scrollLeft >= oneSetWidth * 2) scrollContainer.scrollLeft -= oneSetWidth;
        } else {
          scrollContainer.scrollLeft -= speed;
          if (scrollContainer.scrollLeft <= 0) scrollContainer.scrollLeft += oneSetWidth;
        }
      }

      animationFrameId = window.requestAnimationFrame(animate);
    };

    animationFrameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [direction, isDragging, isModalOpen]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    hasDraggedRef.current = false;
    pauseAutoScroll();
    startXRef.current = event.clientX;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;

    const walk = (event.clientX - startXRef.current) * 1.25;
    if (Math.abs(walk) > 8) hasDraggedRef.current = true;
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const stopDragging = () => {
    if (isDragging) pauseAutoScroll(1800);
    setIsDragging(false);
  };

  const handleReviewClick = (src: string) => {
    setIsDragging(false);
    if (!hasDraggedRef.current) onOpen(src);
  };

  return (
    <div
      ref={scrollRef}
      className="hide-scrollbar flex gap-4 overflow-x-auto py-1 select-none cursor-grab touch-pan-y active:cursor-grabbing md:gap-6"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onPointerLeave={stopDragging}
      style={{ scrollBehavior: 'auto' }}
    >
      {repeatedImages.map((src, index) => (
        <button
          key={`${direction}-${index}`}
          type="button"
          className="flex-shrink-0 w-[78vw] overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-transform hover:scale-[1.01] dark:border-slate-800 dark:bg-dark-card sm:w-[25rem]"
          onClick={() => handleReviewClick(src)}
          aria-label="Открыть отзыв крупнее"
        >
          <img
            src={src}
            alt="Отзыв клиента"
            className="pointer-events-none aspect-video h-full w-full object-cover"
            draggable="false"
            loading="lazy"
            decoding="async"
          />
        </button>
      ))}
    </div>
  );
};

export const Reviews: React.FC = () => {
  const [modalSrc, setModalSrc] = useState<string | null>(null);

  const baseImages = [
    'https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/f3ByCfvM6UCnXFHbaDziTg.jpg',
    'https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/JqxFQHnDJUm5CY4R4OQmRg.jpg',
    'https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/wFVQjXkXzUSP2THHd2GzYw.jpg',
    'https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/N7VxJASuaEu_GXmi9EqeCA.jpg',
    'https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/1kwKwhxBOU6UvIcZjNFgeA.jpg',
    'https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/94ZeCYoFr0GEM-MSmy84gw.jpg',
    'https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/nlDFowklyEutymyj-HVJzg.jpg',
    'https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/mDKRzF07D0WnX33TRKE55w.jpg',
    'https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/GXS47mBhYEOwBCIWcS2JwA.jpg',
    'https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/bh6JXQ4aAE6LoQpm-h3H8g.jpg',
    'https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/hbCKLIXTJUWSLPRZ54QYWA.jpg',
  ];

  const firstRow = baseImages.filter((_, index) => index % 2 === 0);
  const secondRow = baseImages.filter((_, index) => index % 2 !== 0);

  return (
    <Section id="reviews" className="overflow-hidden">
      <div className="mb-10 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 text-dark dark:text-white">Отзывы клиентов</h2>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg md:text-2xl">
          Реальные истории людей, которые уже получили свои визы благодаря методу Safe Case.
        </p>
      </div>

      <div className="space-y-4 md:space-y-6">
        <ReviewMarquee images={firstRow} direction="right" onOpen={setModalSrc} isModalOpen={Boolean(modalSrc)} />
        <ReviewMarquee images={secondRow} direction="left" onOpen={setModalSrc} isModalOpen={Boolean(modalSrc)} />
      </div>

      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Нажмите на отзыв для увеличения. Ленту можно листать свайпом или мышью.
      </p>

      {modalSrc && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm md:p-12"
          onClick={() => setModalSrc(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-dark-card"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
              onClick={() => setModalSrc(null)}
              aria-label="Закрыть"
            >
              <X className="h-4 w-4" />
            </button>
            <img src={modalSrc} alt="Отзыв клиента" className="h-auto w-full object-contain" />
          </div>
        </div>
      )}
    </Section>
  );
};
