import { TimelineItem } from '@/components/ui/TimelineItem'
import { experiences } from '@/lib/data'

export function Experience() {
  return (
    <section id="experience" className="py-24 bg-bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-terminal-green text-sm mb-2 tracking-widest uppercase">
          Experience
        </p>
        <h2 className="text-3xl font-bold text-slate-100 mb-12">
          Where I&apos;ve worked
        </h2>

        <div className="max-w-2xl">
          {experiences.map((exp, i) => (
            <TimelineItem
              key={`${exp.company}-${exp.startDate}`}
              experience={exp}
              isLast={i === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
