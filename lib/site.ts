export const SITE_URL = 'https://www.dentalassetiq.com'
export const APP_URL = 'https://app.dentalassetiq.com'
export const SCAN_URL = `${APP_URL}/scan`
export const SIGNIN_URL = `${APP_URL}/auth/login`
export const DSI_URL = 'https://www.dentalstrategyinstitute.com'
export const CONTACT_EMAIL = 'petev@dentalstrategyinstitute.com'

export const NAV = [
  { href: '/features', label: 'Features' },
  { href: '/who-its-for', label: "Who it's for" },
  { href: '/pricing', label: 'Pricing' },
  { href: '/resources', label: 'Resources' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
]

export interface Download {
  slug: string
  title: string
  blurb: string
}

// The five free guides that were offered on Kajabi, plus the DSO Acquisition Equipment Checklist.
export const DOWNLOADS: Download[] = [
  {
    slug: 'equipment-replacement-decision-worksheet',
    title: 'Equipment Replacement Decision Worksheet',
    blurb: 'Work through repair-versus-replace for a single piece of equipment, step by step.',
  },
  {
    slug: 'partner-buyout-equipment-valuation-checklist',
    title: 'Partner Buyout Equipment Valuation Checklist',
    blurb: 'Value the equipment side of a partner buyout without the argument.',
  },
  {
    slug: 'cpa-client-equipment-documentation-guide',
    title: 'CPA Client Equipment Documentation Guide',
    blurb: 'What to document for your dental clients, and why it matters at tax time and sale time.',
  },
  {
    slug: 'dso-equipment-negotiation-brief',
    title: 'DSO Equipment Negotiation Brief',
    blurb: 'Walk into an acquisition conversation knowing what your equipment is worth.',
  },
  {
    slug: 'colorado-dso-equipment-compliance-checklist',
    title: 'Colorado DSO Equipment Compliance Checklist',
    blurb: 'An equipment valuation checklist for DSOs working under the new Colorado rules.',
  },
  {
    slug: 'dso-acquisition-equipment-checklist',
    title: 'DSO Acquisition Equipment Documentation Checklist',
    blurb: 'A 29-item checklist of everything a DSO buyer will ask about your equipment.',
  },
]
