import fs from 'node:fs'
import path from 'node:path'
import { Resend } from 'resend'
import { DOWNLOADS, CONTACT_EMAIL } from '@/lib/site'

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

  // Honeypot: bots fill the hidden field. Pretend success.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return Response.json({ ok: true, message: 'Thanks. Check your inbox.' })
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 80) : ''
  const list = typeof body.list === 'string' ? body.list : 'newsletter'
  const source = typeof body.source === 'string' ? body.source.slice(0, 120) : 'site'

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return Response.json({ ok: false, message: 'Please enter a valid email address.' }, { status: 400 })
  }

  const download = DOWNLOADS.find((d) => d.slug === list)
  if (list !== 'newsletter' && !download) {
    return Response.json({ ok: false, message: 'Unknown download.' }, { status: 400 })
  }

  const apiKey = (process.env.RESEND_API_KEY ?? process.env.resend_api_key)
  const from = process.env.RESEND_FROM
  if (!apiKey || !from) {
    // Fail loudly rather than quietly dropping a lead.
    console.error('[subscribe] RESEND_API_KEY or RESEND_FROM is not set')
    return Response.json(
      { ok: false, message: `Sign-ups are briefly unavailable. Email ${CONTACT_EMAIL} and we will send it right over.` },
      { status: 503 },
    )
  }

  const resend = new Resend(apiKey)

  try {
    await resend.contacts.create({
      email,
      firstName: name || undefined,
      unsubscribed: false,
    })
  } catch (err) {
    // A duplicate contact is fine. Anything else is logged, and we still deliver the guide.
    console.error('[subscribe] contact create failed', err)
  }

  const greeting = name ? `Hi ${esc(name)},` : 'Hi,'
  let subject = 'Welcome to DentalAssetIQ'
  let html = `<p>${greeting}</p><p>Thanks for subscribing. We send new dental equipment valuation guides and market notes from DentalAssetIQ, a Dental Strategy Institute product.</p><p>Pete Volk<br/>DentalAssetIQ</p>`
  let attachments: { filename: string; content: Buffer }[] | undefined
  let message = 'Thanks. Check your inbox for a confirmation.'

  if (download) {
    subject = `Your guide: ${download.title}`
    const file = path.join(process.cwd(), 'private-downloads', `${download.slug}.pdf`)
    if (fs.existsSync(file)) {
      attachments = [{ filename: `${download.slug}.pdf`, content: fs.readFileSync(file) }]
      html = `<p>${greeting}</p><p>Your copy of <strong>${esc(download.title)}</strong> is attached.</p><p>If you want to see what your equipment is actually worth, you can scan a tag free at <a href="https://app.dentalassetiq.com/scan">app.dentalassetiq.com/scan</a>.</p><p>Pete Volk<br/>DentalAssetIQ</p>`
      message = 'Done. Your guide is on its way to your inbox.'
    } else {
      html = `<p>${greeting}</p><p>Thanks for requesting <strong>${esc(download.title)}</strong>. We will email it to you within one business day.</p><p>Pete Volk<br/>DentalAssetIQ</p>`
      message = 'Thanks. We will email your guide within one business day.'
      console.warn(`[subscribe] missing private-downloads/${download.slug}.pdf, manual fulfillment needed for ${email}`)
    }
  }

  try {
    const { error } = await resend.emails.send({
      from,
      to: email,
      replyTo: CONTACT_EMAIL,
      subject,
      html,
      attachments,
    })
    if (error) throw new Error(error.message)
  } catch (err) {
    console.error('[subscribe] send failed', err)
    return Response.json(
      { ok: false, message: `We could not send the email just now. Please email ${CONTACT_EMAIL} and we will send it by hand.` },
      { status: 502 },
    )
  }

  // Tell the owner about the lead so nothing depends on the contact list alone.
  try {
    await resend.emails.send({
      from,
      to: process.env.CONTACT_TO ?? CONTACT_EMAIL,
      subject: `New DentalAssetIQ lead: ${list}`,
      html: `<p><strong>${esc(email)}</strong> ${name ? `(${esc(name)})` : ''}<br/>List: ${esc(list)}<br/>Source: ${esc(source)}</p>`,
    })
  } catch (err) {
    console.error('[subscribe] owner notice failed', err)
  }

  return Response.json({ ok: true, message })
}
