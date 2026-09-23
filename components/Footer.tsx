import React from 'react';
import { AtSign, Instagram, Mail, Phone, Send, Youtube } from 'lucide-react';
import { links } from '../config/links';
import { legalLinks } from './LegalLinks';

type FooterProps = {
  /** Компактная версия используется в коротком рекламном лендинге. */
  compact?: boolean;
};

export const Footer: React.FC<FooterProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <footer className="border-t border-slate-800 bg-dark py-4 text-slate-300 sm:py-5">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="space-y-2.5">
            <div className="space-y-2.5 md:grid md:grid-cols-3 md:items-start md:gap-x-12 md:space-y-0">
              <div>
                <div className="text-xl font-bold tracking-tight text-white">
                  Safe Visa<span className="text-accent">.</span>
                </div>
                <p className="mt-1 mb-0 text-xs leading-relaxed text-slate-300">
                  ИП Соболева Ирина Андреевна
                </p>
                <p className="m-0 whitespace-nowrap text-[10px] leading-relaxed text-slate-300 sm:text-xs">
                  ИНН: 343523500039 · ОГРНИП: 325774600606207 · г. Москва
                </p>
              </div>

              <div className="space-y-2.5 md:pt-8">
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs leading-relaxed text-slate-300">
                  <a className="transition-colors hover:text-white" href="tel:+79015009901">
                    +7 901 500-99-01
                  </a>
                  <a className="transition-colors hover:text-white" href="mailto:irina.sapozhkova@gmail.com">
                    irina.sapozhkova@gmail.com
                  </a>
                </div>
                <a
                  className="inline-flex w-fit items-center gap-2 text-xs font-bold text-primary transition-colors hover:text-white"
                  href={links.telegram.siteInvite}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Send aria-hidden="true" size={14} />
                  Связаться
                </a>
              </div>

              <nav aria-label="Социальные сети" className="flex flex-nowrap items-center gap-2 md:justify-self-start md:pt-8">
              <a
                aria-label="Telegram"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-600 text-slate-200 transition-colors hover:border-slate-300 hover:text-white"
                href={links.telegram.channel}
                target="_blank"
                rel="noopener noreferrer"
                title="Telegram"
              >
                <Send aria-hidden="true" size={15} strokeWidth={2.2} />
              </a>
              <a
                aria-label="Instagram"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-600 text-slate-200 transition-colors hover:border-slate-300 hover:text-white"
                href={links.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
              >
                <Instagram aria-hidden="true" size={15} strokeWidth={2.1} />
              </a>
              <a
                aria-label="Threads"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-600 text-slate-200 transition-colors hover:border-slate-300 hover:text-white"
                href={links.social.threads}
                target="_blank"
                rel="noopener noreferrer"
                title="Threads"
              >
                <AtSign aria-hidden="true" size={16} strokeWidth={2.1} />
              </a>
              <a
                aria-label="YouTube"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-600 text-slate-200 transition-colors hover:border-slate-300 hover:text-white"
                href={links.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
              >
                <Youtube aria-hidden="true" size={16} strokeWidth={2.1} />
              </a>
              <a
                aria-label="MAX"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-600 text-slate-200 transition-colors hover:border-slate-300 hover:text-white"
                href={links.social.max}
                target="_blank"
                rel="noopener noreferrer"
                title="MAX"
              >
                <span aria-hidden="true" className="text-[9px] font-extrabold tracking-[-0.08em]">MAX</span>
              </a>
              </nav>
            </div>

            <div className="flex flex-col gap-1.5 border-t border-slate-800 pt-2.5 text-xs leading-relaxed text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <span>© {new Date().getFullYear()} Safe Visa. Все права защищены.</span>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                {legalLinks.map((link) => (
                  <a key={link.href} href={link.href} className="transition-colors hover:text-slate-300">{link.label}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

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
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-end">
            {legalLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-slate-300 transition-colors">{link.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
