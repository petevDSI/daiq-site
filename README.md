# daiq-site

Marketing site and blog for www.dentalassetiq.com. The DentalAssetIQ app lives at app.dentalassetiq.com and is a separate project.

- Blog posts: `content/posts/<slug>.html` plus `<slug>.meta.json` (same slugs as the old Kajabi blog).
- Free guide PDFs go in `private-downloads/` as `<slug>.pdf` (slugs are in `lib/site.ts`).
- Env vars (set in Vercel, never committed): `RESEND_API_KEY`, `RESEND_FROM`, `CONTACT_TO`.
- Pushing to `main` deploys to production automatically.

