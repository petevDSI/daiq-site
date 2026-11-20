import type { Metadata } from 'next'
import { Fraunces, DM_Sans } from 'next/font/google'
import './globals.css'

const head = Fraunces({ variable: '--font-head', subsets: ['latin'] })
const body = DM_Sans({ variable: '--font-body', subsets: ['latin'] })
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { SITE_URL, DSI_URL } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'DentalAssetIQ — Dental Equipment Valuation Built on Real Market Data',
    template: '%s | DentalAssetIQ',
  },
  description:
    'Know what your dental equipment is worth, what it costs to own, and whether to repair, replace, standardize, or transfer it. Valuation for practices, DSOs, CPAs, and M&A advisors.',
  alternates: { canonical: '/' },
  openGraph: { siteName: 'DentalAssetIQ', type: 'website', url: SITE_URL },
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DentalAssetIQ',
  url: SITE_URL,
  parentOrganization: { '@type': 'Organization', name: 'Dental Strategy Institute', url: DSI_URL },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${head.variable} ${body.variable}`}>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  )
}
