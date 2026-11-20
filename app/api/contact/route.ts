import { Resend } from 'resend'
import { CONTACT_EMAIL } from '@/lib/site'

export const runtime = 'nodejs'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function esc(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string)
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return Response.json({ ok: false, message: 'Invalid request.' }, { status: 400 })
  }
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return Response.json({ ok: true, message: 'Thanks. We will be in touch.' })
  }

  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 100) : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, 5000) : ''
  if (!EMAIL_RE.test(email) || message.length < 5) {
    return Response.json({ ok: false, message: 'Please add your email and a message.' }, { status: 400 })
  }

  const apiKey = (process.env.RESEND_API_KEY ?? process.env.resend_api_key)
  const from = process.env.RESEND_FROM
  if (!apiKey || !from) {
    console.error('[contact] RESEND_API_KEY or RESEND_FROM is not set')
    return Response.json(
      { ok: false, message: `The form is briefly unavailable. Please email ${CONTACT_EMAIL} directly.` },
      { status: 503 },
    )
  }

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to: process.env.CONTACT_TO ?? CONTACT_EMAIL,
      replyTo: email,
      subject: `DentalAssetIQ contact form: ${name || email}`,
      html: `<p><strong>${esc(name)}</strong> &lt;${esc(email)}&gt;</p><p>${esc(message).replace(/\n/g, '<br/>')}</p>`,
    })
    if (error) throw new Error(error.message)
  } catch (err) {
    console.error('[contact] send failed', err)
    return Response.json(
      { ok: false, message: `We could not send that just now. Please email ${CONTACT_EMAIL} directly.` },
      { status: 502 },
    )
  }
  return Response.json({ ok: true, message: 'Thanks. We will be in touch soon.' })
}
