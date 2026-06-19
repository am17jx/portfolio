import { ProjectCard } from '@/components/ui/ProjectCard'
import { projects } from '@/lib/data'

export function Projects() {
  const featured = projects.filter((p) => p.featured)

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-terminal-green text-sm mb-2 tracking-widest uppercase">
          Projects
        </p>
        <h2 className="text-3xl font-bold text-slate-100 mb-4">
          Featured Work
        </h2>
        <p className="text-slate-400 mb-12 max-w-xl">
          A selection of projects I&apos;ve built or contributed to. Each one
          has a full case study.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
