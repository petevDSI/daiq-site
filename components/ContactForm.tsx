'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const d = new FormData(form)
    setState('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: d.get('name'), email: d.get('email'), message: d.get('message'), website: d.get('website') }),
      })
      const json = (await res.json()) as { ok?: boolean; message?: string }
      setState(res.ok && json.ok ? 'ok' : 'err')
      setMessage(json.message ?? '')
      if (res.ok && json.ok) form.reset()
    } catch {
      setState('err')
      setMessage('Something went wrong. Please try again.')
    }
  }

  if (state === 'ok') return <div className="form-ok">{message}</div>

  return (
    <form onSubmit={onSubmit}>
      <div className="form-row" style={{ marginBottom: 10 }}>
        <input className="input" name="name" placeholder="Your name" autoComplete="name" />
        <input className="input" type="email" name="email" placeholder="Email" required autoComplete="email" />
      </div>
      <input className="hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <textarea className="input" name="message" placeholder="How can we help?" required />
      <div style={{ marginTop: 12 }}>
        <button className="btn btn-navy" type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Send message'}
        </button>
      </div>
      {state === 'err' && <div className="form-err" style={{ marginTop: 10 }}>{message}</div>}
    </form>
  )
}
