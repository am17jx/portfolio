'use client'

import { useState, FormEvent } from 'react'
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { personalInfo } from '@/lib/data'

type Status = 'idle' | 'sending' | 'success' | 'error'

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-mono text-terminal-green text-sm mb-2 tracking-widest uppercase">
          Contact
        </p>
        <h2 className="text-3xl font-bold text-slate-100 mb-4">
          Interested in working together?
        </h2>
        <p className="text-slate-400 mb-6">
          Whether it&apos;s a freelance project, a full-time role, or a
          consulting engagement — I&apos;d love to hear about it.
        </p>

        {/* Email link */}
        <a
          href={`mailto:${personalInfo.email}`}
          className="inline-flex items-center gap-2 text-xl font-mono text-terminal-green hover:text-terminal-cyan transition-colors mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-cyan rounded"
        >
          <Mail size={20} />
          {personalInfo.email}
        </a>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-border-subtle" />
          <span className="text-slate-500 text-sm font-mono">or send a message</span>
          <div className="flex-1 h-px bg-border-subtle" />
        </div>

        {/* Form */}
        {status === 'success' ? (
          <div className="flex flex-col items-center gap-3 py-10 border border-terminal-green/30 bg-terminal-green/5 rounded-xl">
            <CheckCircle size={32} className="text-terminal-green" />
            <p className="text-slate-200 font-medium">Message sent!</p>
            <p className="text-slate-400 text-sm">
              I&apos;ll get back to you within 24–48 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
            <div>
              <label
                htmlFor="name"
                className="block text-sm text-slate-400 mb-1.5 font-mono"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Jane Smith"
                className="w-full px-4 py-3 bg-bg-secondary border border-border-subtle rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-terminal-green focus:ring-1 focus:ring-terminal-green transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-slate-400 mb-1.5 font-mono"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="jane@example.com"
                className="w-full px-4 py-3 bg-bg-secondary border border-border-subtle rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-terminal-green focus:ring-1 focus:ring-terminal-green transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm text-slate-400 mb-1.5 font-mono"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full px-4 py-3 bg-bg-secondary border border-border-subtle rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-terminal-green focus:ring-1 focus:ring-terminal-green transition-colors resize-none"
              />
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={15} />
                Something went wrong. Please try emailing me directly.
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full sm:w-auto self-end px-6 py-3 bg-terminal-green text-bg-primary font-semibold rounded-lg hover:bg-terminal-cyan transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
            >
              <Send size={16} />
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        )}

        <p className="text-slate-600 text-sm mt-6">
          I typically reply within 24–48 hours.
        </p>
      </div>
    </section>
  )
}
