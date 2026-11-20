import Link from 'next/link'
import { DSI_URL, NAV, APP_URL, CONTACT_EMAIL } from '@/lib/site'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="cols">
          <div>
            <h4>DentalAssetIQ</h4>
            <p>
              Point. Scan. Know what it&apos;s worth. Dental equipment valuation built on real market
              data, for practices, DSOs, CPAs, and advisors.
            </p>
            <p className="parent-line">
              A product of <a href={DSI_URL}>Dental Strategy Institute</a>: books, calculators, and research for dental business decisions.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>The app</h4>
            <ul>
              <li>
                <a href={`${APP_URL}/scan`}>Scan a tag</a>
              </li>
              <li>
                <a href={`${APP_URL}/auth/signup`}>Create a free account</a>
              </li>
              <li>
                <a href={`${APP_URL}/auth/login`}>Sign in</a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="fine">
          © {new Date().getFullYear()} Dental Strategy Institute. All rights reserved. ·{' '}
          <Link href="/privacy">Privacy</Link> · Valuations are estimates based on market data and are
          not a substitute for a certified appraisal where one is legally required.
        </div>
      </div>
    </footer>
  )
}
