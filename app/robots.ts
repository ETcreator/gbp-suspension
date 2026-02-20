import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/wizard', '/api/'],
    },
    sitemap: 'https://www.profil-gesperrt.de/sitemap.xml',
  }
}