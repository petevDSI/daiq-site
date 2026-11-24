import { Resend } from 'resend'
import { CONTACT_EMAIL } from '@/lib/site'

export const runtime = 'nodejs'

// The Repair or Replace tool (tools.dentalassetiq.com) is a separate static site,
// so this endpoint answers cross-origin requests from it.
const ALLOWED_ORIGINS = [
  'https://tools.dentalassetiq.com',
  'https://www.dentalassetiq.com',
  'https://dentalassetiq.com',
  'https://www.dentalstrategyinstitute.com',
  'http://localhost:8080',
  'http://localhost:5173',
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function esc(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string)
}

function cors(req: Request): Record<string, string> {
  const origin = req.headers.get('origin') ?? ''
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  }
}

function reply(req: Request, body: Record<string, unknown>, status = 200) {
  return Response.json(body, { status, headers: cors(req) })
}

export async function OPTIONS(req: Request) {
  return new Response(null, { status: 204, headers: cors(req) })
}

function field(body: Record<string, unknown>, key: string, max: number) {
  const v = body[key]
  return typeof v === 'string' ? v.trim().slice(0, max) : ''
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return reply(req, { ok: false, message: 'Invalid request.' }, 400)
  }

  // Honeypot: pretend success for bots.
  if (field(body, 'website', 200) !== '') return reply(req, { ok: true })

  const name = field(body, 'name', 120)
  const email = field(body, 'email', 254).toLowerCase()
  const phone = field(body, 'phone', 40)
  const zip = field(body, 'zip', 10)
  const equipment = field(body, 'equipment', 120)
  const brand = field(body, 'brand', 120)

  if (!name || !EMAIL_RE.test(email) || zip.length < 5) {
    return reply(req, { ok: false, message: 'Please enter your name, a valid email and your ZIP code.' }, 400)
  }

  const apiKey = process.env.RESEND_API_KEY ?? process.env.resend_api_key
  const from = process.env.RESEND_FROM
  if (!apiKey || !from) {
    console.error('[quote-request] RESEND_API_KEY or RESEND_FROM is not set')
    return reply(req, { ok: false, message: `We could not take your request just now. Please email ${CONTACT_EMAIL}.` }, 503)
  }

  const resend = new Resend(apiKey)
  const to = process.env.CONTACT_TO ?? CONTACT_EMAIL

  // The lead goes to the owner first. If this fails, the visitor must be told.
  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Repair or Replace quote request: ${equipment || 'equipment'}`,
      html: `<p><strong>New quote request from the Repair or Replace tool</strong></p>
<p>Name: ${esc(name)}<br/>Email: ${esc(email)}<br/>Phone: ${esc(phone) || 'not given'}<br/>ZIP: ${esc(zip)}<br/>Equipment: ${esc(equipment) || 'not given'}<br/>Recommended brand: ${esc(brand) || 'not given'}</p>`,
    })
    if (error) throw new Error(error.message)
  } catch (err) {
    console.error('[quote-request] owner email failed', err)
    return reply(req, { ok: false, message: `We could not send your request. Please email ${CONTACT_EMAIL}.` }, 502)
  }

  // Confirmation to the requester. A failure here does not lose the lead.
  try {
    await resend.emails.send({
      from,
      to: email,
      replyTo: CONTACT_EMAIL,
      subject: 'We received your equipment quote request',
      html: `<p>Hi ${esc(name)},</p><p>Thanks for your request${equipment ? ` about your ${esc(equipment.toLowerCase())}` : ''}. We will follow up with next steps.</p><p>DentalAssetIQ, from Dental Strategy Institute</p>`,
    })
  } catch (err) {
    console.error('[quote-request] confirmation failed', err)
  }

  return reply(req, { ok: true })
}
