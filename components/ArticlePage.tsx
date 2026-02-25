import React, { useState, useEffect } from 'react';
import { Section } from './ui/Section';
import { ArticleData } from '../articles/types';
import { ImageModal } from './ui/ImageModal';
import { Calendar, User, ChevronLeft } from 'lucide-react';

interface ArticlePageProps {
  data: ArticleData;
  onBack: () => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ data, onBack }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    document.title = `${data.title} | Ирина Соболева`;
    window.scrollTo(0, 0);
  }, [data]);

  return (
    <div className="bg-white dark:bg-dark-deep min-h-screen pb-20 pt-24">
      <Section containerClassName="max-w-4xl">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-accent mb-8 transition-colors group"
        >
          <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
          Назад к главной
        </button>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-dark dark:text-white leading-tight mb-6">
            {data.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-slate-500 dark:text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {data.date}
            </div>
            <div className="flex items-center gap-2">
              <User size={16} />
              {data.author}
            </div>
          </div>
        </header>

        <img 
          src={data.mainImage} 
          alt={data.title}
          className="w-full h-[400px] object-cover rounded-3xl mb-12 shadow-xl"
        />

        <div className="space-y-10">
          {data.blocks.map((block, idx) => {
            switch (block.type) {
              case 'heading':
                return <h2 key={idx} className="text-2xl md:text-3xl font-bold text-dark dark:text-white mt-8">{block.content}</h2>;
              case 'text':
                return <p key={idx} className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">{block.content}</p>;
              case 'image':
                return (
                  <div key={idx} className="relative group cursor-zoom-in" onClick={() => setSelectedImage(block.src!)}>
                    <img 
                      src={block.src} 
                      alt={block.alt} 
                      className="rounded-2xl border border-slate-100 dark:border-slate-800 shadow-md transition-transform group-hover:scale-[1.01]"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors rounded-2xl flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-dark px-4 py-2 rounded-full text-sm font-bold shadow-lg transition-opacity">Увеличить</span>
                    </div>
                  </div>
                );
              case 'slider':
                return (
                  <div key={idx} className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
                    {block.images?.map((img, i) => (
                      <img 
                        key={i} 
                        src={img} 
                        className="h-64 rounded-xl cursor-zoom-in flex-shrink-0"
                        onClick={() => setSelectedImage(img)}
                      />
                    ))}
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      </Section>

      <ImageModal 
        src={selectedImage || ''} 
        alt="Preview" 
        isOpen={!!selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </div>
  );
};