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
    { icon: FileX, label: "Предыдущие отказы в визе (даже 5+)", image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400" },
    { icon: Users, label: "Наличие родственников в США", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=400" },
    { icon: HeartCrack, label: "Сложная семейная ситуация", image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?auto=format&fit=crop&q=80&w=400" },
    { icon: AlertTriangle, label: "Отсутствие визовой истории", image: "https://images.unsplash.com/photo-1544016768-982d1554f0b9?auto=format&fit=crop&q=80&w=400" },
    { icon: Briefcase, label: "Нестандартный тип занятости", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400" },
    { icon: XCircle, label: "Аннулированные визы или ESTA", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=400" },
  ];

  return (
    <Section id="safecase" className="bg-light-200 dark:bg-slate-900/50">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="relative inline-block mb-6">
            <h2 className="text-4xl md:text-6xl font-bold text-dark dark:text-white uppercase tracking-wide">
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
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
        <div className="flex justify-center">
            <img 
                src="https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/EVy7zU2StUSPfvcr_UZ_3g.webp" 
                alt="Safe Case method visualization"
                className="rounded-3xl shadow-xl w-full max-w-lg object-cover dark:opacity-80"
                loading="lazy"
                decoding="async"
            />
        </div>
        <div className="space-y-0 pl-4 md:pl-0">
            {pillars.map((item, idx) => (
            <div key={idx} className="timeline-item">
                <div className="absolute left-0 top-0 w-20 h-20 rounded-full bg-white dark:bg-dark-card shadow-md flex items-center justify-center text-accent mb-6 flex-shrink-0 z-10">
                  <item.icon className="w-8 h-8" />
                </div>
                <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 ml-8">
                    <h4 className="text-xl font-bold text-dark dark:text-white mb-2">{item.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{item.text}</p>
                </div>
            </div>
            ))}
        </div>
      </div>

      {/* Complex Cases */}
      <div className="bg-white dark:bg-dark-card rounded-[2.5rem] p-4 sm:p-8 md:p-12 shadow-lg max-w-5xl mx-auto border border-slate-100 dark:border-slate-800">
        <div className="text-center mb-10">
          <h4 className="text-3xl md:text-5xl font-bold text-dark dark:text-white">
            Метод эффективен даже в самых сложных ситуациях:
          </h4>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {complexCases.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3">
              <div className="w-full aspect-square rounded-3xl overflow-hidden shadow-md relative group">
                <img 
                  src={item.image} 
                  alt={item.label} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"></div>
                <div className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-4">
                  <span className="text-xs md:text-base font-bold text-white text-center leading-tight block drop-shadow-md">{item.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};