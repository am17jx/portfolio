import { Skill } from '@/lib/types'

interface SkillBadgeProps {
  skill: Skill
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-bg-secondary border border-border-subtle rounded-lg hover:border-terminal-green/50 transition-colors group">
      <i
        className={`${skill.icon} text-lg`}
        aria-hidden="true"
      />
      <span className="text-sm text-slate-300 group-hover:text-slate-100 transition-colors whitespace-nowrap">
        {skill.name}
      </span>
    </div>
  )
}
