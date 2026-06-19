import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { Project } from '@/lib/types'

interface CaseStudyPreviewProps {
  project: Project
}

export function CaseStudyPreview({ project }: CaseStudyPreviewProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex items-start gap-3 p-4 bg-bg-secondary border border-border-subtle rounded-lg hover:border-terminal-green/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-cyan"
    >
      <BookOpen
        size={16}
        className="text-terminal-green mt-0.5 shrink-0"
      />
      <div>
        <p className="text-sm font-medium text-slate-200 group-hover:text-terminal-green transition-colors">
          {project.title}
        </p>
        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
          {project.outcome}
        </p>
      </div>
    </Link>
  )
}
