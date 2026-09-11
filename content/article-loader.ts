import { ArticleData } from '../articles/types';

type Frontmatter = Record<string, string>;

const articleFiles = import.meta.glob('./articles/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const unquote = (value: string) => value.replace(/^['"]|['"]$/g, '').trim();

const parseArticle = (path: string, source: string): ArticleData => {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  const metadata: Frontmatter = {};
  const rawBody = match ? match[2].trim() : source.trim();
  const body = rawBody.replace(/^#\s+.+\n+/, '');

  if (match) {
    match[1].split('\n').forEach((line) => {
      const field = line.match(/^([\w-]+):\s*(.*)$/);
      if (field) metadata[field[1]] = unquote(field[2]);
    });
  }

  const id = metadata.slug || path.split('/').pop()?.replace(/\.md$/, '') || 'article';

  return {
    id,
    title: metadata.title || 'Черновик статьи',
    description: metadata.description || 'Описание статьи пока не заполнено.',
    date: metadata.date || '',
    author: metadata.author || 'Ирина Соболева',
    mainImage: metadata.cover || '',
    markdown: body,
  };
};

export const markdownArticles = Object.entries(articleFiles)
  .map(([path, source]) => parseArticle(path, source))
  .sort((a, b) => b.date.localeCompare(a.date));
