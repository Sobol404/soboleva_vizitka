import React from 'react';
import { Star, CheckCircle, Globe, RefreshCcw, Quote } from 'lucide-react';
import { Button } from './ui/Button';
import { Section } from './ui/Section';
import { ResponsiveImage } from './ui/ResponsiveImage';

export const Hero: React.FC = () => {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const destinations = [
    { flag: '🇺🇸', title: 'США' },
    { flag: '🇨🇦', title: 'Канада' },
    { flag: '🇬🇧', title: 'UK' },
    { flag: '🇦🇺', title: 'Австралия' },
    { flag: '🇳🇿', title: 'Новая Зеландия' },
  ];

  return (
    <Section className="pt-20 pb-8 lg:pt-24 lg:pb-12 relative overflow-hidden min-h-[80vh] flex items-center">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center lg:items-stretch">
        
        {/* Text Content */}
        <div className="order-2 lg:order-1 relative space-y-6 lg:space-y-5 xl:space-y-8 animate-fade-in-up text-center lg:text-left z-10 w-full">
          <div className="relative inline-block w-full">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[clamp(2.75rem,5vw,4.25rem)] lg:whitespace-nowrap font-extrabold text-dark dark:text-white leading-[1.1] relative z-10">
              Виза под ключ
            </h1>
            <div className="mt-4 flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 rounded-[20px] border-2 border-white bg-light-200 px-5 py-3 text-sm font-bold tracking-wide text-accent shadow-lg dark:border-slate-700 dark:bg-slate-800">
                <Star className="h-5 w-5 fill-current" aria-hidden="true" />
                <span>Метод Safe Case</span>
              </div>
            </div>
          </div>
          
          <div className="w-full">
            <div className="flex flex-col items-center lg:items-start gap-8 lg:gap-6 xl:gap-10">
                <div className="glass-quote w-full relative text-left">
                  <Quote className="absolute -top-3 -left-3 w-8 h-8 text-accent/30 fill-current" />
                  <p className="text-lg font-medium leading-relaxed text-dark dark:text-slate-200 relative z-10">
                    "С методом «Safe Case» мои клиенты получают визы даже после 6 отказов"
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 w-full text-left">
                    {[
                    { icon: Star, title: "87% успешных одобрений", subtitle: "Даже после нескольких отказов", color: "text-yellow-500" },
                    { icon: CheckCircle, title: "600+ успешных кейсов", subtitle: "Работаю с 2022 года", color: "text-green-500" },
                    { icon: Globe, title: "Клиенты из 12 стран", subtitle: "Работаем дистанционно", color: "text-blue-500" },
                    { icon: RefreshCcw, title: "Повторное сопровождение", subtitle: "По условиям тарифа после отказа", color: "text-purple-500" },
                    ].map((stat, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row items-start text-left gap-2 sm:gap-3 bg-white dark:bg-dark-card p-3 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                        <stat.icon className={`w-5 h-5 ${stat.color} flex-shrink-0 mt-0.5`} />
                        <div className="text-left">
                          <div className="text-xs sm:text-sm font-bold text-dark dark:text-white leading-tight">{stat.title}</div>
                          <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">{stat.subtitle}</div>
                        </div>
                    </div>
                    ))}
                </div>
                <div className="w-full">
                    <Button onClick={scrollToServices} fullWidth className="text-lg px-10 py-5 uppercase tracking-wide">
                        ОЦЕНИТЬ ШАНСЫ
                    </Button>
                </div>
            </div>
          </div>
        </div>
          <div className="order-1 lg:order-2 relative w-full lg:min-h-0">
           <div className="relative w-full max-w-[380px] lg:max-w-none aspect-square lg:absolute lg:inset-0 lg:aspect-auto mx-auto">
             <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-100 dark:from-primary/10 dark:to-purple-900/10 rounded-[3rem] transform rotate-3 scale-95 opacity-50"></div>
             <ResponsiveImage
               basePath="/media/shared/irina-visa-expert-hero"
               widths={[480, 800, 1200]}
               fallbackType="jpg"
               sizes="(max-width: 1023px) min(100vw - 32px, 380px), 50vw"
               alt="Safe Visa - Визовый эксперт" 
               className="relative z-10 w-full h-full object-cover rounded-[2.5rem] shadow-2xl border-4 border-white dark:border-slate-800"
               width={1254}
               height={1254}
               loading="eager"
               fetchPriority="high"
               decoding="async"
             />
             
           </div>
        </div>
      </div>

      <div className="hero-country-marquee relative left-1/2 mt-8 w-screen -translate-x-1/2 overflow-hidden py-3" aria-label="Страны, с которыми мы работаем: США, Канада, UK, Австралия, Новая Зеландия">
        <div className="hero-country-marquee__track flex w-max items-center">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-3 px-2 sm:gap-4" aria-hidden="true">
              {Array.from({ length: 6 }, () => destinations).flat().map(({ flag, title }, index) => (
                <span key={`${title}-${index}`} className="inline-flex items-center gap-2 whitespace-nowrap rounded-[20px] border border-white/70 bg-white/80 px-4 py-2 text-sm font-bold text-dark shadow-sm backdrop-blur-md dark:border-slate-700 dark:bg-slate-800/80 dark:text-white">
                  <span className="text-lg leading-none" aria-hidden="true">{flag}</span>
                  {title}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
