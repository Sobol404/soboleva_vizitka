import React from 'react';
import { Phone, Mail } from 'lucide-react';

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
              ИП Соболева Ирина Александровна<br />
              ИНН: 772806543210<br />
              ОГРНИП: 314774600012345
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
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase text-xs tracking-widest">Соцсети</h4>
            <div className="flex gap-6 text-sm">
              <a href="https://t.me/+70mVsQp7SOFiYTE6" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Telegram</a>
              <a href="https://instagram.com/irene_sa" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
              <a href="https://www.youtube.com/@irene_sa" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">YouTube</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 border-t border-slate-800 pt-8">
          <div className="flex items-center gap-2">
             <span>&copy; {new Date().getFullYear()} Safe Visa. Все права защищены.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Договор оферты</a>
          </div>
        </div>
      </div>
    </footer>
  );
};