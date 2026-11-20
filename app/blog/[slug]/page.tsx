import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, getPost, prepareBody, relatedPosts, formatDate, readingMinutes } from '@/lib/posts'
import { SITE_URL, SCAN_URL, DSI_URL } from '@/lib/site'
import LeadForm from '@/components/LeadForm'

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.pageTitle ?? post.title,
    description: post.pageDescription ?? undefined,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.pageTitle ?? post.title,
      description: post.pageDescription ?? undefined,
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt ?? undefined,
      images: post.imageUrl ? [post.imageUrl] : undefined,
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const { body, jsonLd } = prepareBody(post.html)
  const related = relatedPosts(post)

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.pageDescription ?? undefined,
    image: post.imageUrl ?? undefined,
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.updatedAt ?? post.publishedAt ?? undefined,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    author: { '@type': 'Person', name: 'Pete Volk' },
    publisher: { '@type': 'Organization', name: 'DentalAssetIQ', url: SITE_URL },
  }

  return (
    <>
      <section className="section tight hero">
        <div className="narrow">
          <p className="eyebrow">
            <Link href="/blog" style={{ color: 'var(--gold-deep)', textDecoration: 'none' }}>
              DentalAssetIQ Blog
            </Link>
          </p>
          <h1>{post.title}</h1>
          <p className="meta">
            By Pete Volk, <a href={DSI_URL}>Dental Strategy Institute</a> ·{' '}
            {formatDate(post.publishedAt)} · {readingMinutes(post.html)} min read
          </p>
        </div>
      </section>

      <article className="section tight">
        <div className="narrow prose" dangerouslySetInnerHTML={{ __html: body }} />
        <div className="narrow" style={{ marginTop: 24 }}>
          {post.tags.slice(0, 8).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      </article>

      <section className="section tight bg-gold-tint">
        <div className="narrow center">
          <h2>See what your equipment is worth</h2>
          <p className="lede">Point your phone at an equipment tag and get a valuation built on market comps.</p>
          <div className="btn-row">
            <a className="btn btn-navy" href={SCAN_URL}>
              Scan a tag
            </a>
            <Link className="btn btn-outline" href="/pricing">
              See plans
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section tight">
          <div className="container">
            <h2>Keep reading</h2>
            <div className="grid grid-3">
              {related.map((p) => (
                <div key={p.slug} className="card">
                  <h3>
                    <Link href={`/blog/${p.slug}`} style={{ color: 'var(--navy)', textDecoration: 'none' }}>
                      {p.title}
                    </Link>
                  </h3>
                  <p className="meta">{formatDate(p.publishedAt)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section tight bg-light">
        <div className="narrow">
          <h3>Get new valuation guides by email</h3>
          <LeadForm list="newsletter" buttonLabel="Subscribe" source={`blog:${post.slug}`} />
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      {jsonLd.map((j, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: j }} />
      ))}
    </>
  )
}
