import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { RiGithubFill } from 'react-icons/ri'
import { projects, getProjectBySlug } from '@/lib/data'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  try {
    const project = getProjectBySlug(params.slug)
    return {
      title: project.title,
      description: project.description,
    }
  } catch {
    return { title: 'Project Not Found' }
  }
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string }
}) {
  let project
  try {
    project = getProjectBySlug(params.slug)
  } catch {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
      {/* Back link */}
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-terminal-green transition-colors mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-cyan rounded"
      >
        <ArrowLeft size={14} />
        Back to Projects
      </Link>

      {/* Hero */}
      <div className="mb-10">
        <div className="flex flex-wrap items-start gap-4 mb-4">
          <h1 className="text-4xl font-bold text-slate-100 flex-1">
            {project.title}
          </h1>
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-terminal-green transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-cyan rounded"
            >
              <RiGithubFill size={16} /> Code
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-terminal-cyan transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-cyan rounded"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </div>
        <p className="text-lg text-slate-400 mb-4">{project.description}</p>
        <p className="font-mono text-terminal-green text-sm">
          ✓ {project.outcome}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-bg-secondary text-xs text-slate-400 rounded border border-border-subtle font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border-subtle mb-10" />

      {/* Problem */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-100 mb-3 flex items-center gap-2">
          <span className="text-terminal-cyan font-mono text-sm">01</span>
          Problem &amp; User Context
        </h2>
        <p className="text-slate-400 leading-relaxed">{project.problem}</p>
      </section>

      {/* Constraints */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-100 mb-3 flex items-center gap-2">
          <span className="text-terminal-cyan font-mono text-sm">02</span>
          Constraints &amp; Tradeoffs
        </h2>
        <p className="text-slate-400 leading-relaxed">{project.constraints}</p>
      </section>

      {/* Architecture */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-100 mb-3 flex items-center gap-2">
          <span className="text-terminal-cyan font-mono text-sm">03</span>
          Architecture &amp; Data Flow
        </h2>
        <pre className="bg-bg-secondary border border-border-subtle rounded-lg p-4 text-sm text-slate-300 font-mono overflow-x-auto whitespace-pre-wrap">
          {project.architecture}
        </pre>
      </section>

      {/* Screenshots */}
      {project.screenshots.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
            <span className="text-terminal-cyan font-mono text-sm">04</span>
            Screenshots
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.screenshots.map((src, i) => (
              <div
                key={src}
                className="relative aspect-video bg-bg-secondary border border-border-subtle rounded-lg overflow-hidden"
              >
                <Image
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Results */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-100 mb-3 flex items-center gap-2">
          <span className="text-terminal-cyan font-mono text-sm">05</span>
          Results &amp; Lessons Learned
        </h2>
        <p className="text-slate-400 leading-relaxed">{project.results}</p>
      </section>

      {/* Back link */}
      <div className="h-px bg-border-subtle mb-8" />
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-terminal-green transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-cyan rounded"
      >
        <ArrowLeft size={14} />
        Back to Projects
      </Link>
    </div>
  )
}
