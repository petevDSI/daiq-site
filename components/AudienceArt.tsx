// Illustrations for /who-its-for: one per audience card, plus a hero graphic.
// Inline SVG in the site palette. Figures are sample data for illustration only.

const NAVY = '#0d1f3c'
const SOFT = '#2b3f61'
const GOLD = '#c9a84c'
const DEEP = '#a8872f'
const COGNAC = '#a0522d'
const MIST = '#e6f0f7'
const CLOUD = '#f4f8fc'
const LINE = '#e4e9ef'
const MUTED = '#5d6877'
const SAND = '#fbf5e6'
const FONT = "system-ui, -apple-system, 'Segoe UI', Arial, sans-serif"

function Frame({ children, label, h = 200 }: { children: React.ReactNode; label: string; h?: number }) {
  return (
    <svg
      viewBox={`0 0 400 ${h}`}
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', width: '100%', height: 'auto' }}
      fontFamily={FONT}
    >
      <rect width="400" height={h} fill={CLOUD} />
      <circle cx="372" cy="-10" r="80" fill={MIST} />
      <circle cx="16" cy={h + 15} r="70" fill={SAND} />
      {children}
    </svg>
  )
}

/* ---- glyphs, drawn around (0,0), roughly 90 x 90 ---- */

function ChairGlyph() {
  return (
    <g>
      <ellipse cx="0" cy="42" rx="30" ry="6" fill={SOFT} />
      <rect x="-5" y="14" width="10" height="28" rx="3" fill={SOFT} />
      <rect x="-30" y="2" width="46" height="16" rx="7" fill={NAVY} />
      <path d="M10 8 L38 -24 Q44 -30 50 -24 L52 -18 Q54 -14 50 -10 L24 20 Z" fill={GOLD} />
      <rect x="-9" y="-6" width="20" height="12" rx="6" fill={COGNAC} transform="translate(50 -30) rotate(-48)" />
      <path d="M-30 8 L-44 30" stroke={NAVY} strokeWidth="9" strokeLinecap="round" />
      <rect x="-26" y="-8" width="18" height="6" rx="3" fill={SOFT} />
    </g>
  )
}

function NetworkGlyph() {
  const pts: [number, number][] = [[-42, -26], [42, -26], [-42, 30], [42, 30]]
  return (
    <g>
      {pts.map(([x, y], i) => (
        <line key={i} x1="0" y1="2" x2={x} y2={y} stroke={SOFT} strokeWidth="2" strokeDasharray="4 3" />
      ))}
      {pts.map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 15} y={y - 12} width="30" height="24" rx="5" fill="#fff" stroke={SOFT} strokeWidth="2" />
          <rect x={x - 8} y={y - 4} width="16" height="3.5" rx="1.5" fill={GOLD} />
          <rect x={x - 8} y={y + 3} width="10" height="3.5" rx="1.5" fill={LINE} />
        </g>
      ))}
      <circle cx="0" cy="2" r="17" fill={NAVY} />
      <text x="0" y="8" fontSize="17" fontWeight="700" fill={GOLD} textAnchor="middle" fontFamily="Georgia, serif">$</text>
    </g>
  )
}

function LedgerGlyph() {
  return (
    <g>
      <rect x="-40" y="-40" width="62" height="80" rx="6" fill="#fff" stroke={SOFT} strokeWidth="2" />
      <rect x="-40" y="-40" width="62" height="14" rx="6" fill={NAVY} />
      {[-16, -4, 8, 20].map((y) => (
        <g key={y}>
          <rect x="-32" y={y} width="28" height="4" rx="2" fill={LINE} />
          <rect x="2" y={y} width="14" height="4" rx="2" fill={GOLD} />
        </g>
      ))}
      <rect x="10" y="-4" width="40" height="50" rx="6" fill={SOFT} />
      <rect x="16" y="2" width="28" height="12" rx="3" fill={MIST} />
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => <circle key={`${r}${c}`} cx={21 + c * 9} cy={24 + r * 9} r="2.8" fill={c === 2 && r === 2 ? GOLD : '#fff'} />)
      )}
    </g>
  )
}

function ScaleGlyph() {
  return (
    <g>
      <rect x="-3" y="-34" width="6" height="68" rx="3" fill={SOFT} />
      <rect x="-24" y="34" width="48" height="6" rx="3" fill={NAVY} />
      <path d="M-44 -26 L44 -34" stroke={NAVY} strokeWidth="4" strokeLinecap="round" />
      <circle cx="0" cy="-30" r="6" fill={GOLD} />
      <path d="M-44 -26 L-58 8 M-44 -26 L-30 8" stroke={SOFT} strokeWidth="1.8" />
      <path d="M-62 8 h36 a18 10 0 0 1 -36 0 z" fill={GOLD} />
      <path d="M44 -34 L30 0 M44 -34 L58 0" stroke={SOFT} strokeWidth="1.8" />
      <path d="M26 0 h36 a18 10 0 0 1 -36 0 z" fill={COGNAC} />
      <text x="-44" y="2" fontSize="11" fontWeight="700" fill={NAVY} textAnchor="middle">$</text>
    </g>
  )
}

/* ---- card scenes ---- */

