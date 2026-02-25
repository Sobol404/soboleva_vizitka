import React from 'react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { Send } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <Section id="contact" className="bg-light">
      <div className="flex flex-col md:flex-row gap-16 items-center justify-center">
        
        <div className="flex-1 space-y-8 text-center md:text-left max-w-xl">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-dark mb-4">Свяжитесь со мной</h2>
            <h3 className="text-2xl md:text-4xl font-semibold text-dark/90 mb-6">Остались вопросы?</h3>
            <p className="text-xl md:text-2xl text-slate-600 mb-8">
              Напишите мне в Telegram, и мы обсудим вашу ситуацию.
            </p>
            
            <a href="https://t.me/m/e1XHDdGVNDAy" target="_blank" rel="noopener noreferrer">
                <Button fullWidth className="text-xl py-6 gap-3">
                    <Send className="w-6 h-6" />
                    СВЯЗАТЬСЯ
                </Button>
            </a>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
            <img 
              src="https://con.xl.ru/wiXOCZKs0k2ilUIgAhgUDA/images/yZBOQzcq-USoRfWkKyMnPw.png"
              alt="Contact mockups"
              className="w-full max-w-md"
              loading="lazy"
              decoding="async"
            />
        </div>

      </div>
    </Section>
  );
};