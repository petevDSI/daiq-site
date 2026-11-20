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
