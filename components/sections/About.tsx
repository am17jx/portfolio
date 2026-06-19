import { personalInfo } from '@/lib/data'
import { Building2, Sparkles } from 'lucide-react'

const stats = [
  { label: 'Years Experience', value: `${personalInfo.yearsExperience}+` },
  { label: 'Projects Built', value: `${personalInfo.projectsShipped}+` },
  { label: 'Certificates', value: '10+' },
]

export function About() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div>
            <p className="font-mono text-terminal-green text-sm mb-2 tracking-widest uppercase">
              About
            </p>
            <h2 className="text-3xl font-bold text-slate-100 mb-6">
              The person behind the code
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              {personalInfo.summary}
            </p>
            <div className="flex flex-col gap-3 text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
                <Building2 size={16} className="text-slate-500" />
                <span>
                  Currently:{' '}
                  <span className="text-slate-200 font-medium">
                    {personalInfo.currentRole} @ {personalInfo.company}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500">📍</span>
                <span className="text-slate-300">Baghdad, Iraq</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500">🎓</span>
                <span className="text-slate-300">ICE Engineer — Al-Nahrain University · Graduating 2026</span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-6">
            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-bg-secondary border border-border-subtle rounded-lg p-4 text-center"
                >
                  <div className="text-2xl font-bold text-terminal-green font-mono">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Fun fact */}
            <div className="border border-terminal-green/30 bg-terminal-green/5 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} className="text-terminal-green" />
                <span className="font-mono text-terminal-green text-xs uppercase tracking-widest">
                  Fun fact
                </span>
              </div>
              <p className="font-mono text-sm text-slate-300 leading-relaxed">
                {personalInfo.funFact}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
