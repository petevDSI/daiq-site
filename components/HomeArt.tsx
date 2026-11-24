// Home page graphics: floating valuation card for the hero and line icons for the feature cards.
// All figures are sample data for illustration only.

const NAVY = '#0d1f3c'
const GOLD = '#c9a84c'
const MUTED = '#5d6877'
const GREEN = '#2f8f6b'

export function ValueCard() {
  return (
    <div className="value-card" role="img" aria-label="Sample valuation result: fair market value range with high confidence">
      <p className="vc-label">Sample valuation</p>
      <p className="vc-item">Dental operatory chair, 2016</p>
      <p className="vc-value">$3,800 – $5,200</p>
      <svg viewBox="0 0 220 36" width="100%" height="36" aria-hidden="true">
        <rect x="0" y="14" width="220" height="8" rx="4" fill="#e4e9ef" />
        <rect x="52" y="14" width="104" height="8" rx="4" fill={GOLD} />
        <circle cx="104" cy="18" r="7" fill={NAVY} stroke="#fff" strokeWidth="2" />
      </svg>
      <p className="vc-meta"><span className="vc-dot" /> High confidence · 180-day comps</p>
    </div>
  )
}

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg className="icon" viewBox="0 0 48 48" width="48" height="48" fill="none" stroke={NAVY} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="24" cy="24" r="23" fill="#fbf5e6" stroke="none" />
      {children}
    </svg>
  )
}

export function ValueIcon() {
  return (
    <Icon>
      <path d="M14 33 L21 24 L26 29 L35 17" />
      <path d="M29 17 H35 V23" stroke={GOLD} />
      <path d="M13 36 H36" stroke={MUTED} />
    </Icon>
  )
}

export function FleetIcon() {
  return (
    <Icon>
      <rect x="12" y="18" width="24" height="14" rx="3" />
      <path d="M17 18 V14 H31 V18" />
      <path d="M16 36 V32 M32 36 V32" />
      <circle cx="35" cy="14" r="4" fill={GREEN} stroke="none" />
    </Icon>
  )
}

export function ShieldIcon() {
  return (
    <Icon>
      <path d="M24 11 L35 15 V24 C35 30 30 34 24 37 C18 34 13 30 13 24 V15 Z" />
      <path d="M19 24 L23 28 L30 20" stroke={GOLD} />
    </Icon>
  )
}
