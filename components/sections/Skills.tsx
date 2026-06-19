import { SkillBadge } from '@/components/ui/SkillBadge'
import { skills } from '@/lib/data'
import { Skill } from '@/lib/types'

const categories: { key: Skill['category']; label: string }[] = [
  { key: 'languages', label: 'Languages' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'devops', label: 'DevOps' },
]

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-terminal-green text-sm mb-2 tracking-widest uppercase">
          Skills
        </p>
        <h2 className="text-3xl font-bold text-slate-100 mb-12">
          Tools of the trade
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map(({ key, label }) => {
            const categorySkills = skills.filter((s) => s.category === key)
            return (
              <div key={key}>
                <h3 className="font-mono text-terminal-cyan text-xs uppercase tracking-widest mb-4">
                  {label}
                </h3>
                <div className="flex flex-col gap-2">
                  {categorySkills.map((skill) => (
                    <SkillBadge key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
