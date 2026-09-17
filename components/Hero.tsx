import React from 'react';
import { Star, CheckCircle, Globe, RefreshCcw, Quote } from 'lucide-react';
import { Button } from './ui/Button';
import { Section } from './ui/Section';

export const Hero: React.FC = () => {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section className="pt-20 pb-8 lg:pt-24 lg:pb-12 relative overflow-hidden min-h-[80vh] flex items-center">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Text Content */}
        <div className="order-2 lg:order-1 relative space-y-6 animate-fade-in-up text-center lg:text-left z-10 w-full">
          <div className="relative inline-block w-full">
            {/* Flags Row - Above Title */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-4 animate-float-subtle">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm border border-white/20 flex items-center gap-1.5 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                <span className="text-xl leading-none">🇺🇸</span>
                <span className="text-xs font-bold text-dark dark:text-white">США</span>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm border border-white/20 flex items-center gap-1.5 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <span className="text-xl leading-none">🇨🇦</span>
                <span className="text-xs font-bold text-dark dark:text-white">Канада</span>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm border border-white/20 flex items-center gap-1.5 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <span className="text-xl leading-none">🇬🇧</span>
                <span className="text-xs font-bold text-dark dark:text-white">UK</span>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm border border-white/20 flex items-center gap-1.5 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <span className="text-xl leading-none">🇦🇺</span>
                <span className="text-xs font-bold text-dark dark:text-white">Австралия</span>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm border border-white/20 flex items-center gap-1.5 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <span className="text-xl leading-none">🇳🇿</span>
                <span className="text-xs font-bold text-dark dark:text-white">Новая Зеландия</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-dark dark:text-white leading-[1.1] relative z-10">
              Виза под ключ
            </h1>
          </div>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl text-accent font-bold max-w-xl mx-auto lg:mx-0 relative z-10">
            По системе *Safe Case
          </h2>
          
          <div className="w-full">
            <div className="flex flex-col items-center lg:items-start gap-8">
                <div className="glass-quote w-full max-w-md relative text-left">
                  <Quote className="absolute -top-3 -left-3 w-8 h-8 text-accent/30 fill-current" />
                  <p className="text-lg font-medium leading-relaxed text-dark dark:text-slate-200 relative z-10">
                    "С методом «Safe Case» мои клиенты получают визы даже после 6 отказов"
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 w-full max-w-lg text-left">
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
                <div className="w-full max-w-lg">
                    <Button onClick={scrollToServices} fullWidth className="text-lg px-10 py-5 uppercase tracking-wide">
                        ОЦЕНИТЬ ШАНСЫ
                    </Button>
                </div>
            </div>
          </div>
        </div>
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative w-full lg:pl-10">
           <div className="relative w-full max-w-[380px] lg:max-w-[480px] aspect-square mx-auto">
             <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-100 dark:from-primary/10 dark:to-purple-900/10 rounded-[3rem] transform rotate-3 scale-95 opacity-50"></div>
             <img 
               src="/media/shared/irina-visa-expert-hero.jpeg"
               alt="Safe Visa - Визовый эксперт" 
               className="relative z-10 w-full h-full object-cover rounded-[2.5rem] shadow-2xl border-4 border-white dark:border-slate-800 transform lg:scale-110 lg:-translate-x-4 lg:-translate-y-4"
               loading="lazy"
               decoding="async"
             />
             
             <div className="absolute -top-4 -left-4 z-20 transform -rotate-[15deg]">
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-light-200 dark:bg-slate-800 text-accent text-sm md:text-base font-bold tracking-wide shadow-lg border-2 border-white dark:border-slate-700">
                  <Star className="w-5 h-5 fill-current" />
                  <span>Метод Safe Case</span>
                </div>
             </div>
           </div>
        </div>
      </div>
    </Section>
  );
};
