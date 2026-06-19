import { Experience } from '@/lib/types'

interface TimelineItemProps {
  experience: Experience
  isLast: boolean
}

export function TimelineItem({ experience, isLast }: TimelineItemProps) {
  return (
    <div className="relative flex gap-6">
      {/* Left rail */}
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-terminal-green ring-4 ring-bg-primary mt-1.5 shrink-0" />
        {!isLast && (
          <div className="w-px flex-1 bg-border-subtle mt-1" />
        )}
      </div>

      {/* Content */}
      <div className={`pb-10 ${isLast ? '' : ''}`}>
        <div className="flex flex-wrap items-baseline gap-2 mb-1">
          <h3 className="font-bold text-slate-100">{experience.role}</h3>
          <span className="text-slate-500 text-sm">·</span>
          <span className="text-terminal-cyan text-sm font-medium">
            {experience.company}
          </span>
          <span className="text-slate-500 text-sm ml-auto font-mono">
            {experience.startDate} – {experience.endDate}
          </span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mb-3">
          {experience.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-bg-primary text-xs text-slate-500 rounded border border-border-subtle font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
