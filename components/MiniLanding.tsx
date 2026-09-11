import React, { useEffect, useMemo } from 'react';
import miniLandingSource from '../content/mini1/source.html?raw';
import { links } from '../config/links';

const extractBlock = (source: string, pattern: RegExp, label: string) => {
  const match = source.match(pattern);
  if (!match?.[1]) throw new Error(`Не удалось извлечь ${label} из mini1`);
  return match[1];
};

/**
 * The campaign source remains a single canonical HTML snapshot until supplied
 * media is approved. This component only gives that snapshot an application
 * route and connects its two existing Telegram calls to the shared registry.
 */
export const MiniLanding: React.FC = () => {
  const styles = useMemo(
    () => extractBlock(miniLandingSource, /<style>([\s\S]*?)<\/style>/i, 'стили'),
    [],
  );
  const markup = useMemo(
    () => extractBlock(miniLandingSource, /<body>([\s\S]*?)<\/body>/i, 'разметку')
      .replaceAll(
        '<button class="cta-btn">',
        `<a class="cta-btn" href="${links.telegram.channel}" target="_blank" rel="noopener noreferrer">`,
      )
      .replaceAll('</button>', '</a>'),
    [],
  );

  useEffect(() => {
    document.title = 'Safe Case — короткий лендинг';
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: `<style>${styles}</style>${markup}` }} />
  );
};
