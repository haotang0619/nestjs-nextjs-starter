import { MetadataRoute } from 'next';

const siteUrl = 'https://www.nextjs-starter.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { allow: '/', userAgent: '*' },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
