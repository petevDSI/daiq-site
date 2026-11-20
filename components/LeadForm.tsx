'use client'

import { useState } from 'react'

interface Props {
  // Slug of a free download, or "newsletter" for a general sign-up.
  list: string
  buttonLabel?: string
  source?: string
}

export default function LeadForm({ list, buttonLabel = 'Send it to me', source = 'site' }: Props) {
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setState('sending')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.get('email'),
          name: data.get('name'),
          website: data.get('website'), // honeypot
          list,
          source,
        }),
      })
      const json = (await res.json()) as { ok?: boolean; message?: string }
      if (res.ok && json.ok) {
        setState('ok')
        setMessage(json.message ?? 'Check your inbox.')
        form.reset()
      } else {
        setState('err')
        setMessage(json.message ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setState('err')
      setMessage('Something went wrong. Please try again.')
    }
  }

  if (state === 'ok') return <div className="form-ok">{message}</div>

  return (
    <form onSubmit={onSubmit}>
      <div className="form-row">
        <input className="input" type="text" name="name" placeholder="First name" autoComplete="given-name" />
        <input className="input" type="email" name="email" placeholder="Work email" required autoComplete="email" />
        <input className="hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button className="btn btn-navy" type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : buttonLabel}
        </button>
      </div>
      {state === 'err' && <div className="form-err" style={{ marginTop: 10 }}>{message}</div>}
      <p className="form-note">No spam. Unsubscribe any time.</p>
    </form>
  )
}
