import React, { useEffect, useRef } from 'react';
import { links } from '../config/links';
import { MetrikaGoalId, sendMetrikaGoal, sendMetrikaHit } from './metrika';

interface MetrikaTrackerProps {
  virtualPath: string;
  trackReading: boolean;
}

const socialGoals: Array<{ host: string; goalId: MetrikaGoalId }> = [
  { host: 'instagram.com', goalId: 'social_instagram_click' },
  { host: 'threads.com', goalId: 'social_threads_click' },
  { host: 'tiktok.com', goalId: 'social_tiktok_click' },
  { host: 'youtube.com', goalId: 'social_youtube_click' },
];

export const getMetrikaVirtualPath = (pathname: string, hash: string) => {
  const normalizedPathname = pathname.replace(/\/+$/, '') || '/';

  if (normalizedPathname === '/usa-safecase' || hash === '#/safe-case') return '/safe-case';
  if (normalizedPathname === '/mini1') return '/mini1';
  if (hash === '#/blog') return '/blog';
  if (hash === '#/policy') return '/policy';
  if (hash === '#/offer') return '/offer';
  if (hash === '#/cookies') return '/cookies';
  if (hash.startsWith('#/article/')) return `/article/${hash.replace('#/article/', '')}`;

  return normalizedPathname;
};

const getPlacement = (link: HTMLAnchorElement) => {
  if (link.closest('footer')) return 'footer';
  if (link.closest('#contact')) return 'contact';
  if (link.closest('#socials')) return 'socials';
  if (link.closest('[data-service-card]')) return 'services';
  if (link.closest('article')) return 'article';
  return 'other';
};

const sameUrl = (first: string, second: string) => first === second;

export const MetrikaTracker: React.FC<MetrikaTrackerProps> = ({ virtualPath, trackReading }) => {
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    const sendCurrentHit = () => {
      if (lastTrackedPath.current === virtualPath) return;

      sendMetrikaHit(virtualPath);
      if (typeof window.ym === 'function') {
        lastTrackedPath.current = virtualPath;
      }
    };

    sendCurrentHit();
    window.addEventListener('safevisa-metrika-ready', sendCurrentHit);
    return () => window.removeEventListener('safevisa-metrika-ready', sendCurrentHit);
  }, [virtualPath]);

  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>('a[href]');
      if (!link) return;

      const destination = link.href;
      const placement = getPlacement(link);

      if (sameUrl(destination, links.telegram.siteInvite) || sameUrl(destination, links.telegram.consultation)) {
        sendMetrikaGoal('ym-open-chat', { messenger: 'telegram', placement });
        return;
      }

      if (sameUrl(destination, links.telegram.channel)) {
        sendMetrikaGoal('social_telegram_click', { network: 'telegram', placement });
        return;
      }

      const url = new URL(destination);
      if (url.hostname.endsWith('max.ru')) {
        sendMetrikaGoal(placement === 'contact' ? 'ym-open-chat' : 'social_max_click', {
          network: 'max',
          placement,
        });
        return;
      }

      const socialGoal = socialGoals.find(({ host }) => url.hostname.endsWith(host));
      if (socialGoal) {
        sendMetrikaGoal(socialGoal.goalId, { network: socialGoal.goalId.replace('social_', '').replace('_click', ''), placement });
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);

  useEffect(() => {
    if (!trackReading) return;

    const reachedGoals = new Set<MetrikaGoalId>();
    const scrollMilestones: Array<[number, MetrikaGoalId]> = [
      [25, 'content_scroll_25'],
      [50, 'content_scroll_50'],
      [75, 'content_scroll_75'],
      [90, 'content_scroll_90'],
    ];
    const timeMilestones: Array<[number, MetrikaGoalId]> = [
      [30, 'content_engaged_30s'],
      [60, 'content_engaged_60s'],
      [120, 'content_engaged_120s'],
    ];
    let maxScrollDepth = 0;
    let accumulatedVisibleMs = 0;
    let visibleSince = document.hidden ? null : performance.now();

    const goalParams = () => ({ content_path: virtualPath });
    const sendOnce = (goalId: MetrikaGoalId) => {
      if (reachedGoals.has(goalId)) return;
      reachedGoals.add(goalId);
      sendMetrikaGoal(goalId, goalParams());
    };

    const getEngagedSeconds = () => {
      const currentVisibleMs = visibleSince ? performance.now() - visibleSince : 0;
      return Math.floor((accumulatedVisibleMs + currentVisibleMs) / 1000);
    };

    const checkReadingComplete = () => {
      if (maxScrollDepth >= 90 && getEngagedSeconds() >= 60) {
        sendOnce('content_read_complete');
      }
    };

    const checkScrollDepth = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentDepth = scrollableHeight > 0
        ? Math.min(100, Math.round(((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100))
        : 100;
      maxScrollDepth = Math.max(maxScrollDepth, currentDepth);

      scrollMilestones.forEach(([threshold, goalId]) => {
        if (maxScrollDepth >= threshold) sendOnce(goalId);
      });
      checkReadingComplete();
    };

    const checkTime = () => {
      const seconds = getEngagedSeconds();
      timeMilestones.forEach(([threshold, goalId]) => {
        if (seconds >= threshold) sendOnce(goalId);
      });
      checkReadingComplete();
    };

    const handleVisibilityChange = () => {
      if (document.hidden && visibleSince !== null) {
        accumulatedVisibleMs += performance.now() - visibleSince;
        visibleSince = null;
      }

      if (!document.hidden && visibleSince === null) {
        visibleSince = performance.now();
      }
    };

    checkScrollDepth();
    const interval = window.setInterval(checkTime, 1_000);
    window.addEventListener('scroll', checkScrollDepth, { passive: true });
    window.addEventListener('resize', checkScrollDepth);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener('scroll', checkScrollDepth);
      window.removeEventListener('resize', checkScrollDepth);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [trackReading, virtualPath]);

  return null;
};
