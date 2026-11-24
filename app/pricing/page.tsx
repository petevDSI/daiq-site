import type { Metadata } from 'next'
import { APP_URL, CONTACT_EMAIL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Start free with 3 valuations a month. Solo Pro $49/mo, Group Practice $149/mo, Enterprise and Advisor License available.',
  alternates: { canonical: '/pricing' },
}

interface Plan {
  tier: string
  price: string
  unit?: string
  badge?: string
  features: string[]
  cta: string
  href: string
}

const PLANS: Plan[] = [
  {
    tier: 'Free',
    price: '$0',
    unit: 'forever',
    features: ['3 valuations per month', 'FMV value range preview', '230+ brands searchable', 'No credit card'],
    cta: 'Get started free',
    href: `${APP_URL}/auth/signup`,
  },
  {
    tier: 'Solo Pro',
    price: '$49',
    unit: '/month',
    badge: 'Popular',
    features: [
      'Unlimited valuations',
      'Full equipment inventory',
      'Equipment Equity tracker',
      'Fleet Health Score',
      'Insurance coverage review',
      'Claim Readiness Score',
      'CVR PDF export',
      '1 location',
    ],
    cta: 'Start Solo Pro',
    href: `${APP_URL}/pricing`,
  },
  {
    tier: 'Group Practice',
    price: '$149',
    unit: '/month',
    badge: 'Best value',
    features: [
      'Everything in Solo Pro',
      'Up to 10 locations',
      'CAPEX Command Center',
      '3-year CAPEX forecast',
      'M&A Diligence Mode',
      'OLV reports',
      'DSO-level dashboard',
      'Bulk CSV import',
    ],
    cta: 'Start Group Practice',
    href: `${APP_URL}/pricing`,
  },
  {
    tier: 'Enterprise',
    price: 'Custom',
    unit: 'annual',
    features: [
      'Unlimited locations',
      'White-label CVR reports',
      'API access',
      'Bulk import automation',
      'Dedicated onboarding',
      'SLA and priority support',
      'Custom reporting',
    ],
    cta: 'Contact us',
    href: `mailto:${CONTACT_EMAIL}?subject=DentalAssetIQ%20Enterprise`,
  },
]

const FAQ: [string, string][] = [
  ['Is this a substitute for a certified appraisal?', 'No. DentalAssetIQ produces market-based estimates for planning, insurance review, and negotiation. If a lender, court, or the IRS requires a certified appraisal, hire a certified appraiser.'],
  ['How current is the data?', 'Valuations draw on recent market comps, typically the last 30 to 90 days, within a 180-day window.'],
  ['Can I cancel any time?', 'Yes. There are no long-term contracts on Solo Pro or Group Practice.'],
  ['What is the difference between FMV and OLV?', 'Fair market value assumes an orderly sale with time to find a buyer. Orderly liquidation value assumes a faster sale, and typically lands around 55 percent of FMV.'],
  ['Who is the Advisor License for?', 'CPAs, brokers, and consultants who value equipment for clients. It includes white-labeled reports and a client management portal.'],
  ['How is my data secured?', 'Data is stored in Supabase with row-level security and hosted on Vercel. It is never used to train models.'],
]

export default function Pricing() {
  return (
    <>
      <section className="section tight hero">
        <div className="container center">
          <p className="eyebrow">Pricing</p>
          <h1>Start free. Upgrade when it earns its keep.</h1>
          <p className="lede">Three free valuations, no credit card, and a 14-day refund if you upgrade and change your mind.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-4">
            {PLANS.map((p) => (
              <div key={p.tier} className={`card${p.badge ? ' gold' : ''}`}>
                <div className="tier">{p.tier}{p.badge ? ` · ${p.badge}` : ''}</div>
                <div className="price">
                  {p.price} {p.unit && <small>{p.unit}</small>}
                </div>
                <ul>
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <a className={`btn ${p.badge ? 'btn-gold' : 'btn-navy'}`} href={p.href}>
                  {p.cta}
                </a>
              </div>
            ))}
          </div>

          <div className="card" style={{ marginTop: 28 }}>
            <div className="tier">Advisor License</div>
            <div className="price">
              $1,997 <small>/year</small>
            </div>
            <p>
              Unlimited client appraisals, white-labeled CVR reports, a client management portal, bulk
              M&amp;A reporting, priority support, and access to the DSI advisor network.
            </p>
            <a className="btn btn-navy" href={`mailto:${CONTACT_EMAIL}?subject=DentalAssetIQ%20Advisor%20License`}>
              Ask about the Advisor License
            </a>
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="narrow">
          <h2>Questions</h2>
          {FAQ.map(([q, a]) => (
            <div key={q} className="faq-item">
              <h3>{q}</h3>
              <p>{a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
