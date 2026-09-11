import React from 'react';
import { Section } from './ui/Section';
import { Target, Link, MessageSquare, AlertTriangle, Users, HeartCrack, FileX, Briefcase, XCircle, CheckCircle } from 'lucide-react';

export const SafeCase: React.FC = () => {
  const pillars = [
    {
      icon: Target,
      title: "Цель поездки",
      text: "Убедительное обоснование цели поездки. Четкое объяснение, зачем именно вам нужно посетить США и почему именно сейчас, построенное в правильной логике офицера."
    },
    {
      icon: Link,
      title: "Связи с родиной",
      text: "Доказательство прочных связей с родиной. Демонстрация, что у вас есть весомые причины вернуться домой после поездки и вы не имеете иммиграционных намерений."
    },
    {
      icon: MessageSquare,
      title: "Подача информации",
      text: "Правильная подача информации. Структурированное представление вашего кейса на языке и в логике консульского офицера, с акцентом на ключевых аспектах."
    }
  ];

  const complexCases = [
    { icon: FileX, label: "Предыдущие отказы в визе (даже 5+)", image: "/illustrations/complex-cases/previous-refusals.jpg" },
    { icon: Users, label: "Наличие родственников в США", image: "/illustrations/complex-cases/relatives-in-usa.jpg" },
    { icon: HeartCrack, label: "Сложная семейная ситуация", image: "/illustrations/complex-cases/complex-family.jpg" },
    { icon: AlertTriangle, label: "Отсутствие визовой истории", image: "/illustrations/complex-cases/no-visa-history.jpg" },
    { icon: Briefcase, label: "Нестандартный тип занятости", image: "/illustrations/complex-cases/nonstandard-employment.jpg" },
    { icon: XCircle, label: "Аннулированные визы или ESTA", image: "/illustrations/complex-cases/cancelled-visa.jpg" },
  ];

  return (
    <Section id="safecase" className="bg-light-200 dark:bg-slate-900/50">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="relative inline-block mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-dark dark:text-white uppercase tracking-wide">
            Метод «SAFE CASE»
            </h2>
             <div className="absolute -top-6 -right-12 md:-right-24 transform rotate-[15deg] z-10 hidden sm:block">
                <div className="bg-white dark:bg-dark-card px-4 py-2 rounded-xl shadow-lg border border-accent/20 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-accent font-bold text-sm">87% получение визы</span>
                </div>
             </div>
             {/* Mobile badge version */}
             <div className="block sm:hidden mt-2 transform rotate-[5deg] inline-block">
                <div className="bg-white dark:bg-dark-card px-3 py-1 rounded-lg shadow-sm border border-accent/20 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-accent font-bold text-xs">87% получение визы</span>
                </div>
             </div>
        </div>

        <div className="glass-quote mb-8 max-w-2xl mx-auto">
            <h3 className="text-xl md:text-2xl text-dark dark:text-slate-200 font-medium not-italic">
            Что на самом деле важно для консула
            </h3>
        </div>

        <p className="text-slate-700 dark:text-slate-400 text-lg leading-relaxed md:text-center max-w-3xl mx-auto ml-auto">
          Метод "Safe Case" – это уникальная система подготовки к получению визы США, основанная на анализе сотен успешных кейсов и понимании психологии консульских офицеров.
        </p>
      </div>

      {/* 3 Pillars with Image */}
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-stretch mb-20">
        <div className="hidden md:flex h-full justify-center">
            <img 
                src="https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/EVy7zU2StUSPfvcr_UZ_3g.webp" 
                alt="Safe Case method visualization"
                className="rounded-3xl shadow-xl w-full max-w-none object-cover dark:opacity-80 lg:min-h-[440px]"
                loading="lazy"
                decoding="async"
            />
        </div>
        <div className="space-y-0 pl-4 md:pl-0">
            {pillars.map((item, idx) => (
            <div key={idx} className="timeline-item">
                <div className="timeline-icon absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 md:w-20 md:h-20 rounded-full bg-white dark:bg-dark-card shadow-md flex items-center justify-center text-accent flex-shrink-0 z-10">
                  <item.icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div className="bg-white dark:bg-dark-card p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 ml-4 md:ml-8">
                    <h4 className="text-xl font-bold text-dark dark:text-white mb-2">{item.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{item.text}</p>
                </div>
            </div>
            ))}
        </div>
      </div>

      {/* Complex Cases */}
      <div className="bg-white dark:bg-dark-card rounded-[2.5rem] p-4 sm:p-8 md:p-12 shadow-lg border border-slate-100 dark:border-slate-800">
        <div className="text-center mb-10">
          <h4 className="text-2xl sm:text-3xl md:text-5xl font-bold text-dark dark:text-white">
            Метод эффективен даже в самых сложных ситуациях:
          </h4>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {complexCases.map((item, idx) => (
            <div key={idx} className="overflow-hidden rounded-2xl md:rounded-3xl bg-light dark:bg-slate-900 border border-slate-100 dark:border-slate-700 shadow-sm group">
              <div className="hidden md:block w-full aspect-square overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.label} 
                  className="w-full h-full object-cover transform group-hover:scale-[1.025] transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex items-center gap-2.5 p-3.5 min-h-[6.5rem] text-left md:gap-3 md:p-4 md:min-h-20">
                <item.icon className="w-4 h-4 md:w-5 md:h-5 text-accent flex-shrink-0" />
                <span className="text-xs md:text-base font-bold text-dark dark:text-white leading-snug">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
