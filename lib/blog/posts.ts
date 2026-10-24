export * from './types';
import { BlogPost } from './types';

import { taxAndLawPosts } from './posts/taxAndLaw';
import { bankingAndFinancePosts } from './posts/bankingAndFinance';
import { goldAndStocksPosts } from './posts/goldAndStocks';
import { landAndRealEstatePosts } from './posts/landAndRealEstate';
import { citizenServicesPosts } from './posts/citizenServices';
import { educationAndHealthPosts } from './posts/educationAndHealth';
import { utilitiesAndDailyPosts } from './posts/utilitiesAndDaily';

export const BLOG_POSTS: BlogPost[] = [
  ...taxAndLawPosts,
  ...bankingAndFinancePosts,
  ...goldAndStocksPosts,
  ...landAndRealEstatePosts,
  ...citizenServicesPosts,
  ...educationAndHealthPosts,
  ...utilitiesAndDailyPosts,
];
