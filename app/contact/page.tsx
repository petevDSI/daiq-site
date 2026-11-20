import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import { CONTACT_EMAIL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Questions about DentalAssetIQ, Enterprise plans, or the Advisor License? Get in touch.',
  alternates: { canonical: '/contact' },
}

export default function Contact() {
  return (
    <>
      <section className="section tight hero">
        <div className="container">
          <p className="eyebrow">Contact</p>
          <h1>Talk to us</h1>
        </div>
      </section>
      <section className="section">
        <div className="narrow">
          <p>
            Or email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> directly.
          </p>
          <ContactForm />
        </div>
      </section>
    </>
  )
}
