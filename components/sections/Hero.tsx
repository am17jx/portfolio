'use client'

import { useState, useEffect } from 'react'
import { ArrowDown, Download } from 'lucide-react'
import { motion } from 'framer-motion'
import { RiGithubFill, RiLinkedinBoxFill, RiTwitterXFill } from 'react-icons/ri'
import { TerminalDecoration } from '@/components/ui/TerminalDecoration'
import { personalInfo } from '@/lib/data'

const roles = ['Full-Stack Developer', 'Open Source Contributor', 'Tech Writer']

function useTypingEffect(strings: string[]) {
  const [displayed, setDisplayed] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = strings[roleIndex]

    if (!deleting && charIndex < current.length) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1))
        setCharIndex((c) => c + 1)
      }, 60)
      return () => clearTimeout(t)
    }

    if (!deleting && charIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), 2000)
      return () => clearTimeout(t)
    }

    if (deleting && charIndex > 0) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1))
        setCharIndex((c) => c - 1)
      }, 35)
      return () => clearTimeout(t)
    }

    if (deleting && charIndex === 0) {
      setDeleting(false)
      setRoleIndex((i) => (i + 1) % strings.length)
    }
  }, [charIndex, deleting, roleIndex, strings])

  return displayed
}

export function Hero() {
  const typedRole = useTypingEffect(roles)

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-terminal-green text-sm mb-4 tracking-widest uppercase">
              Available for work
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-100 mb-4">
              Hi, I&apos;m{' '}
              <span className="text-terminal-green">{personalInfo.name}</span>
            </h1>
            <div className="h-10 mb-6">
              <span className="text-xl sm:text-2xl text-terminal-cyan font-mono">
                {typedRole}
                <span className="cursor-blink">|</span>
              </span>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
              {personalInfo.bio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="#projects"
                className="px-6 py-3 bg-terminal-green text-bg-primary font-semibold rounded-lg hover:bg-terminal-cyan transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
              >
                View Projects
              </a>
              <a
                href={personalInfo.resumeUrl}
                download
                className="px-6 py-3 border border-border-subtle text-slate-300 font-semibold rounded-lg hover:border-terminal-green hover:text-terminal-green transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
              >
                <Download size={16} />
                Download Resume
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-5">
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="text-slate-500 hover:text-terminal-green transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-cyan rounded"
              >
                <RiGithubFill size={22} />
              </a>
              <a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="text-slate-500 hover:text-terminal-cyan transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-cyan rounded"
              >
                <RiLinkedinBoxFill size={22} />
              </a>
              <a
                href={personalInfo.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X profile"
                className="text-slate-500 hover:text-terminal-cyan transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-cyan rounded"
              >
                <RiTwitterXFill size={22} />
              </a>
            </div>
          </motion.div>

          {/* Right column: terminal */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex justify-center"
          >
            <TerminalDecoration />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center mt-16"
        >
          <a
            href="#about"
            aria-label="Scroll to About section"
            className="text-slate-600 hover:text-terminal-green transition-colors animate-bounce focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-cyan rounded"
          >
            <ArrowDown size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
