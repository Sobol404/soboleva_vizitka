export const METRIKA_COUNTER_ID = 100030291;

export type MetrikaGoalId =
  | 'ym-open-chat'
  | 'social_telegram_click'
  | 'social_instagram_click'
  | 'social_threads_click'
  | 'social_tiktok_click'
  | 'social_youtube_click'
  | 'social_max_click'
  | 'content_scroll_25'
  | 'content_scroll_50'
  | 'content_scroll_75'
  | 'content_scroll_90'
  | 'content_engaged_30s'
  | 'content_engaged_60s'
  | 'content_engaged_120s'
  | 'content_read_complete';

export type MetrikaParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    ym?: (counterId: number, method: string, ...args: unknown[]) => void;
    initSafeVisaMetrika?: () => void;
  }
}

export const sendMetrikaGoal = (goalId: MetrikaGoalId, params?: MetrikaParams) => {
  if (typeof window === 'undefined' || typeof window.ym !== 'function') return;
  window.ym(METRIKA_COUNTER_ID, 'reachGoal', goalId, params);
};

export const sendMetrikaHit = (virtualPath: string) => {
  if (typeof window === 'undefined' || typeof window.ym !== 'function') return;

  window.ym(METRIKA_COUNTER_ID, 'hit', new URL(virtualPath, window.location.origin).href, {
    title: document.title,
  });
};
