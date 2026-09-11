export interface ArticleBlock {
  type: 'text' | 'image' | 'slider' | 'heading';
  content?: string;
  src?: string;
  images?: string[];
  alt?: string;
}

export interface ArticleData {
  id: string;
  title: string;
  description: string;
  date: string;
  author: string;
  mainImage: string;
  blocks?: ArticleBlock[];
  markdown?: string;
  href?: string;
}
