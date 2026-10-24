export interface BlogPost {
  slug: string;
  title: string;
  titleNep: string;
  excerpt: string;
  excerptNep: string;
  category: 'Tax & Law' | 'Banking & Loans' | 'Gold & Wealth' | 'Land & Real Estate' | 'Citizen Services' | 'Utilities & Daily';
  publishedDate: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  toolLink: {
    title: string;
    href: string;
    iconText: string;
  };
  keywords: string[];
  content: {
    intro: string;
    keyTakeaways: string[];
    sections: {
      heading: string;
      body: string;
      table?: {
        headers: string[];
        rows: string[][];
      };
      tip?: string;
    }[];
    conclusion: string;
  };
}
