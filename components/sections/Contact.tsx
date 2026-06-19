'use client'

import { useState, FormEvent } from 'react'
import { Mail, Send, CheckCircle } from 'lucide-react'
import { personalInfo } from '@/lib/data'

export function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const name    = (form.elements.namedItem('name')    as HTMLInputElement).value.trim()
    const email   = (form.elements.namedItem('email')   as HTMLInputElement).value.trim()
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim()

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`)
    const body    = encodeURIComponent(
      `Hi Ameer,\n\nMy name is ${name} and my email is ${email}.\n\n${message}\n\nBest regards,\n${name}`
    )

    // Opens Gmail compose in a new tab pre-filled with the message
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}&su=${subject}&body=${body}`
    window.open(gmailUrl, '_blank')

    setSubmitted(true)
    form.reset()
  }

  return (
    <section id="contact" className="py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-mono text-terminal-green text-sm mb-2 tracking-widest uppercase">
          Contact
        </p>
        <h2 className="text-3xl font-bold text-slate-100 mb-4">
          Let&apos;s build something together
        </h2>
        <p className="text-slate-400 mb-6">
          Whether it&apos;s a backend project, an internship opportunity, or just a conversation about tech
          — I&apos;d love to hear from you.
        </p>

        {/* Direct email link */}
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
        {submitted ? (
          <div
            role="status"
            aria-live="polite"
            className="flex flex-col items-center gap-3 py-10 border border-terminal-green/30 bg-terminal-green/5 rounded-xl"
          >
            <CheckCircle size={32} className="text-terminal-green" />
            <p className="text-slate-200 font-medium">Gmail opened with your message!</p>
            <p className="text-slate-400 text-sm">
              Just hit Send inside Gmail and I&apos;ll get back to you within 24–48 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-2 text-sm text-terminal-green hover:text-terminal-cyan transition-colors font-mono"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
            <div>
              <label htmlFor="contact-name" className="block text-sm text-slate-400 mb-1.5 font-mono">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                placeholder="Jane Smith"
                className="w-full px-4 py-3 bg-bg-secondary border border-border-subtle rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-terminal-green focus:ring-1 focus:ring-terminal-green transition-colors"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-sm text-slate-400 mb-1.5 font-mono">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder="jane@example.com"
                className="w-full px-4 py-3 bg-bg-secondary border border-border-subtle rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-terminal-green focus:ring-1 focus:ring-terminal-green transition-colors"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm text-slate-400 mb-1.5 font-mono">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full px-4 py-3 bg-bg-secondary border border-border-subtle rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-terminal-green focus:ring-1 focus:ring-terminal-green transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto self-end px-6 py-3 bg-terminal-green text-bg-primary font-semibold rounded-lg hover:bg-terminal-cyan transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
            >
              <Send size={16} />
              Send via Gmail
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
