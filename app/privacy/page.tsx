import type { Metadata } from 'next'
import { CONTACT_EMAIL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'How DentalAssetIQ handles email sign-ups and contact messages on this website.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
}

export default function Privacy() {
  return (
    <section className="section">
      <div className="narrow prose">
        <h1>Privacy</h1>
        <p>
          This page covers the marketing website at www.dentalassetiq.com. The DentalAssetIQ app at
          app.dentalassetiq.com has its own terms.
        </p>
        <h2>What we collect</h2>
        <p>
          When you request a free guide, subscribe, or use the contact form, we collect the name and
          email address you enter and the message you write. Our host records standard technical logs.
        </p>
        <h2>How we use it</h2>
        <p>
          We use your email to deliver what you asked for and to send occasional equipment valuation
          guides. Every email includes a way to unsubscribe. We do not sell your information.
        </p>
        <h2>Service providers</h2>
        <p>We use Vercel to host this site and Resend to send email.</p>
        <h2>Questions</h2>
        <p>
          Write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. This summary is a plain-language
          draft and should be reviewed by counsel before relying on it.
        </p>
      </div>
    </section>
  )
}
