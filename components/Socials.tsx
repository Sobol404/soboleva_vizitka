import React from 'react';
import { Section } from './ui/Section';
import { AtSign, Instagram, Music2, Youtube, Send } from 'lucide-react';
import { links } from '../config/links';

export const Socials: React.FC = () => {
  const contentTypes = [
    "Актуальные новости о визовой политике США",
    "Разбор реальных кейсов получения и отказа",
    "Практические советы по заполнению DS-160",
    "Типичные ошибки на собеседовании",
    "Ответы на самые популярные вопросы"
  ];

  const socialLinks = [
    { name: 'Instagram', user: '@irene_sa', icon: Instagram, href: links.social.instagram, color: 'bg-gradient-to-br from-pink-500 to-rose-500', mobileOrder: 'order-1 lg:order-none' },
    { name: 'Telegram', user: 'Про визы', icon: Send, href: links.telegram.channel, color: 'bg-gradient-to-br from-blue-400 to-blue-600', mobileOrder: 'order-6 lg:order-none' },
    { name: 'Threads', user: '@irene_sa', icon: AtSign, href: links.social.threads, color: 'bg-gradient-to-br from-slate-700 to-slate-950', mobileOrder: 'order-2 lg:order-none' },
    { name: 'TikTok', user: '@irene..sa', icon: Music2, href: links.social.tiktok, color: 'bg-gradient-to-br from-slate-800 to-slate-950', mobileOrder: 'order-3 lg:order-none' },
    { name: 'YouTube', user: '@irene_sa', icon: Youtube, href: links.social.youtube, color: 'bg-gradient-to-br from-red-500 to-red-600', mobileOrder: 'order-4 lg:order-none' },
    { name: 'Макс', user: 'Бизнес чат', icon: () => <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>, href: links.social.max, color: 'bg-gradient-to-br from-indigo-500 to-purple-600', mobileOrder: 'order-5 lg:order-none' }
  ];

  return (
    <Section id="socials" className="overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        
        <div className="flex-1 w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          <div className="flex flex-col gap-2 pt-4">
             {/* Mobile Image */}
             <div className="block lg:hidden w-full relative pb-[56.25%] rounded-3xl overflow-hidden shadow-lg border border-slate-100 mb-6">
              <img 
                src="/media/shared/social-media-mockup.webp"
                alt="Social media mockups"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
             </div>

             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-dark dark:text-white">Присоединяйтесь к сообществу из <span className="text-accent">60 000+</span> подписчиков!</h2>
             <p className="text-slate-600 dark:text-slate-300 text-lg">Каждую неделю я делюсь ценными материалами, которые помогают тысячам людей лучше понять процесс получения визы США.</p>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-b border-slate-100 dark:border-slate-700 py-6">
            {[
              { val: "2 млн+", lbl: "Ежемесячных просмотров" },
              { val: "200+", lbl: "Полезных видео и статей" },
              { val: "∞", lbl: "Ответы на комментарии по визам" }
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
          <div className="grid grid-cols-3 gap-2 w-full mt-7 lg:hidden">
              {socialLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`${link.color} ${link.mobileOrder} p-2.5 rounded-2xl text-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col items-center justify-center text-center h-[4.75rem] group`}
                >
                  <div className="w-6 h-6 flex items-center justify-center group-hover:scale-110 transition-transform">
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
              src="/media/shared/social-media-mockup.webp"
              alt="Social media mockups"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
           </div>
           <div className="grid grid-cols-6 gap-2 w-full mt-6">
              {socialLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`${link.color} ${link.mobileOrder} p-2.5 rounded-2xl text-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col items-center justify-center text-center h-20 group`}
                >
                  <div className="w-7 h-7 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <link.icon className="w-full h-full" />
                  </div>
                  <div className="mt-2">
                    <span className="font-bold text-xs block">{link.name}</span>
                  </div>
                </a>
              ))}
           </div>
        </div>

      </div>
    </Section>
  );
};
