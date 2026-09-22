/**
 * Единый реестр внешних ссылок основного React-сайта.
 * Перед публикацией значения сверяются с ../CTA_LINKS.md.
 */
export const links = {
  telegram: {
    consultation: 'https://t.me/m/e1XHDdGVNDAy',
    /** Инвайт-ссылка сайта-визитки с заготовленным текстом обращения. */
    siteInvite: 'https://t.me/m/BxmN-BQSOWVi',
    channel: 'https://t.me/+70mVsQp7SOFiYTE6',
  },
  social: {
    instagram: 'https://instagram.com/irene_sa',
    threads: 'https://www.threads.com/@irene_sa',
    tiktok: 'https://www.tiktok.com/@irene..sa',
    youtube: 'https://www.youtube.com/@irene_sa',
    max: 'https://max.ru/id343523500039_biz',
  },
  capture: {
    consultationForm: null,
    safeCaseForm: null,
    botStart: null,
  },
} as const;
