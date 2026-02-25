export interface ArticleBlock {
  type: 'text' | 'image' | 'slider' | 'heading';
  content?: string;
  src?: string;
  images?: string[];
  alt?: string;
}

export interface ArticleData {
  id: string; // URL slug: 'kak-poluchit-vizu'
  title: string;
  description: string; // SEO meta
  date: string;
  author: string;
  mainImage: string;
  blocks: ArticleBlock[];
}