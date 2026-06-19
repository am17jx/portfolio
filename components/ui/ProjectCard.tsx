'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, BookOpen, Star } from 'lucide-react'
import { RiGithubFill } from 'react-icons/ri'
import { Project } from '@/lib/types'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <article className="group bg-bg-secondary border border-border-subtle rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 hover:border-terminal-green/40 transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-video bg-bg-primary overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 relative z-10"
          sizes="(max-width: 768px) 100vw, 50vw"
          onError={() => setImageError(true)}
        />
        {/* Placeholder overlay shown only when image fails to load */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-bg-secondary">
            <span className="font-mono text-terminal-green text-2xl opacity-30">
              {'</>'}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-slate-100 group-hover:text-terminal-green transition-colors">
            {project.title}
          </h3>
          {project.stars && (
            <span className="flex items-center gap-1 text-xs text-slate-500 font-mono ml-2 shrink-0">
              <Star size={12} className="text-yellow-500" />
              {project.stars >= 1000
                ? `${(project.stars / 1000).toFixed(1)}k`
                : project.stars}
            </span>
          )}
        </div>

        <p className="text-slate-400 text-sm mb-3 line-clamp-2">
          {project.description}
        </p>
        <p className="text-terminal-cyan text-xs font-mono mb-4 line-clamp-1">
          ✓ {project.outcome}
        </p>

        {/* Tech stack tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-bg-primary text-xs text-slate-400 rounded border border-border-subtle font-mono"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 text-slate-500">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} GitHub repository`}
            className="flex items-center gap-1.5 text-sm hover:text-terminal-green transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-cyan rounded"
          >
            <RiGithubFill size={15} />
            Code
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="flex items-center gap-1.5 text-sm hover:text-terminal-cyan transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-cyan rounded"
            >
              <ExternalLink size={15} />
              Live
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="flex items-center gap-1.5 text-sm hover:text-terminal-cyan transition-colors ml-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-cyan rounded"
          >
            <BookOpen size={15} />
            Case Study
          </Link>
        </div>
      </div>
    </article>
  )
}