function Owner() {
  return (
    <Frame label="A dental operatory chair with a value tag and a claim-ready badge">
      <g transform="translate(150 100) scale(1.2)"><ChairGlyph /></g>
      <rect x="262" y="40" width="112" height="46" rx="10" fill="#fff" stroke={LINE} />
      <text x="274" y="58" fontSize="9" fill={MUTED}>YOUR OPERATORY</text>
      <text x="274" y="76" fontSize="15" fontWeight="700" fill={COGNAC}>$4,300</text>
      <rect x="244" y="100" width="136" height="30" rx="15" fill="#e3f3ec" />
      <path d="M260 115 l4 4 8 -8" stroke="#2f8f6b" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="278" y="119" fontSize="10.5" fontWeight="700" fill="#2f8f6b">Claim-ready record</text>
    </Frame>
  )
}

function Dso() {
  return (
    <Frame label="A hub connected to four locations, with a CapEx forecast panel">
      <g transform="translate(120 100) scale(1.1)"><NetworkGlyph /></g>
      <rect x="244" y="36" width="132" height="128" rx="12" fill="#fff" stroke={LINE} />
      <text x="258" y="58" fontSize="10" fontWeight="700" fill={NAVY}>3-year CapEx</text>
      {[44, 66, 52].map((h, i) => (
        <rect key={i} x={262 + i * 36} y={146 - h} width="24" height={h} rx="4" fill={i === 1 ? COGNAC : GOLD} />
      ))}
      <line x1="256" x2="366" y1="146" y2="146" stroke={LINE} />
    </Frame>
  )
}

function Cpa() {
  return (
    <Frame label="A ledger and calculator beside a declining depreciation line">
      <g transform="translate(120 100) scale(1.15)"><LedgerGlyph /></g>
      <rect x="236" y="40" width="140" height="120" rx="12" fill="#fff" stroke={LINE} />
      <text x="250" y="60" fontSize="10" fontWeight="700" fill={NAVY}>Book vs. market</text>
      <path d="M252 80 L296 92 L340 110 L362 118" stroke={SOFT} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M252 98 L296 100 L340 104 L362 106" stroke={GOLD} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <rect x="250" y="134" width="8" height="8" rx="2" fill={SOFT} />
      <text x="262" y="141" fontSize="9" fill={MUTED}>Book</text>
      <rect x="302" y="134" width="8" height="8" rx="2" fill={GOLD} />
      <text x="314" y="141" fontSize="9" fill={MUTED}>Market</text>
    </Frame>
  )
}

function Advisor() {
  return (
    <Frame label="A balance scale weighing equipment against value, beside a white-label report">
      <g transform="translate(128 106) scale(1.15)"><ScaleGlyph /></g>
      <rect x="262" y="30" width="112" height="140" rx="6" fill="#fff" stroke={LINE} />
      <rect x="262" y="30" width="112" height="24" rx="6" fill={SOFT} />
      <rect x="270" y="36" width="38" height="12" rx="3" fill="none" stroke="#fff" strokeDasharray="3 2" />
      <text x="289" y="45" fontSize="6" fill="#fff" textAnchor="middle" fontWeight="700">YOUR LOGO</text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="274" y={70 + i * 16} width={64 - i * 6} height="5" rx="2" fill={LINE} />
          <rect x="346" y={70 + i * 16} width="16" height="5" rx="2" fill={GOLD} />
        </g>
      ))}
    </Frame>
  )
}

export const AUDIENCE_ART: Record<string, () => React.JSX.Element> = {
  'Practice owners': Owner,
  'DSOs and group practices': Dso,
  'CPAs and bookkeepers': Cpa,
  'M&A advisors and brokers': Advisor,
}

/* ---- hero: four audiences around one number ---- */

export function AudienceHero() {
  const tiles: [string, number, number, () => React.JSX.Element][] = [
    ['Practice owners', 20, 20, ChairGlyph],
    ['DSOs', 220, 20, NetworkGlyph],
    ['CPAs', 20, 190, LedgerGlyph],
    ['Advisors', 220, 190, ScaleGlyph],
  ]
  return (
    <svg
      viewBox="0 0 420 360"
      role="img"
      aria-label="Four audiences who sign off on equipment: practice owners, DSOs, CPAs, and advisors"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', width: '100%', height: 'auto' }}
      fontFamily={FONT}
    >
      {tiles.map(([label, x, y, G]) => (
        <g key={label}>
          <rect x={x} y={y} width="180" height="150" rx="18" fill="#fff" stroke={LINE} />
          <rect x={x} y={y} width="180" height="150" rx="18" fill={MIST} opacity="0.35" />
          <g transform={`translate(${x + 90} ${y + 66}) scale(0.95)`}><G /></g>
          <text x={x + 90} y={y + 138} fontSize="12" fontWeight="700" fill={NAVY} textAnchor="middle">{label}</text>
        </g>
      ))}
      <circle cx="210" cy="180" r="30" fill={NAVY} stroke="#fffdf8" strokeWidth="6" />
      <text x="210" y="190" fontSize="28" fontWeight="700" fill={GOLD} textAnchor="middle" fontFamily="Georgia, serif">$</text>
    </svg>
  )
}
