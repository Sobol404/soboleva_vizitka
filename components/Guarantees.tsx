import React from 'react';
import { Section } from './ui/Section';
import { ShieldCheck, RefreshCw, FileText, Quote } from 'lucide-react';

export const Guarantees: React.FC = () => {
  return (
    <Section id="guarantees">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-bold text-dark dark:text-white mb-2 uppercase">Гарантии</h2>
        <p className="text-xl md:text-3xl text-slate-600 dark:text-slate-300 mb-8">Вот что я гарантирую на 100%</p>
        
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {[
            {
              title: "Гарантия результата",
              icon: RefreshCw,
              desc: "Если вы получите отказ при подаче с нами, то мы переподаемся повторно абсолютно бесплатно. Оплачиваются только консульский сбор и услуги бота для записи (если требуется)."
            },
            {
              title: "Гарантия безопасности",
              icon: ShieldCheck,
              desc: "Все наши договоренности фиксируются в официальном договоре. Ваши персональные данные находятся под надежной защитой и используются исключительно для подготовки к получению визы."
            },
            {
              title: "Гарантия поддержки",
              icon: FileText,
              desc: "Я остаюсь на связи с вами до результата и даже после! После получения визы вы можете обращаться ко мне за консультацией по первой поездке, включая рекомендации по прохождению границы."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-dark-card p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-light dark:bg-slate-800 flex items-center justify-center text-dark dark:text-white mb-6">
                <item.icon className="w-7 h-7" />
              </div>
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
             <h3 className="text-2xl font-bold">Почему я могу давать такие гарантии?</h3>
             <ul className="space-y-3 opacity-90">
               <li className="flex items-start gap-2">
                 <span className="text-primary font-bold">•</span>
                 <span>9 из 10 моих клиентов получают визу с первой попытки</span>
               </li>
               <li className="flex items-start gap-2">
                 <span className="text-primary font-bold">•</span>
                 <span>Более 300 успешных одобрений за 2,5 года работы</span>
               </li>
               <li className="flex items-start gap-2">
                 <span className="text-primary font-bold">•</span>
                 <span>Если у вас реально мало шансов, я скажу это честно еще до начала сотрудничества</span>
               </li>
               <li className="flex items-start gap-2">
                 <span className="text-primary font-bold">•</span>
                 <span>Моя система учитывает все возможные риски еще до подачи, минимизируя вероятность отказа</span>
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