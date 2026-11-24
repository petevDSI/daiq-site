import Link from 'next/link'
import { getAllPosts, formatDate } from '@/lib/posts'
import { APP_URL, SCAN_URL, DSI_URL, DOWNLOADS } from '@/lib/site'
import LeadForm from '@/components/LeadForm'
import { ValueCard, ValueIcon, FleetIcon, ShieldIcon } from '@/components/HomeArt'

export default function Home() {
  const latest = getAllPosts().slice(0, 3)
  return (
    <>
      <section className="section hero">
        <div className="container hero-split hero-home">
          <div>
            <p className="eyebrow">Dental equipment valuation</p>
            <h1>Point. Scan. Know what it&apos;s worth.</h1>
            <p className="lede">
              Scan an equipment tag and get a valuation built on 180 days of market comps. Built for
              practice owners, DSOs, CPAs, and M&amp;A advisors who are tired of guessing.
            </p>
            <div className="btn-row">
              <a className="btn btn-gold" href={SCAN_URL}>Scan a tag</a>
              <a className="btn btn-outline" href={`${APP_URL}/auth/signup`}>Create a free account</a>
            </div>
          </div>
          <div className="hero-photo">
            <img
              src="/images/hero-office.jpg"
              alt="Dental operatory with a treatment chair, delivery unit, wall-mounted monitor, and a laptop on a mobile cart"
              width={966}
              height={782}
              fetchPriority="high"
            />
            <ValueCard />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split-media">
            <div>
              <h2>Every operatory is an asset ledger nobody keeps</h2>
              <p className="lede">
                Chairs, lights, sterilizers, compressors, CBCT units. They sit on the balance sheet at
                depreciated cost, in the insurance policy at a guess, and in a sale negotiation at
                whatever the loudest person says. DentalAssetIQ puts a defensible number on each one.
              </p>
            </div>
            <img
              className="photo-round"
              src="/images/operatory-imaging.jpg"
              alt="Dental operatory with a wall-mounted X-ray unit, chair, and imaging monitor"
              width={1400}
              height={744}
              loading="lazy"
            />
          </div>
          <div className="grid grid-3" style={{ marginTop: 32 }}>
            <div className="card">
              <ValueIcon />
              <h3>Fair market value</h3>
              <p>Valuations that start from real sales, not list prices, with a clear confidence level on every result.</p>
            </div>
            <div className="card">
              <FleetIcon />
              <h3>Fleet health and CapEx</h3>
              <p>See what is aging out, what it will cost to replace, and plan three years ahead instead of reacting to a failure.</p>
            </div>
            <div className="card">
              <ShieldIcon />
              <h3>Insurance and diligence</h3>
              <p>Claim-ready documentation and M&amp;A diligence reports, so nobody scrambles after a loss or in the middle of a deal.</p>
            </div>
          </div>
          <div className="btn-row">
            <Link className="btn btn-navy" href="/features">See every feature</Link>
            <Link className="btn btn-outline" href="/pricing">See pricing</Link>
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <div className="split-media reverse">
            <img
              className="photo-round"
              src="/images/advisors-team.jpg"
              alt="Advisors and practice leaders reviewing financial documents together"
              width={1200}
              height={675}
              loading="lazy"
            />
            <h2>Made for the people who sign off on equipment</h2>
          </div>
          <div className="grid grid-4" style={{ marginTop: 24 }}>
            {[
              ['Practice owners', 'Know the number before an insurer, a lender, or a buyer tells you theirs.'],
              ['DSOs', 'Standardize, forecast, and negotiate across locations with one consistent method.'],
              ['CPAs', 'Document equipment for your dental clients without chasing receipts.'],
              ['Advisors', 'Bring equipment values into valuations and deal work, under your own name.'],
            ].map(([t, d]) => (
              <div key={t} className="card">
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
          <div className="btn-row">
            <Link className="btn btn-outline" href="/who-its-for">Find your fit</Link>
          </div>
        </div>
      </section>

      {latest.length > 0 && (
        <section className="section">
          <div className="container">
            <h2>From the blog</h2>
            <div className="grid grid-3" style={{ marginTop: 24 }}>
              {latest.map((p) => (
                <div key={p.slug} className="card">
                  <h3>
                    <Link href={`/blog/${p.slug}`} style={{ color: 'var(--navy)', textDecoration: 'none' }}>
                      {p.title}
                    </Link>
                  </h3>
                  <p className="meta">{formatDate(p.publishedAt)}</p>
                  {p.pageDescription && <p>{p.pageDescription}</p>}
                </div>
              ))}
            </div>
            <div className="btn-row">
              <Link className="btn btn-outline" href="/blog">All articles</Link>
            </div>
          </div>
        </section>
      )}

      <section className="section bg-gold-tint">
        <div className="narrow center">
          <h2>Start with a free guide</h2>
          <p className="lede">{DOWNLOADS.length} practical worksheets and checklists, free.</p>
          <div className="btn-row">
            <Link className="btn btn-navy" href="/resources">Browse free guides</Link>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="narrow center">
          <p>
            DentalAssetIQ is a product of{' '}
            <a href={DSI_URL}>Dental Strategy Institute</a>, the publisher of books, courses, and
            calculators for dental practice owners, DSO leaders, and advisors.
          </p>
          <LeadForm list="newsletter" buttonLabel="Subscribe" source="home" />
          <p className="photo-credit" style={{ marginTop: 20 }}>
            Photos via <a href="https://unsplash.com">Unsplash</a>. Valuation card shown is sample data.
          </p>
        </div>
      </section>
    </>
  )
}
