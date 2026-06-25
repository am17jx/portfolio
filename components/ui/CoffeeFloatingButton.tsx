'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coffee, Volume2, VolumeX } from 'lucide-react'
import { globalAudio } from '@/lib/audioManager'

export function CoffeeFloatingButton() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const unsubscribe = globalAudio.subscribe((state) => {
      setIsPlaying(state.isPlaying)
      setMuted(state.muted)
    })
    return unsubscribe
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Mini control panel showing when hovering */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-secondary/95 backdrop-blur-md shadow-2xl flex items-center gap-3"
            style={{ border: '1px solid rgba(0, 255, 136, 0.2)' }}
          >
            <span className="text-xs font-mono text-slate-300">
              {isPlaying ? 'Now Playing: Jazz' : 'Play Cozy Jazz'}
            </span>
            {isPlaying && (
              <button
                onClick={() => globalAudio.toggleMute()}
                className="text-slate-400 hover:text-terminal-green transition-colors"
                aria-label={muted ? 'Unmute' : 'Mute'}
              >
                {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Coffee Cup Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => globalAudio.togglePlay()}
        className="w-14 h-14 rounded-full flex items-center justify-center relative shadow-2xl transition-all"
        style={{
          background: 'rgba(22,27,34,0.92)',
          border: '2px solid rgba(0, 255, 136, 0.4)',
          boxShadow: isPlaying 
            ? '0 8px 32px rgba(0,0,0,0.5), 0 0 16px rgba(0, 255, 136, 0.25)' 
            : '0 8px 32px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(12px)',
        }}
        aria-label="Toggle background jazz music"
      >
        {/* Steam Animation when playing */}
        {isPlaying && !muted && (
          <div className="absolute -top-3 flex justify-center gap-1 w-6 h-4 pointer-events-none">
            <span className="w-[1.5px] h-3 bg-terminal-green rounded-full opacity-60 animate-steam" style={{ animationDelay: '0.1s' }} />
            <span className="w-[1.5px] h-3.5 bg-terminal-green rounded-full opacity-65 animate-steam" style={{ animationDelay: '0.4s' }} />
            <span className="w-[1.5px] h-3 bg-terminal-green rounded-full opacity-60 animate-steam" style={{ animationDelay: '0.7s' }} />
          </div>
        )}

        <Coffee 
          size={24} 
          className={`transition-colors duration-300 ${isPlaying ? 'text-terminal-green' : 'text-slate-400'}`} 
        />
      </motion.button>
    </div>
  )
}
