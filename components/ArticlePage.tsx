import React, { useState, useEffect, useMemo } from 'react';
import { Section } from './ui/Section';
import { ArticleData } from '../articles/types';
import { ImageModal } from './ui/ImageModal';
import { Calendar, User, ChevronLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { DocumentToc, DocumentTocItem, scrollToDocumentSection, useActiveDocumentSection } from './DocumentToc';
import { ArticleAuthorCard } from './ArticleAuthorCard';

interface ArticlePageProps {
  data: ArticleData;
  onBack: () => void;
}

const headingId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^а-яёa-z0-9 ]/gi, '')
    .trim()
    .replace(/\s+/g, '-') || 'section';

export const ArticlePage: React.FC<ArticlePageProps> = ({ data, onBack }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [tocOpen, setTocOpen] = useState(false);
  const tocItems = useMemo<DocumentTocItem[]>(() => {
    if (data.markdown) {
      return Array.from(data.markdown.matchAll(/^## (.+)$/gm), ([, label]) => ({
        id: `article-${headingId(label)}`,
        label: label.trim(),
      }));
    }

    return (data.blocks ?? [])
      .map((block, index) => block.type === 'heading' && block.content
        ? { id: `article-block-${index}`, label: block.content }
        : null)
      .filter((item): item is DocumentTocItem => Boolean(item));
  }, [data]);
  const activeId = useActiveDocumentSection(tocItems);
  const navigateTo = (id: string) => {
    setTocOpen(false);
    scrollToDocumentSection(id);
  };

  useEffect(() => {
    document.title = `${data.title} | Ирина Соболева`;
    window.scrollTo(0, 0);
    setTocOpen(false);
  }, [data]);

  return (
    <div className="bg-white dark:bg-dark-deep min-h-screen pb-20 pt-24">
      <Section containerClassName="max-w-7xl">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-accent mb-8 transition-colors group"
        >
          <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
          Назад к главной
        </button>

        {tocItems.length > 0 && (
          <DocumentToc
            variant="mobile"
            items={tocItems}
            activeId={activeId}
            isOpen={tocOpen}
            onToggle={() => setTocOpen((open) => !open)}
            onNavigate={navigateTo}
          />
        )}

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] xl:gap-14">
          <article className="blog-article min-w-0">
            <header className="blog-hero mb-12">
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

            {data.mainImage && (
              <img
                src={data.mainImage}
                alt={data.title}
                className="w-full h-[400px] object-cover rounded-3xl mb-12 shadow-xl"
              />
            )}

            <div className="blog-body space-y-10">
              {data.markdown ? (
                <div className="space-y-6">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => <h2 id={`article-${headingId(String(children))}`} className="scroll-mt-40 lg:scroll-mt-28 text-3xl md:text-4xl font-bold text-dark dark:text-white mt-10">{children}</h2>,
                      h2: ({ children }) => <h2 id={`article-${headingId(String(children))}`} className="scroll-mt-40 lg:scroll-mt-28 text-2xl md:text-3xl font-bold text-dark dark:text-white mt-10">{children}</h2>,
                      h3: ({ children }) => <h3 id={`article-${headingId(String(children))}`} className="scroll-mt-40 lg:scroll-mt-28 text-xl md:text-2xl font-bold text-dark dark:text-white mt-8">{children}</h3>,
                      p: ({ children }) => <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">{children}</p>,
                      ol: ({ children }) => <ol className="space-y-3 list-decimal pl-6 text-base leading-relaxed text-slate-600 dark:text-slate-400">{children}</ol>,
                      ul: ({ children }) => <ul className="space-y-3 list-disc pl-6 text-base leading-relaxed text-slate-600 dark:text-slate-400">{children}</ul>,
                      blockquote: ({ children }) => <blockquote className="blog-quote rounded-2xl border border-slate-200 bg-white p-5 text-base italic leading-relaxed text-dark shadow-sm dark:border-slate-700 dark:bg-dark-card dark:text-slate-100">{children}</blockquote>,
                      img: ({ src, alt }) => (
                        <button type="button" className="block w-full cursor-zoom-in" onClick={() => setSelectedImage(src || '')}>
                          <img src={src} alt={alt || ''} className="w-full rounded-2xl border border-slate-100 dark:border-slate-800 shadow-md" />
                        </button>
                      ),
                    }}
                  >
                    {data.markdown}
                  </ReactMarkdown>
                </div>
              ) : data.blocks?.map((block, idx) => {
                switch (block.type) {
                  case 'heading':
                    return <h2 key={idx} id={`article-block-${idx}`} className="scroll-mt-40 lg:scroll-mt-28 text-2xl md:text-3xl font-bold text-dark dark:text-white mt-8">{block.content}</h2>;
                  case 'text':
                    return <p key={idx} className="text-base leading-relaxed text-slate-600 dark:text-slate-400">{block.content}</p>;
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
          </article>

          {tocItems.length > 0 && (
            <div className="hidden lg:block">
              <ArticleAuthorCard className="mb-8" />
              <DocumentToc variant="desktop" items={tocItems} activeId={activeId} onNavigate={navigateTo} />
            </div>
          )}
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
