import { GitPullRequest } from 'lucide-react'
import { RiGithubFill } from 'react-icons/ri'
import { personalInfo } from '@/lib/data'

const contributions = [
  {
    repo: 'vercel/next.js',
    description: 'Fixed image optimization memory leak in App Router (#58432)',
    url: 'https://github.com/vercel/next.js/pull/58432',
  },
  {
    repo: 'tailwindlabs/tailwindcss',
    description: 'Added `text-wrap: balance` utility (#10545)',
    url: 'https://github.com/tailwindlabs/tailwindcss/pull/10545',
  },
  {
    repo: 'prisma/prisma',
    description: 'Improved TypeScript types for nested `include` queries (#19812)',
    url: 'https://github.com/prisma/prisma/pull/19812',
  },
  {
    repo: 'openai/openai-node',
    description: 'Added streaming helper types for chat completions (#477)',
    url: 'https://github.com/openai/openai-node/pull/477',
  },
]

export function OpenSource() {
  return (
    <section id="open-source" className="py-24 bg-bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-terminal-green text-sm mb-2 tracking-widest uppercase">
          Open Source
        </p>
        <h2 className="text-3xl font-bold text-slate-100 mb-8">
          Community contributions
        </h2>

        {/* GitHub contribution graph */}
        <div className="mb-10 p-4 bg-bg-secondary border border-border-subtle rounded-xl overflow-x-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://ghchart.rshah.org/00ff88/${personalInfo.githubUsername}`}
            alt={`${personalInfo.name} GitHub contribution graph`}
            className="min-w-[600px] w-full"
          />
        </div>

        {/* Notable contributions */}
        <h3 className="font-mono text-terminal-cyan text-xs uppercase tracking-widest mb-4">
          Notable Contributions
        </h3>
        <ul className="space-y-3 mb-8">
          {contributions.map((c) => (
            <li key={c.url}>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 bg-bg-secondary border border-border-subtle rounded-lg hover:border-terminal-green/50 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-cyan"
              >
                <GitPullRequest
                  size={16}
                  className="text-terminal-green mt-0.5 shrink-0"
                />
                <div>
                  <span className="font-mono text-sm text-terminal-cyan group-hover:text-terminal-green transition-colors">
                    {c.repo}
                  </span>
                  <p className="text-sm text-slate-400 mt-0.5">{c.description}</p>
                </div>
              </a>
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
