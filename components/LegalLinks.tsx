import React from 'react';

const legalLinks = [
  { href: '/privacy', label: 'Политика обработки ПДн' },
  { href: '/policy', label: 'Согласие для заявки' },
  { href: '/client-data-consent', label: 'Согласие клиента' },
  { href: '/advertising-consent', label: 'Согласие на рекламу' },
  { href: '/cookies', label: 'Политика cookie' },
  { href: '/offer', label: 'Договор оферты' },
];

export const LegalLinks: React.FC = () => (
  <nav
    aria-label="Связанные юридические документы"
    className="rounded-2xl border border-slate-200 bg-light-200 p-5 dark:border-slate-700 dark:bg-slate-800"
  >
    <p className="mb-3 text-sm font-bold text-dark dark:text-white">Связанные документы</p>
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
      {legalLinks.map((link) => (
        <a
          key={link.href}
          className="font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-hover"
          href={link.href}
        >
          {link.label}
        </a>
      ))}
    </div>
  </nav>
);

export { legalLinks };
