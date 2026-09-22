import React from 'react';
import { Phone, Mail, Send } from 'lucide-react';
import { links } from '../config/links';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-slate-300 py-12 border-t border-slate-800">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <div className="text-2xl font-bold text-white tracking-tight">
                Safe Visa<span className="text-accent">.</span>
            </div>
            <div className="text-sm text-slate-400 leading-relaxed">
              ИП Соболева Ирина Андреевна<br />
              ИНН: 343523500039<br />
              ОГРНИП: 325774600606207<br />
              г. Москва, 117628, Новоясеневский проспект, д. 12, корп. 1, кв. 293
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase text-xs tracking-widest">Контакты</h4>
            <div className="flex flex-col gap-3 text-sm text-slate-400">
                <div className="flex items-center gap-2 hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                    <span>+7 901 500-99-01</span>
                </div>
                <div className="flex items-center gap-2 hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                    <span>irina.sapozhkova@gmail.com</span>
                </div>
                <a
                  href={links.telegram.siteInvite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-fit items-center gap-2 text-primary transition-colors hover:text-white"
                >
                    <Send className="w-4 h-4" />
                    <span>Связаться</span>
                </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase text-xs tracking-widest">Соцсети</h4>
            <div className="flex gap-6 text-sm">
              <a href={links.telegram.channel} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Telegram</a>
              <a href={links.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
              <a href={links.social.threads} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Threads</a>
              <a href={links.social.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a>
              <a href={links.social.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 border-t border-slate-800 pt-8">
          <div className="flex items-center gap-2">
             <span>&copy; {new Date().getFullYear()} Safe Visa. Все права защищены.</span>
          </div>
          <div className="flex gap-6">
            <a href="#/policy" className="hover:text-slate-300 transition-colors">Согласие на обработку ПДн</a>
            <a href="#/offer" className="hover:text-slate-300 transition-colors">Договор оферты</a>
            <a href="#/cookies" className="hover:text-slate-300 transition-colors">Политика cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
