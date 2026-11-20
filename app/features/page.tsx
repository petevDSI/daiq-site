import type { Metadata } from 'next'
import Link from 'next/link'
import { APP_URL, SCAN_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Equipment valuation, Equipment Equity tracking, Fleet Health Score, insurance review, CapEx forecasting, and M&A diligence for dental practices and DSOs.',
  alternates: { canonical: '/features' },
}

const FEATURES: [string, string][] = [
  ['Tag scanning', 'Photograph an equipment tag and the app identifies the make and model, then returns a valuation range with its comps.'],
  ['Fair market value', 'Valuations come from 180 days of market comps across 230+ brands, with a confidence level shown on each result.'],
  ['Equipment inventory', 'One searchable record of every asset by location, with age, condition, and current value.'],
  ['Equipment Equity tracker', 'Watch the value of your equipment base move over time, in plain dollars.'],
  ['Fleet Health Score', 'A single score that shows how much of your fleet is aging out, and where to look first.'],
  ['Insurance coverage review', 'Compare what your policy covers against what your equipment is worth today.'],
  ['Claim Readiness Score', 'Find the documentation gaps before a loss, not after.'],
  ['CVR PDF export', 'Download a clean valuation report you can hand to an insurer, lender, or buyer.'],
  ['CapEx Command Center', 'Group Practice plans: a three-year CapEx forecast across up to 10 locations.'],
  ['M&A Diligence Mode', 'Group Practice plans: equipment schedules and orderly liquidation value (OLV) reports for deal work.'],
  ['DSO dashboard and bulk import', 'Roll up locations in one view and load equipment lists from CSV.'],
  ['White-label reports for advisors', 'Advisor License: client appraisals and reports under your own brand.'],
]

export default function Features() {
  return (
    <>
      <section className="section tight hero">
        <div className="container">
          <p className="eyebrow">Features</p>
          <h1>Everything you need to put a number on your equipment</h1>
          <p className="lede">From a single tag scan to a three-year CapEx plan across ten locations.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {FEATURES.map(([t, d]) => (
              <div key={t} className="card">
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
          <div className="callout" style={{ marginTop: 32 }}>
            <strong>An estimate is not an appraisal.</strong> DentalAssetIQ gives you market-based
            valuations for planning, insurance review, and negotiation. Where a certified appraisal is
            legally required, use one.
          </div>
          <div className="btn-row">
            <a className="btn btn-gold" href={SCAN_URL}>Scan a tag</a>
            <a className="btn btn-outline" href={`${APP_URL}/auth/signup`}>Create a free account</a>
            <Link className="btn btn-outline" href="/pricing">See pricing</Link>
          </div>
        </div>
      </section>
    </>
  )
}
