import type { NextConfig } from 'next'

const APP = 'https://app.dentalassetiq.com'

const nextConfig: NextConfig = {
  // Lead-capture route attaches PDFs from this folder, so ship them with the function.
  outputFileTracingIncludes: {
    '/api/subscribe': ['./private-downloads/**/*'],
  },
  async redirects() {
    return [
      // Old Kajabi template URLs that no longer exist here
      { source: '/login', destination: `${APP}/auth/login`, permanent: true },
      { source: '/member_dashboard/:path*', destination: `${APP}/auth/login`, permanent: true },
      { source: '/store', destination: '/resources', permanent: true },
      { source: '/store/:path*', destination: '/resources', permanent: true },
      { source: '/library', destination: '/resources', permanent: true },
      { source: '/offers/free-cpa-client-equipment-documentation-guide', destination: '/resources#cpa-client-equipment-documentation-guide', permanent: true },
      { source: '/offers/free-partner-buyout-equipment-valuation-checklist', destination: '/resources#partner-buyout-equipment-valuation-checklist', permanent: true },
      { source: '/offers/free-equipment-replacement-decision-worksheet', destination: '/resources#equipment-replacement-decision-worksheet', permanent: true },
      { source: '/offers/free-dso-equipment-negotiation-brief', destination: '/resources#dso-equipment-negotiation-brief', permanent: true },
      { source: '/offers/dYay23HL/checkout', destination: '/resources#colorado-dso-equipment-compliance-checklist', permanent: true },
      { source: '/offers/dYay23HL', destination: '/resources#colorado-dso-equipment-compliance-checklist', permanent: true },
      { source: '/offers/:path*', destination: '/resources', permanent: true },
      { source: '/thank_you/:path*', destination: '/resources', permanent: true },
      { source: '/newsletters/:path*', destination: '/blog', permanent: true },
      { source: '/blog/search', destination: '/blog', permanent: true },
      { source: '/pages/not_found', destination: '/', permanent: true },
      { source: '/pages/:slug', destination: '/', permanent: true },
    ]
  },
}

export default nextConfig
