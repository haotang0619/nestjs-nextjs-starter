import { MetadataRoute } from 'next';

import { HOME_PAGE } from '@/constants/pages';

const siteUrl = 'https://www.nextjs-starter.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${siteUrl}${HOME_PAGE}` }];
}
