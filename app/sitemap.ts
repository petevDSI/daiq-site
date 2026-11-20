import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/features', '/who-its-for', '/pricing', '/resources', '/blog', '/about', '/contact', '/privacy']
  const staticEntries = pages.map((p) => ({
    url: `${SITE_URL}${p}`,
    changeFrequency: 'monthly' as const,
    priority: p === '' ? 1 : 0.8,
  }))
  const posts = getAllPosts().map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.updatedAt ?? p.publishedAt ?? undefined,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  return [...staticEntries, ...posts]
}
