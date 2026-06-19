import { RiGithubFill, RiLinkedinBoxFill } from 'react-icons/ri'
import { personalInfo } from '@/lib/data'

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500 font-mono">
          © {new Date().getFullYear()} {personalInfo.name}. Built with Next.js & ♥
        </p>
        <div className="flex items-center gap-4">
          <a
            href={personalInfo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-slate-500 hover:text-terminal-green transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-cyan rounded"
          >
            <RiGithubFill size={18} />
          </a>
          <a
            href={personalInfo.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-slate-500 hover:text-terminal-cyan transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-cyan rounded"
          >
            <RiLinkedinBoxFill size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
