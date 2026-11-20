import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, formatDate } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Dental Equipment Valuation Blog',
  description:
    'Guides on dental equipment fair market value, CapEx planning, insurance documentation, and M&A diligence, from DentalAssetIQ.',
  alternates: { canonical: '/blog' },
}

export default function BlogIndex() {
  const posts = getAllPosts()
  return (
    <>
      <section className="section tight hero">
        <div className="container">
          <p className="eyebrow">The DentalAssetIQ blog</p>
          <h1>What your dental equipment is worth, and why it matters</h1>
          <p className="lede">
            Plain-English guides on valuation, replacement decisions, insurance, and equipment in
            practice sales.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="post-list">
            {posts.map((p) => (
              <article key={p.slug} className="post-item">
                {p.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.imageUrl} alt={p.imageAlt ?? p.title} loading="lazy" />
                ) : (
                  <div style={{ aspectRatio: '16/9', background: 'var(--navy-tint)', borderRadius: 8 }} />
                )}
                <div>
                  <h3>
                    <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <p className="meta">{formatDate(p.publishedAt)}</p>
                  {p.pageDescription && <p>{p.pageDescription}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
