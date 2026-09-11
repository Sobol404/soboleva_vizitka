import React from 'react';
import { Section } from './ui/Section';
import { ShieldCheck, RefreshCw, FileText, Quote } from 'lucide-react';

export const Guarantees: React.FC = () => {
  return (
    <Section id="guarantees">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-dark dark:text-white mb-2 uppercase">Гарантии</h2>
        <p className="text-base sm:text-lg md:text-3xl text-slate-600 dark:text-slate-300 mb-8">Вот что я гарантирую на 100%</p>
        
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {[
            {
              title: "Повторное сопровождение",
              icon: RefreshCw,
              desc: "Для тарифов «Расширенный» и «Личное сопровождение» повторное сопровождение после отказа входит в оплаченный объём один раз. Это не гарантия выдачи визы."
            },
            {
              title: "Гарантия безопасности",
              icon: ShieldCheck,
              desc: "Все наши договоренности фиксируются в официальном договоре. Ваши персональные данные находятся под надежной защитой и используются исключительно для подготовки к получению визы."
            },
            {
              title: "Поддержка по тарифу",
              icon: FileText,
              desc: "Состав, сроки и каналы связи определяются выбранным тарифом. Дополнительные консультации после завершения услуг согласуются отдельно."
            }
          ].map((item, idx) => (
            <div key={idx} className="relative overflow-hidden bg-white dark:bg-dark-card p-7 pr-16 md:p-8 md:pr-20 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <item.icon className="pointer-events-none absolute right-6 top-6 h-7 w-7 text-dark/20 dark:text-white/20" />
              <h3 className="text-xl font-bold text-dark dark:text-white mb-3">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-dark rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-12">
          
          <div className="flex-1 space-y-6">
             <h3 className="text-2xl font-bold">Что можно обещать честно</h3>
             <ul className="space-y-3 opacity-90">
               <li className="flex items-start gap-2">
                 <span className="text-primary font-bold">•</span>
                 <span>Решение о выдаче визы принимает только консульство</span>
               </li>
               <li className="flex items-start gap-2">
                 <span className="text-primary font-bold">•</span>
                 <span>Более 600 успешных кейсов с 2022 года</span>
               </li>
               <li className="flex items-start gap-2">
                 <span className="text-primary font-bold">•</span>
                 <span>Если у вас реально мало шансов, я скажу это честно еще до начала сотрудничества</span>
               </li>
               <li className="flex items-start gap-2">
                 <span className="text-primary font-bold">•</span>
                 <span>Система помогает заранее разобрать риски и подготовить документы по выбранному тарифу</span>
               </li>
             </ul>
          </div>

          <div className="flex-1 flex items-center justify-center">
             <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl italic border border-white/20 relative max-w-md">
                <Quote className="absolute -top-4 -left-4 w-10 h-10 text-yellow-400 fill-current opacity-80" />
                <p className="text-lg font-medium leading-relaxed">
                  "Когда человек настолько уверен в своем методе, что готов работать бесплатно в случае неудачи – это дорогого стоит."
                </p>
             </div>
          </div>

        </div>
      </div>
    </Section>
  );
};
