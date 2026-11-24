import type { Metadata } from 'next'
import Link from 'next/link'
import { APP_URL, CONTACT_EMAIL } from '@/lib/site'

export const metadata: Metadata = {
  title: "Who It's For",
  description:
    'DentalAssetIQ serves practice owners, DSOs, CPAs, and M&A advisors who need defensible dental equipment values.',
  alternates: { canonical: '/who-its-for' },
}

const CARD_ART: Record<string, string> = {
  'Practice owners': '/images/audience-chair.webp',
  'DSOs and group practices': '/images/audience-dso.webp',
  'CPAs and bookkeepers': '/images/audience-cpa.webp',
  'M&A advisors and brokers': '/images/audience-adv.webp',
}

const AUDIENCES: { title: string; body: string; plan: string }[] = [
  {
    title: 'Practice owners',
    body: 'Before you renew insurance, apply for a loan, or talk to a buyer, know what your operatories are worth. The Solo Pro plan keeps a living inventory and a claim-ready record.',
    plan: 'Free or Solo Pro',
  },
  {
    title: 'DSOs and group practices',
    body: 'Forecast CapEx across locations, standardize on equipment that holds value, and arrive at diligence with the schedule already built.',
    plan: 'Group Practice or Enterprise',
  },
  {
    title: 'CPAs and bookkeepers',
    body: 'Give your dental clients a documented equipment record that supports depreciation questions, buy-sell agreements, and succession planning.',
    plan: 'Solo Pro, or Advisor License',
  },
  {
    title: 'M&A advisors and brokers',
    body: 'Price the equipment side of a practice sale with market comps, and deliver white-labeled reports to your clients.',
    plan: 'Advisor License',
  },
]

export default function WhoItsFor() {
  return (
    <>
      <section className="section tight hero">
        <div className="container hero-split">
          <div>
            <p className="eyebrow">Who it&apos;s for</p>
            <h1>If you sign off on equipment, this is for you</h1>
            <p className="lede">
              Owners, DSOs, CPAs, and advisors all need the same thing: a defensible number for what
              the equipment is worth today.
            </p>
            <div className="btn-row">
              <a className="btn btn-gold" href={`${APP_URL}/auth/signup`}>Get started free</a>
              <Link className="btn btn-outline" href="/pricing">Compare plans</Link>
            </div>
          </div>
          <div className="hero-art">
            <img
              src="/images/audience-hero.webp"
              alt="Four audiences who sign off on equipment: practice owners, DSOs, CPAs, and M&A advisors"
              width={1200}
              height={857}
              style={{ display: 'block', width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            {AUDIENCES.map((a) => {
              const art = CARD_ART[a.title]
              return (
                <div key={a.title} className="card card-visual">
                  {art && (
                    <div className="card-art">
                      <img src={art} alt="" width={800} height={534} loading="lazy" style={{ display: 'block', width: '100%', height: 'auto' }} />
                    </div>
                  )}
                  <div className="card-body">
                    <h3>{a.title}</h3>
                    <p>{a.body}</p>
                    <p className="meta">Best fit: {a.plan}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <p className="form-note" style={{ marginTop: 14 }}>Screens shown are illustrations with sample data.</p>
          <div className="btn-row">
            <a className="btn btn-gold" href={`${APP_URL}/auth/signup`}>Get started free</a>
            <Link className="btn btn-outline" href="/pricing">Compare plans</Link>
            <a className="btn btn-outline" href={`mailto:${CONTACT_EMAIL}`}>Talk to us</a>
          </div>
        </div>
      </section>
    </>
  )
}
