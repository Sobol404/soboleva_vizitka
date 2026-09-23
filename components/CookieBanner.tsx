import React, { useEffect, useState } from 'react';

const CONSENT_STORAGE_KEY = 'safevisa-cookie-consent';

type ConsentValue = 'accepted' | 'rejected';

export const CookieBanner: React.FC = () => {
  const [consent, setConsent] = useState<ConsentValue | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedConsent = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (savedConsent === 'accepted' || savedConsent === 'rejected') {
      setConsent(savedConsent);
    }

    const frame = window.requestAnimationFrame(() => setIsReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const chooseConsent = (value: ConsentValue) => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    if (value === 'accepted') {
      window.initSafeVisaMetrika?.();
    }
    setConsent(value);
  };

  const isVisible = isReady && consent === null;

  return (
    <aside
      aria-label="Уведомление об использовании cookie"
      aria-live="polite"
      aria-hidden={!isVisible}
      className={`fixed inset-x-3 bottom-3 z-[70] overflow-hidden rounded-[1.35rem] border border-white/20 bg-[linear-gradient(135deg,rgba(29,56,68,0.9),rgba(46,72,95,0.76))] px-4 py-4 text-white shadow-[0_24px_70px_rgba(15,23,42,0.32)] backdrop-blur-2xl transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:inset-x-5 sm:bottom-5 sm:px-5 md:inset-x-8 md:bottom-8 md:rounded-[1.5rem] md:px-6 md:py-5 lg:mx-auto lg:max-w-6xl ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[125%] opacity-0'
      } motion-reduce:transition-none`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-52 w-52 rounded-full bg-primary/30 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 left-1/4 h-40 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
        <div className="min-w-0">
          <h2 className="text-lg font-bold leading-tight sm:text-xl">Мы используем cookie-файлы</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Мы используем cookie-файлы для корректной работы сайта и аналитики. Продолжая пользоваться сайтом, вы
            соглашаетесь с нашей{' '}
            <a className="text-primary underline decoration-primary/70 underline-offset-2 hover:text-white" href="/privacy">политикой обработки персональных данных</a>{' '}
            и{' '}
            <a className="text-primary underline decoration-primary/70 underline-offset-2 hover:text-white" href="/cookies">политикой использования файлов cookie</a>.
          </p>
        </div>
        <div className="flex shrink-0 flex-row gap-2 md:items-center">
          <button
            type="button"
            onClick={() => chooseConsent('rejected')}
            disabled={!isVisible}
            className="rounded-xl border border-white/45 bg-white/[0.06] px-5 py-3 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white/[0.13] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Отказаться
          </button>
          <button
            type="button"
            onClick={() => chooseConsent('accepted')}
            disabled={!isVisible}
            className="rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/30 transition-colors hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Принять
          </button>
        </div>
      </div>
    </aside>
  );
};
