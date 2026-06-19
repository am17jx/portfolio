'use client'

import { useState, useEffect } from 'react'

const lines = [
  '$ git clone https://github.com/alexchen/devflow',
  '$ cd devflow && npm install',
  '$ npm run dev',
  '  ▲ Next.js 14.0.0',
  '  ✓ Ready on http://localhost:3000',
]

export function TerminalDecoration() {
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done) return
    if (currentLine >= lines.length) {
      setDone(true)
      return
    }

    const line = lines[currentLine]
    if (currentChar < line.length) {
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => {
          const next = [...prev]
          next[currentLine] = (next[currentLine] ?? '') + line[currentChar]
          return next
        })
        setCurrentChar((c) => c + 1)
      }, 35)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine((l) => l + 1)
        setCurrentChar(0)
      }, 120)
      return () => clearTimeout(timeout)
    }
  }, [currentLine, currentChar, done])

  return (
    <div className="w-full max-w-lg rounded-lg overflow-hidden border border-border-subtle shadow-2xl shadow-black/50">
      {/* Terminal title bar */}
      <div className="bg-bg-secondary px-4 py-3 flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-4 text-xs text-slate-500 font-mono">
          terminal — bash
        </span>
      </div>

      {/* Terminal body */}
      <div className="bg-bg-primary/80 p-4 font-mono text-sm min-h-[160px]">
        {lines.map((line, i) => (
          <div key={i} className="leading-relaxed">
            {i < visibleLines.length ? (
              <span
                className={
                  line.startsWith('$')
                    ? 'text-terminal-green'
                    : 'text-slate-400'
                }
              >
                {visibleLines[i]}
                {i === currentLine && !done && (
                  <span className="cursor-blink text-terminal-cyan">▋</span>
                )}
              </span>
            ) : null}
          </div>
        ))}
        {done && (
          <span className="cursor-blink text-terminal-cyan">▋</span>
        )}
      </div>
    </div>
  )
}
