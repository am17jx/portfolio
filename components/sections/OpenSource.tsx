'use client'

import { Award, Heart } from 'lucide-react'
import { RiGithubFill } from 'react-icons/ri'
import { personalInfo } from '@/lib/data'

const certificates = [
  {
    title: 'Node.js, Express, MongoDB & More: The Complete Bootcamp',
    issuer: 'Udemy',
    category: 'Backend',
  },
  {
    title: 'Postman API Fundamentals Student Expert',
    issuer: 'Postman',
    category: 'APIs',
  },
  {
    title: 'Getting Started with Git and GitHub',
    issuer: 'IBM / Coursera',
    category: 'DevOps',
  },
  {
    title: 'Hands-on Introduction to Linux Commands and Shell Scripting',
    issuer: 'IBM',
    category: 'Linux',
  },
  {
    title: 'Python for Data Science, AI & Development',
    issuer: 'IBM',
    category: 'Python',
  },
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'CISCO',
    category: 'Security',
  },
  {
    title: 'Programming with JavaScript',
    issuer: 'University of Michigan',
    category: 'JavaScript',
  },
  {
    title: 'Introduction to Software Engineering',
    issuer: 'University of Michigan',
    category: 'Engineering',
  },
  {
    title: 'Introduction to HTML5',
    issuer: 'IBM',
    category: 'Frontend',
  },
  {
    title: 'IoT Hackathon Project',
    issuer: 'Al-Nahrain University',
    category: 'IoT',
  },
]

const volunteering = [
  'Volunteer at TEDx Event',
  'Volunteer at Baghdad International Book Fair',
  'Participant in the Parliamentary Development Institute with the House of Representatives',
  'Volunteer in the University Podcast (Laama)',
]

export function OpenSource() {
  return (
    <section id="open-source" className="py-24 bg-bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* GitHub contribution graph */}
        <p className="font-mono text-terminal-green text-sm mb-2 tracking-widest uppercase">
          GitHub
        </p>
        <h2 className="text-3xl font-bold text-slate-100 mb-8">
          Contribution graph
        </h2>
        <div className="mb-16 p-4 bg-bg-secondary border border-border-subtle rounded-xl overflow-x-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://ghchart.rshah.org/00ff88/${personalInfo.githubUsername}`}
            alt={`${personalInfo.name} GitHub contribution graph`}
            className="min-w-[600px] w-full"
          />
        </div>

        {/* Certificates */}
        <p className="font-mono text-terminal-green text-sm mb-2 tracking-widest uppercase">
          Credentials
        </p>
        <h2 className="text-3xl font-bold text-slate-100 mb-8">
          Certificates &amp; Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-16">
          {certificates.map((cert) => (
            <div
              key={cert.title}
              className="flex items-start gap-3 p-4 bg-bg-secondary border border-border-subtle rounded-lg hover:border-terminal-green/50 transition-colors"
            >
              <Award size={16} className="text-terminal-green mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-slate-200 font-medium leading-snug">{cert.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-500">{cert.issuer}</span>
                  <span className="px-1.5 py-0.5 bg-terminal-green/10 text-terminal-green text-xs font-mono rounded">
                    {cert.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Volunteering */}
        <p className="font-mono text-terminal-green text-sm mb-2 tracking-widest uppercase">
          Community
        </p>
        <h2 className="text-3xl font-bold text-slate-100 mb-6">
          Volunteering
        </h2>
        <ul className="space-y-3 mb-10">
          {volunteering.map((v) => (
            <li
              key={v}
              className="flex items-center gap-3 p-4 bg-bg-secondary border border-border-subtle rounded-lg"
            >
              <Heart size={15} className="text-terminal-green shrink-0" />
              <span className="text-sm text-slate-300">{v}</span>
            </li>
          ))}
        </ul>

        <a
          href={personalInfo.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-border-subtle text-slate-300 rounded-lg hover:border-terminal-green hover:text-terminal-green transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-cyan"
        >
          <RiGithubFill size={16} />
          View GitHub Profile
        </a>
      </div>
    </section>
  )
}
