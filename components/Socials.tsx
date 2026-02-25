import React from 'react';
import { Section } from './ui/Section';
import { Instagram, Youtube, Send } from 'lucide-react';

export const Socials: React.FC = () => {
  const contentTypes = [
    "Актуальные новости о визовой политике США",
    "Разбор реальных кейсов получения и отказа",
    "Практические советы по заполнению DS-160",
    "Типичные ошибки на собеседовании",
    "Ответы на самые популярные вопросы"
  ];

  const socialLinks = [
    { name: 'Instagram', user: '@irene_sa', icon: Instagram, href: 'https://instagram.com/irene_sa', color: 'bg-gradient-to-br from-pink-500 to-rose-500' },
    { name: 'Telegram', user: 'Про визы', icon: Send, href: 'https://t.me/+70mVsQp7SOFiYTE6', color: 'bg-gradient-to-br from-blue-400 to-blue-600' },
    { name: 'YouTube', user: '@irene_sa', icon: Youtube, href: 'https://www.youtube.com/@irene_sa', color: 'bg-gradient-to-br from-red-500 to-red-600' },
    { name: 'MAX', user: 'Бизнес чат', icon: () => <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>, href: 'https://max.ru/id343523500039_biz', color: 'bg-gradient-to-br from-indigo-500 to-purple-600' }
  ];

  return (
    <Section id="socials" className="overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        
        <div className="flex-1 w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          <div className="text-center lg:text-left">
             <h2 className="inline-block text-3xl md:text-5xl font-bold text-white px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg transform -rotate-2">
               Подписывайтесь
             </h2>
          </div>
          <div className="flex flex-col gap-2 pt-4">
             {/* Mobile Image */}
             <div className="block lg:hidden w-full relative pb-[56.25%] rounded-3xl overflow-hidden shadow-lg border border-slate-100 mb-6">
              <img 
                src="https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/4oDheoKeLkqo8h2MCvbbWQ.webp" 
                alt="Social media mockups"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
             </div>

             <p className="text-xl md:text-3xl text-dark dark:text-white font-semibold">Присоединяйтесь к сообществу из <span className="text-accent font-bold">60 000+</span> подписчиков!</p>
             <p className="text-slate-600 dark:text-slate-300 text-lg">Каждую неделю я делюсь ценными материалами, которые помогают тысячам людей лучше понять процесс получения визы США.</p>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-b border-slate-100 dark:border-slate-700 py-6">
            {[
              { val: "1M+", lbl: "Ежемесячных просмотров" },
              { val: "100+", lbl: "Полезных видео и статей" },
              { val: "300+", lbl: "Ответов на вопросы" }
            ].map((s, i) => (
              <div key={i}>
                <div className="text-2xl font-bold text-dark dark:text-white">{s.val}</div>
                <div className="text-xs text-slate-500 dark:text-slate-300 font-medium mt-1">{s.lbl}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-dark dark:text-white">В моих социальных сетях вы найдете:</h4>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-left">
              {contentTypes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-200">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Links */}
          <div className="grid grid-cols-2 gap-4 w-full mt-8 lg:hidden">
              {socialLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`${link.color} p-4 rounded-2xl text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center justify-center text-center h-24 group`}
                >
                  <div className="w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <link.icon className="w-full h-full" />
                  </div>
                  <div className="mt-2">
                    <span className="font-bold text-xs block">{link.name}</span>
                  </div>
                </a>
              ))}
           </div>
        </div>

        <div className="hidden lg:flex flex-1 w-full lg:w-1/2 flex-col items-center justify-center">
           <div className="w-full relative pb-[56.25%] rounded-3xl overflow-hidden shadow-lg border border-slate-100">
            <img 
              src="https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/4oDheoKeLkqo8h2MCvbbWQ.webp" 
              alt="Social media mockups"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-8">
              {socialLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`${link.color} p-4 rounded-2xl text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center justify-center text-center h-28 md:h-32 group`}
                >
                  <div className="w-1/2 h-1/2 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <link.icon className="w-full h-full" />
                  </div>
                  <div className="mt-2">
                    <span className="font-bold text-sm block">{link.name}</span>
                  </div>
                </a>
              ))}
           </div>
        </div>

      </div>
    </Section>
  );
};