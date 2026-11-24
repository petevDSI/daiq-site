import type { Metadata } from 'next'
import { DOWNLOADS } from '@/lib/site'
import LeadForm from '@/components/LeadForm'

export const metadata: Metadata = {
  title: 'Free Dental Equipment Guides and Checklists',
  description:
    'Free worksheets and checklists for dental equipment replacement, partner buyouts, CPA documentation, DSO negotiation, DSO acquisition preparation, and Colorado DSO compliance.',
  alternates: { canonical: '/resources' },
}

export default function Resources() {
  return (
    <>
      <section className="section tight hero">
        <div className="container">
          <p className="eyebrow">Free resources</p>
          <h1>Worksheets and checklists, free</h1>
          <p className="lede">Enter your email and the guide lands in your inbox.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            {DOWNLOADS.map((d) => (
              <div key={d.slug} id={d.slug} className="card" style={{ scrollMarginTop: 110 }}>
                <div className="guide-preview" aria-hidden="true">
                  <img className="gp-page" src={`/guides/${d.slug}-page.jpg`} alt="" width={280} height={363} loading="lazy" />
                  <img className="gp-cover" src={`/guides/${d.slug}-cover.jpg`} alt="" width={280} height={363} loading="lazy" />
                </div>
                <h3>{d.title}</h3>
                <p>{d.blurb}</p>
                <LeadForm list={d.slug} buttonLabel="Send me the guide" source={`resource:${d.slug}`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
