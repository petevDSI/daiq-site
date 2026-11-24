import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { DSI_URL, APP_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About DentalAssetIQ',
  description:
    'DentalAssetIQ is a Dental Strategy Institute product built to put defensible market-based values on dental equipment.',
  alternates: { canonical: '/about' },
}

export default function About() {
  return (
    <>
      <section className="section tight hero">
        <div className="container">
          <p className="eyebrow">About</p>
          <h1>Built by someone who has priced a lot of operatories</h1>
        </div>
      </section>
      <section className="section">
        <div className="narrow prose">
          <p>
            <Image
              className="inline-photo left"
              src="/images/team/pete-volk.jpg"
              alt="Pete Volk, founder of Dental Strategy Institute"
              width={900}
              height={893}
              priority
            />
            DentalAssetIQ comes from Pete Volk and Susan Volk, RDH, co-founders of{' '}
            <a href={DSI_URL}>Dental Strategy Institute</a>. Pete brings more than twenty-five years
            in dental office design, equipment, and DSO strategy.
          </p>
          <p>
            <Image
              className="inline-photo right"
              src="/images/team/susan-volk.jpg"
              alt="Susan Volk, RDH, co-founder of Dental Strategy Institute"
              width={1020}
              height={1020}
              priority
            />
            Susan brings the clinical side as a registered dental hygienist, keeping the content and
            the numbers grounded in how a practice actually runs.
          </p>
          <p>
            One problem kept coming back: nobody could say, with a straight face, what the
            equipment in a practice was actually worth.
          </p>
          <p>
            Owners guessed. Insurers guessed lower. Buyers guessed lowest. Everyone argued from list
            prices that no used chair ever sold for.
          </p>
          <p>
            So we built a system that starts from what equipment really sells for, shows its
            confidence, and keeps the work organized by location. That is the whole product.
          </p>
          <p>
            DentalAssetIQ sits next to the books, courses, and calculators at Dental Strategy
            Institute, so the numbers here connect to the strategy there.
          </p>
          <div className="btn-row">
            <a className="btn btn-gold" href={`${APP_URL}/auth/signup`}>Try it free</a>
            <Link className="btn btn-outline" href="/contact">Get in touch</Link>
          </div>
        </div>
      </section>
    </>
  )
}
