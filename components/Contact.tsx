import React from 'react';
import { Section } from './ui/Section';
import { MessageCircle, Send } from 'lucide-react';
import { links } from '../config/links';

export const Contact: React.FC = () => {
  return (
    <Section id="contact" className="bg-light dark:bg-dark-deep">
      <div className="flex flex-col md:flex-row gap-16 items-center justify-center">

        <div className="flex-1 space-y-8 text-center md:text-left max-w-xl">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-dark dark:text-white mb-4">Свяжитесь со мной</h2>
            <h3 className="text-xl sm:text-2xl md:text-4xl font-semibold text-dark/90 dark:text-slate-200 mb-6">Остались вопросы?</h3>
            <p className="text-base sm:text-lg md:text-2xl text-slate-600 dark:text-slate-400 mb-8">
              Напишите мне в мессенджер, и мы обсудим вашу ситуацию.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={links.telegram.consultation}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 px-8 py-5 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-500 hover:to-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <Send className="h-6 w-6" />
                Telegram
              </a>
              <a
                href={links.social.max}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 px-8 py-5 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
              >
                <MessageCircle className="h-6 w-6" />
                Макс
              </a>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
            <img
              src="/media/shared/contact-telegram-mockup.png"
              alt="Contact mockups"
              className="w-full max-w-xl"
              loading="lazy"
              decoding="async"
            />
        </div>

      </div>
    </Section>
  );
};
