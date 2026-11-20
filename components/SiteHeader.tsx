import Link from 'next/link'
import { NAV, SCAN_URL, SIGNIN_URL } from '@/lib/site'

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container bar">
        <Link href="/" className="brand" aria-label="DentalAssetIQ home">
          <b>
            Dental<i>Asset</i>IQ
          </b>
          <span>From Dental Strategy Institute</span>
        </Link>
        <nav className="nav" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
          <a href={SIGNIN_URL}>Sign in</a>
          <a href={SCAN_URL} className="btn btn-gold">
            Scan a tag
          </a>
        </nav>
      </div>
    </header>
  )
}
