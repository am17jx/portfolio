'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { RiGithubFill } from 'react-icons/ri'
import { Project } from '@/lib/types'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-bg-secondary border border-border-subtle rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 hover:border-terminal-green/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-cyan"
    >
      <article>
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

          {/* Code link decoration */}
          <div className="flex items-center gap-1.5 text-sm text-slate-500 group-hover:text-terminal-green transition-colors font-medium">
            <RiGithubFill size={15} />
            <span>Code</span>
          </div>
        </div>
      </article>
    </a>
  )
}
