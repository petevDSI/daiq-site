// Illustrations for the 12 cards on /features.
// Hand-drawn SVG "screens" in the site palette. All figures are sample data for illustration only.

const NAVY = '#0d1f3c'
const SOFT = '#2b3f61'
const GOLD = '#c9a84c'
const DEEP = '#a8872f'
const COGNAC = '#a0522d'
const MIST = '#e6f0f7'
const CLOUD = '#f4f8fc'
const LINE = '#e4e9ef'
const MUTED = '#5d6877'
const GREEN = '#2f8f6b'
const FONT = "system-ui, -apple-system, 'Segoe UI', Arial, sans-serif"

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 400 200"
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', width: '100%', height: 'auto' }}
      fontFamily={FONT}
    >
      <rect width="400" height="200" fill={CLOUD} />
      <circle cx="372" cy="-10" r="70" fill={MIST} />
      <circle cx="20" cy="215" r="60" fill="#fbf5e6" />
      {children}
    </svg>
  )
}

function Panel({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return <rect x={x} y={y} width={w} height={h} rx="12" fill="#fff" stroke={LINE} />
}

function Chip({ x, y, w, text, fill = MIST, color = SOFT }: { x: number; y: number; w: number; text: string; fill?: string; color?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="18" rx="9" fill={fill} />
      <text x={x + w / 2} y={y + 12.5} fontSize="9.5" fontWeight="700" fill={color} textAnchor="middle">{text}</text>
    </g>
  )
}

function TagScan() {
  return (
    <Frame label="Phone camera framing an equipment tag, with the identified make and a value range">
      <rect x="40" y="18" width="116" height="170" rx="16" fill={NAVY} />
      <rect x="48" y="30" width="100" height="146" rx="8" fill={SOFT} />
      <rect x="62" y="74" width="72" height="44" rx="4" fill="#fff" />
      <rect x="68" y="82" width="38" height="5" rx="2" fill={MUTED} />
      <rect x="68" y="92" width="52" height="4" rx="2" fill={LINE} />
      <rect x="68" y="101" width="44" height="4" rx="2" fill={LINE} />
      <rect x="68" y="108" width="28" height="4" rx="2" fill={LINE} />
      {[[56, 62, 1, 1], [140, 62, -1, 1], [56, 130, 1, -1], [140, 130, -1, -1]].map(([x, y, dx, dy], i) => (
        <path key={i} d={`M${x} ${y + dy * 12} V${y} H${x + dx * 12}`} stroke={GOLD} strokeWidth="3" fill="none" strokeLinecap="round" />
      ))}
      <path d="M176 104 h26" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M196 98 l7 6 -7 6" stroke={GOLD} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Panel x={214} y={46} w={150} h={108} />
      <Chip x={226} y={58} w={74} text="IDENTIFIED" fill="#e3f3ec" color={GREEN} />
      <text x="226" y="94" fontSize="13" fontWeight="700" fill={NAVY}>Dental chair</text>
      <text x="226" y="108" fontSize="10" fill={MUTED}>Make and model matched</text>
      <text x="226" y="136" fontSize="9" fill={MUTED}>VALUE RANGE</text>
      <text x="226" y="150" fontSize="14" fontWeight="700" fill={COGNAC}>$3,800 to $5,200</text>
    </Frame>
  )
}

function FairMarketValue() {
  return (
    <Frame label="Valuation range bar with a midpoint marker, comparable sales dots, and a confidence badge">
      <Panel x={28} y={22} w={344} h={156} />
      <text x="46" y="48" fontSize="11" fontWeight="700" fill={NAVY}>Fair market value</text>
      <Chip x={254} y={34} w={104} text="HIGH CONFIDENCE" fill="#e3f3ec" color={GREEN} />
      <rect x="52" y="86" width="296" height="14" rx="7" fill={MIST} />
      <rect x="110" y="86" width="170" height="14" rx="7" fill={GOLD} />
      <rect x="192" y="78" width="4" height="30" rx="2" fill={NAVY} />
      <text x="52" y="124" fontSize="10" fill={MUTED}>Low</text>
      <text x="194" y="124" fontSize="10" fontWeight="700" fill={NAVY} textAnchor="middle">Mid</text>
      <text x="348" y="124" fontSize="10" fill={MUTED} textAnchor="end">High</text>
      {[122, 140, 156, 170, 184, 200, 214, 232, 250, 264].map((cx, i) => (
        <circle key={cx} cx={cx} cy={i % 2 ? 66 : 70} r="3.5" fill={SOFT} opacity="0.55" />
      ))}
      <text x="46" y="156" fontSize="10" fill={MUTED}>Comparable sales, last 180 days</text>
    </Frame>
  )
}

function Inventory() {
  const rows = [
    ['Operatory chair', 'Main St', '6 yr', 'Good'],
    ['Panoramic x-ray', 'Main St', '4 yr', 'Good'],
    ['Autoclave', 'Oak Ave', '9 yr', 'Fair'],
    ['Air compressor', 'Oak Ave', '11 yr', 'Replace'],
  ]
  return (
    <Frame label="Searchable equipment inventory table with location, age, and condition">
      <Panel x={24} y={20} w={352} h={160} />
      <rect x="38" y="32" width="150" height="20" rx="10" fill={CLOUD} stroke={LINE} />
      <circle cx="50" cy="42" r="4" fill="none" stroke={MUTED} />
      <rect x="62" y="40" width="56" height="4" rx="2" fill={LINE} />
      {['Asset', 'Location', 'Age', 'Condition'].map((h, i) => (
        <text key={h} x={[40, 162, 246, 300][i]} y="72" fontSize="8.5" fontWeight="700" fill={DEEP} letterSpacing="0.8">{h.toUpperCase()}</text>
      ))}
      {rows.map((r, i) => (
        <g key={r[0]}>
          <line x1="38" x2="362" y1={80 + i * 24} y2={80 + i * 24} stroke={LINE} />
          {r.map((c, j) =>
            j === 3 ? (
              <Chip key={j} x={298} y={86 + i * 24} w={54} text={c} fill={c === 'Replace' ? '#f6e4da' : c === 'Fair' ? '#fbf5e6' : '#e3f3ec'} color={c === 'Replace' ? COGNAC : c === 'Fair' ? DEEP : GREEN} />
            ) : (
              <text key={j} x={[40, 162, 246][j]} y={99 + i * 24} fontSize="10.5" fill={j === 0 ? NAVY : MUTED} fontWeight={j === 0 ? 600 : 400}>{c}</text>
            )
          )}
        </g>
      ))}
    </Frame>
  )
}

function EquityTracker() {
  return (
    <Frame label="Line chart showing equipment equity rising over time">
      <Panel x={28} y={20} w={344} h={160} />
      <text x="46" y="44" fontSize="11" fontWeight="700" fill={NAVY}>Equipment Equity</text>
      <text x="354" y="44" fontSize="11" fontWeight="700" fill={GREEN} textAnchor="end">▲ trending up</text>
      {[70, 100, 130, 160].map((y) => (
        <line key={y} x1="46" x2="354" y1={y} y2={y} stroke={LINE} />
      ))}
      <path d="M46 150 C 90 142, 110 128, 150 122 S 220 100, 258 92 S 320 66, 354 58 V160 H46 Z" fill={GOLD} opacity="0.18" />
      <path d="M46 150 C 90 142, 110 128, 150 122 S 220 100, 258 92 S 320 66, 354 58" stroke={GOLD} strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="354" cy="58" r="5" fill="#fff" stroke={COGNAC} strokeWidth="3" />
    </Frame>
  )
}

function FleetHealth() {
  const cx = 200, cy = 140, r = 78
  const arc = (a: number) => [cx + r * Math.cos(Math.PI - a), cy - r * Math.sin(Math.PI - a)]
  const end = arc(Math.PI * 0.78)
  return (
    <Frame label="Gauge showing a Fleet Health Score">
      <Panel x={90} y={18} w={220} h={166} />
      <path d={`M${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} stroke={MIST} strokeWidth="16" fill="none" strokeLinecap="round" />
      <path d={`M${cx - r} ${cy} A ${r} ${r} 0 0 1 ${end[0]} ${end[1]}`} stroke={GOLD} strokeWidth="16" fill="none" strokeLinecap="round" />
      <text x={cx} y={cy - 10} fontSize="38" fontWeight="700" fill={NAVY} textAnchor="middle" fontFamily="Georgia, serif">78</text>
      <text x={cx} y={cy + 8} fontSize="10" fill={MUTED} textAnchor="middle">FLEET HEALTH SCORE</text>
      <text x={cx} y={cy + 30} fontSize="10" fill={COGNAC} textAnchor="middle" fontWeight="700">3 assets aging out</text>
    </Frame>
  )
}

function InsuranceReview() {
  return (
    <Frame label="Bars comparing insurance coverage to current equipment value, with the gap highlighted">
      <Panel x={28} y={20} w={344} h={160} />
      <text x="46" y="44" fontSize="11" fontWeight="700" fill={NAVY}>Coverage vs. equipment value</text>
      <text x="46" y="80" fontSize="9.5" fill={MUTED}>Policy covers</text>
      <rect x="46" y="86" width="190" height="20" rx="6" fill={SOFT} />
      <text x="46" y="132" fontSize="9.5" fill={MUTED}>Equipment worth today</text>
      <rect x="46" y="138" width="296" height="20" rx="6" fill={GOLD} />
      <rect x="236" y="86" width="106" height="20" rx="6" fill="none" stroke={COGNAC} strokeWidth="2" strokeDasharray="5 4" />
      <text x="289" y="100" fontSize="10" fontWeight="700" fill={COGNAC} textAnchor="middle">GAP</text>
    </Frame>
  )
}

function ClaimReadiness() {
  const items: [string, boolean][] = [
    ['Serial numbers on file', true],
    ['Purchase dates recorded', true],
    ['Photos of each asset', true],
    ['Receipts attached', false],
  ]
  return (
    <Frame label="Claim readiness checklist with one missing document and a progress bar">
      <Panel x={28} y={20} w={344} h={160} />
      <text x="46" y="44" fontSize="11" fontWeight="700" fill={NAVY}>Claim Readiness</text>
      <text x="354" y="44" fontSize="11" fontWeight="700" fill={COGNAC} textAnchor="end">75%</text>
      <rect x="46" y="54" width="308" height="8" rx="4" fill={MIST} />
      <rect x="46" y="54" width="231" height="8" rx="4" fill={GOLD} />
      {items.map(([t, ok], i) => (
        <g key={t}>
          <circle cx="56" cy={86 + i * 24} r="8" fill={ok ? '#e3f3ec' : '#f6e4da'} />
          {ok ? (
            <path d={`M52 ${86 + i * 24} l3 3 6 -6`} stroke={GREEN} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <text x="56" y={90 + i * 24} fontSize="11" fontWeight="700" fill={COGNAC} textAnchor="middle">!</text>
          )}
          <text x="74" y={90 + i * 24} fontSize="11" fill={ok ? NAVY : COGNAC} fontWeight={ok ? 400 : 700}>{t}</text>
        </g>
      ))}
    </Frame>
  )
}

function PdfExport() {
  return (
    <Frame label="A valuation report page with a table and a download button">
      <rect x="128" y="14" width="144" height="178" rx="6" fill="#fff" stroke={LINE} />
      <rect x="128" y="14" width="144" height="26" rx="6" fill={NAVY} />
      <rect x="140" y="23" width="52" height="7" rx="3" fill={GOLD} />
      <text x="140" y="58" fontSize="9" fontWeight="700" fill={NAVY}>Certified Valuation Report</text>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="140" y={72 + i * 16} width={i === 0 ? 120 : 120} height="12" rx="2" fill={i % 2 ? '#fff' : CLOUD} />
          <rect x="144" y={76 + i * 16} width={34 + ((i * 17) % 28)} height="4" rx="2" fill={LINE} />
          <rect x="232" y={76 + i * 16} width="24" height="4" rx="2" fill={GOLD} opacity="0.7" />
        </g>
      ))}
      <circle cx="244" cy="170" r="12" fill="none" stroke={GOLD} strokeWidth="2" />
      <circle cx="244" cy="170" r="7" fill={GOLD} opacity="0.35" />
      <rect x="290" y="150" width="82" height="26" rx="13" fill={GOLD} />
      <text x="331" y="167" fontSize="10.5" fontWeight="700" fill={NAVY} textAnchor="middle">↓ PDF</text>
    </Frame>
  )
}

function CapexCommand() {
  const bars = [
    ['Year 1', 54, 22],
    ['Year 2', 38, 30],
    ['Year 3', 70, 26],
  ]
  return (
    <Frame label="Three-year CapEx forecast as stacked bars">
      <Panel x={28} y={20} w={344} h={160} />
      <text x="46" y="44" fontSize="11" fontWeight="700" fill={NAVY}>Three-year CapEx forecast</text>
      <rect x="258" y="34" width="8" height="8" rx="2" fill={GOLD} />
      <text x="270" y="42" fontSize="9" fill={MUTED}>Replace</text>
      <rect x="312" y="34" width="8" height="8" rx="2" fill={SOFT} />
      <text x="324" y="42" fontSize="9" fill={MUTED}>Upgrade</text>
      <line x1="46" x2="354" y1="160" y2="160" stroke={LINE} />
      {bars.map(([l, a, b], i) => {
        const x = 78 + i * 100
        return (
          <g key={l as string}>
            <rect x={x} y={160 - (a as number)} width="56" height={a as number} rx="4" fill={GOLD} />
            <rect x={x} y={160 - (a as number) - (b as number)} width="56" height={b as number} rx="4" fill={SOFT} />
            <text x={x + 28} y="174" fontSize="9.5" fill={MUTED} textAnchor="middle">{l}</text>
          </g>
        )
      })}
      <Chip x={46} y={52} w={78} text="10 LOCATIONS" />
    </Frame>
  )
}

function MaDiligence() {
  const rows = ['Operatory chairs', 'Imaging', 'Sterilization', 'Compressors / vacuum']
  return (
    <Frame label="Equipment schedule with fair market value and orderly liquidation value columns">
      <Panel x={24} y={20} w={352} h={160} />
      <text x="40" y="44" fontSize="11" fontWeight="700" fill={NAVY}>Equipment schedule</text>
      <Chip x={296} y={31} w={66} text="DEAL MODE" fill="#f6e4da" color={COGNAC} />
      <text x="262" y="66" fontSize="8.5" fontWeight="700" fill={DEEP} letterSpacing="0.8">FMV</text>
      <text x="322" y="66" fontSize="8.5" fontWeight="700" fill={DEEP} letterSpacing="0.8">OLV</text>
      {rows.map((r, i) => (
        <g key={r}>
          <line x1="38" x2="362" y1={72 + i * 26} y2={72 + i * 26} stroke={LINE} />
          <text x="40" y={90 + i * 26} fontSize="10.5" fill={NAVY}>{r}</text>
          <rect x="250" y={80 + i * 26} width="36" height="6" rx="3" fill={GOLD} />
          <rect x="310" y={80 + i * 26} width={26 - i * 2} height="6" rx="3" fill={SOFT} />
        </g>
      ))}
    </Frame>
  )
}

function DsoDashboard() {
  const locs = [['Main St', 92], ['Oak Ave', 74], ['Lakeview', 58], ['Riverside', 83]]
  return (
    <Frame label="Multi-location roll-up with per-location bars and a CSV import button">
      <Panel x={28} y={20} w={344} h={160} />
      <text x="46" y="44" fontSize="11" fontWeight="700" fill={NAVY}>All locations</text>
      <rect x="276" y="30" width="80" height="20" rx="10" fill="none" stroke={NAVY} strokeWidth="1.5" />
      <text x="316" y="44" fontSize="9.5" fontWeight="700" fill={NAVY} textAnchor="middle">↑ Import CSV</text>
      {locs.map(([n, v], i) => (
        <g key={n as string}>
          <text x="46" y={80 + i * 24} fontSize="10.5" fill={NAVY}>{n}</text>
          <rect x="120" y={70 + i * 24} width="200" height="10" rx="5" fill={MIST} />
          <rect x="120" y={70 + i * 24} width={(v as number) * 2} height="10" rx="5" fill={i === 2 ? COGNAC : GOLD} />
          <text x="354" y={80 + i * 24} fontSize="10" fill={MUTED} textAnchor="end">{v as number}</text>
        </g>
      ))}
    </Frame>
  )
}

function WhiteLabel() {
  return (
    <Frame label="A client report carrying the advisor's own logo and brand color">
      <rect x="118" y="14" width="164" height="178" rx="6" fill="#fff" stroke={LINE} />
      <rect x="118" y="14" width="164" height="30" rx="6" fill={SOFT} />
      <rect x="130" y="22" width="40" height="14" rx="3" fill="none" stroke="#fff" strokeDasharray="3 2" />
      <text x="150" y="32" fontSize="7" fill="#fff" textAnchor="middle" fontWeight="700">YOUR LOGO</text>
      <text x="130" y="64" fontSize="10" fontWeight="700" fill={NAVY}>Client equipment appraisal</text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="130" y={76 + i * 16} width={96 - i * 8} height="5" rx="2" fill={LINE} />
          <rect x="244" y={76 + i * 16} width="26" height="5" rx="2" fill={GOLD} opacity="0.8" />
        </g>
      ))}
      <rect x="130" y="150" width="140" height="28" rx="6" fill={CLOUD} />
      <text x="140" y="168" fontSize="9" fill={MUTED}>Prepared by your firm</text>
      {[GOLD, COGNAC, SOFT].map((c, i) => (
        <circle key={c} cx={314 + i * 22} cy="100" r="9" fill={c} />
      ))}
      <text x="336" y="128" fontSize="8.5" fill={MUTED} textAnchor="middle">Your colors</text>
    </Frame>
  )
}

export const FEATURE_ART: Record<string, () => React.JSX.Element> = {
  'Tag scanning': TagScan,
  'Fair market value': FairMarketValue,
  'Equipment inventory': Inventory,
  'Equipment Equity tracker': EquityTracker,
  'Fleet Health Score': FleetHealth,
  'Insurance coverage review': InsuranceReview,
  'Claim Readiness Score': ClaimReadiness,
  'CVR PDF export': PdfExport,
  'CapEx Command Center': CapexCommand,
  'M&A Diligence Mode': MaDiligence,
  'DSO dashboard and bulk import': DsoDashboard,
  'White-label reports for advisors': WhiteLabel,
}
