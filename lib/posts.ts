import fs from 'node:fs'
import path from 'node:path'

export interface PostMeta {
  id: string
  slug: string
  status: string
  title: string
  tags: string[]
  pageTitle: string | null
  pageDescription: string | null
  imageUrl: string | null
  imageAlt: string | null
  publishedAt: string | null
  updatedAt: string | null
}

export interface Post extends PostMeta {
  html: string
}

const DIR = path.join(process.cwd(), 'content', 'posts')

function readMeta(file: string): PostMeta {
  return JSON.parse(fs.readFileSync(path.join(DIR, file), 'utf8')) as PostMeta
}

let cache: PostMeta[] | null = null

// Published posts only, newest first.
export function getAllPosts(): PostMeta[] {
  if (cache) return cache
  const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith('.meta.json')) : []
  cache = files
    .map(readMeta)
    .filter((p) => p.status === 'published')
    .sort((a, b) => (b.publishedAt ?? '').localeCompare(a.publishedAt ?? ''))
  return cache
}

export function getPost(slug: string): Post | null {
  const meta = getAllPosts().find((p) => p.slug === slug)
  if (!meta) return null
  const htmlPath = path.join(DIR, `${slug}.html`)
  if (!fs.existsSync(htmlPath)) return null
  return { ...meta, html: fs.readFileSync(htmlPath, 'utf8') }
}

export function relatedPosts(post: PostMeta, limit = 3): PostMeta[] {
  const mine = new Set(post.tags)
  return getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: p.tags.filter((t) => mine.has(t)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || (b.p.publishedAt ?? '').localeCompare(a.p.publishedAt ?? ''))
    .slice(0, limit)
    .map((x) => x.p)
}

// Pull the post body ready to render. The first <h1> becomes the page title,
// and any JSON-LD blocks are returned separately so they can be emitted cleanly.
export function prepareBody(html: string): { body: string; jsonLd: string[] } {
  const jsonLd: string[] = []
  let body = html.replace(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi, (_m, json: string) => {
    jsonLd.push(json.trim())
    return ''
  })
  body = body.replace(/^\s*<h1[\s\S]*?<\/h1>\s*/i, '')
  return { body, jsonLd }
}

export function formatDate(iso: string | null): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
}

export function readingMinutes(html: string): number {
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}
