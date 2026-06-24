'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play, Pause, Volume2, VolumeX, ChevronDown, Music2, Headphones, X
} from 'lucide-react'

const TRACK = {
  title: 'Cozy Coffee Shop Jazz',
  artist: 'Smooth Piano Jazz',
  mood: '☕ Cozy',
  bpm: 54,
  key: 'Ab Maj',
  gradient: ['#00ff88', '#004d26']
}

export function MusicPlayer() {
  const [isPlaying,    setIsPlaying]    = useState(false)
  const [isMinimized,  setIsMinimized]  = useState(false)
  const [volume,       setVolume]       = useState(0.55)
  const [muted,        setMuted]        = useState(false)
  const [progress,     setProgress]     = useState(0)
  const [showWelcome,  setShowWelcome]  = useState(true)
  const [beatPulse,    setBeatPulse]    = useState(false)

  // Audio refs
  const audioRef     = useRef<HTMLAudioElement | null>(null)
  const ctxRef       = useRef<AudioContext | null>(null)
  const masterRef    = useRef<GainNode   | null>(null)
  const analyserRef  = useRef<AnalyserNode | null>(null)
  const sourceRef    = useRef<MediaElementAudioSourceNode | null>(null)

  // Canvas
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const rafRef       = useRef<number>(0)

  // Initialize Audio
  const initAudio = useCallback(() => {
    if (ctxRef.current) return

    const audio = new Audio('/cozy-jazz.mp3')
    audio.loop = true
    audio.crossOrigin = 'anonymous'
    audioRef.current = audio

    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new AudioContextClass()
    const master  = ctx.createGain()
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 64

    const source = ctx.createMediaElementSource(audio)
    source.connect(analyser)
    analyser.connect(master)
    master.connect(ctx.destination)

    ctxRef.current    = ctx
    masterRef.current = master
    analyserRef.current = analyser
    sourceRef.current = source

    master.gain.setValueAtTime(muted ? 0 : volume, ctx.currentTime)
  }, [volume, muted])

  const togglePlay = useCallback(() => {
    initAudio()
    const audio = audioRef.current
    const ctx = ctxRef.current
    if (!audio || !ctx) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      if (ctx.state === 'suspended') {
        ctx.resume()
      }
      audio.play().catch(() => {})
      setIsPlaying(true)
      setShowWelcome(false)
    }
  }, [isPlaying, initAudio])

  // Sync volume state
  useEffect(() => {
    if (masterRef.current && ctxRef.current) {
      masterRef.current.gain.setValueAtTime(muted ? 0 : volume, ctxRef.current.currentTime)
    }
  }, [volume, muted])

  // Canvas Visualiser & Progress Loop
  useEffect(() => {
    const canvas   = canvasRef.current
    if (!canvas) return

    const ctx2d = canvas.getContext('2d')
    if (!ctx2d) return

    const dataArr = new Uint8Array(analyserRef.current ? analyserRef.current.frequencyBinCount : 32)
    const [c1, c2] = TRACK.gradient

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw)

      // Sync progress
      const audio = audioRef.current
      if (audio && audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }

      // Draw visualization
      if (analyserRef.current) {
        analyserRef.current.getByteFrequencyData(dataArr)
      }
      ctx2d.clearRect(0, 0, canvas.width, canvas.height)

      if (!isPlaying) {
        ctx2d.beginPath()
        ctx2d.strokeStyle = `${c1}55`
        ctx2d.lineWidth = 1.5
        const t = Date.now() / 1000
        for (let x = 0; x < canvas.width; x++) {
          const y = canvas.height / 2 + Math.sin((x / canvas.width) * Math.PI * 4 + t * 1.5) * 6
          if (x === 0) {
            ctx2d.moveTo(x, y)
          } else {
            ctx2d.lineTo(x, y)
          }
        }
        ctx2d.stroke()
        return
      }

      // Draw frequency bars
      const barW = (canvas.width / dataArr.length) * 2.2
      let x = 0
      let totalEnergy = 0

      for (let i = 0; i < dataArr.length; i++) {
        const val = dataArr[i]
        totalEnergy += val
        const h = (val / 255) * canvas.height * 0.9
        const ratio = i / dataArr.length
        const r1 = parseInt(c1.slice(1,3),16), g1 = parseInt(c1.slice(3,5),16), b1 = parseInt(c1.slice(5,7),16)
        const r2 = parseInt(c2.slice(1,3),16), g2 = parseInt(c2.slice(3,5),16), b2 = parseInt(c2.slice(5,7),16)
        const r = Math.round(r1 + (r2-r1)*ratio)
        const g = Math.round(g1 + (g2-g1)*ratio)
        const b = Math.round(b1 + (b2-b1)*ratio)
        ctx2d.fillStyle = `rgba(${r},${g},${b},0.85)`
        ctx2d.beginPath()
        ctx2d.roundRect(x, canvas.height - h, Math.max(barW - 1, 1), h, 2)
        ctx2d.fill()
        x += barW + 1
      }

      if (totalEnergy > 800) {
        setBeatPulse(p => !p)
      }
    }

    draw()
    return () => cancelAnimationFrame(rafRef.current)
  }, [isPlaying])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      if (ctxRef.current) {
        ctxRef.current.close()
        ctxRef.current = null
      }
    }
  }, [])

  const [c1, c2] = TRACK.gradient

  return (
    <>
      {/* Welcome Toast */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, x: 80, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 2.5 }}
            className="fixed bottom-40 right-4 sm:right-6 z-40 max-w-[270px] rounded-2xl p-4 shadow-2xl"
            style={{ background: 'rgba(22,27,34,0.96)', border: '1px solid rgba(0,255,136,0.25)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex items-start gap-3">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center animate-pulse"
                style={{ background: `linear-gradient(135deg, ${c1}33, ${c2}33)`, border: `1px solid ${c1}55` }}
              >
                <Headphones size={16} style={{ color: c1 }} />
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-100">Set the vibe ☕</p>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">Relaxing coffee shop piano jazz is ready.</p>
              </div>
              <button onClick={() => setShowWelcome(false)} className="text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0 mt-0.5" aria-label="Close welcome message">
                <X size={14} />
              </button>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { togglePlay(); setShowWelcome(false) }}
              className="mt-3 w-full py-2 rounded-xl text-xs font-semibold text-black transition-all bg-terminal-green hover:bg-opacity-90"
              style={{ background: `linear-gradient(90deg, ${c1}, ${c2})` }}
            >
              Play Cozy Jazz
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Player */}
      <motion.div
        initial={{ opacity: 0, y: 120 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 28, delay: 2 }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 max-w-[calc(100vw-32px)]"
      >
        <AnimatePresence mode="wait" initial={false}>

          {/* Mini pill */}
          {isMinimized ? (
            <motion.button
              key="mini"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              onClick={() => setIsMinimized(false)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full shadow-2xl transition-all"
              style={{
                background: 'rgba(22,27,34,0.97)',
                border: `1px solid ${c1}44`,
                backdropFilter: 'blur(20px)',
                boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 12px ${c1}22`,
              }}
              aria-label="Expand music player"
            >
              <div className="relative w-7 h-7 flex-shrink-0">
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ duration: 8, ease: 'linear', repeat: Infinity }}
                  className="w-full h-full rounded-full"
                  style={{ background: `conic-gradient(${c1}, ${c2}, ${c1})` }}
                />
                <div className="absolute inset-[3px] rounded-full flex items-center justify-center"
                     style={{ background: '#161b22' }}>
                  <Music2 size={11} style={{ color: c1 }} />
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-200 max-w-[110px] truncate">{TRACK.title}</span>
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-terminal-green" style={{ background: isPlaying ? c1 : '#4b5563' }} />
            </motion.button>

          ) : (
            /* Full player */
            <motion.div
              key="full"
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1,    opacity: 1, y: 0 }}
              exit={{ scale: 0.92,    opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              className="w-[280px] sm:w-[300px] rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(13,17,23,0.97)',
                border: '1px solid rgba(0, 255, 136, 0.25)',
                backdropFilter: 'blur(24px)',
                boxShadow: `0 24px 60px rgba(0,0,0,0.7), 0 0 40px ${c1}15`,
              }}
            >
              {/* Header */}
              <div className="relative h-32 overflow-hidden" style={{ background: `linear-gradient(135deg, ${c1}12, ${c2}22)` }}>
                <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 25% 60%, ${c1}18 0%, transparent 55%), radial-gradient(circle at 75% 25%, ${c2}18 0%, transparent 55%)` }} />

                {/* Rotating Vinyl */}
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ duration: 10, ease: 'linear', repeat: Infinity, repeatType: 'loop' }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-[84px] h-[84px]"
                  style={{
                    background: `conic-gradient(from 0deg, #111827, #1f2937, #111827, ${c1}44, #111827, #1f2937, #111827, ${c2}44, #111827)`,
                    borderRadius: '50%',
                    boxShadow: `0 0 20px ${c1}33, inset 0 0 10px rgba(0,0,0,0.5)`,
                  }}
                >
                  <div className="absolute inset-[8px] rounded-full border border-white/5" />
                  <div className="absolute inset-[16px] rounded-full border border-white/5" />
                  <div className="absolute inset-[24px] rounded-full border border-white/5" />
                  <div
                    className="absolute inset-[30%] rounded-full flex items-center justify-center"
                    style={{ background: `radial-gradient(circle, ${c1}, ${c2})` }}
                  >
                    <Music2 size={10} className="text-black" />
                  </div>
                </motion.div>

                {/* Pulse */}
                <AnimatePresence>
                  {isPlaying && (
                    <motion.div
                      key={String(beatPulse)}
                      initial={{ scale: 0.6, opacity: 0.6 }}
                      animate={{ scale: 1.8, opacity: 0 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="absolute right-[48px] top-1/2 -translate-y-1/2 w-[84px] h-[84px] rounded-full pointer-events-none"
                      style={{ border: `1px solid ${c1}44` }}
                    />
                  )}
                </AnimatePresence>

                {/* Top Badge */}
                <div className="absolute top-3 left-4 right-4 flex items-center justify-between">
                  <span className="text-[10px] px-2.5 py-1 rounded-full font-medium" style={{ background: `${c1}22`, border: `1px solid ${c1}44`, color: c1 }}>
                    {TRACK.mood}
                  </span>
                  <button onClick={() => setIsMinimized(true)} className="text-slate-400 hover:text-white transition-colors p-1" aria-label="Minimize music player">
                    <ChevronDown size={15} />
                  </button>
                </div>

                {/* Track info */}
                <div className="absolute bottom-3 left-4">
                  <p className="text-white font-semibold text-sm leading-tight">{TRACK.title}</p>
                  <p className="text-terminal-green text-[11px] mt-0.5 opacity-80">{TRACK.artist}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded text-slate-400" style={{ background: 'rgba(48,54,61,0.5)', border: '1px solid rgba(48,54,61,0.8)' }}>
                    {TRACK.bpm} BPM
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded text-slate-400" style={{ background: 'rgba(48,54,61,0.5)', border: '1px solid rgba(48,54,61,0.8)' }}>
                    {TRACK.key}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded text-slate-400 ml-auto" style={{ background: 'rgba(48,54,61,0.5)', border: '1px solid rgba(48,54,61,0.8)' }}>
                    MP3 Stream
                  </span>
                </div>

                {/* Visualizer */}
                <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(0, 255, 136, 0.15)' }}>
                  <canvas ref={canvasRef} width={268} height={46} className="w-full block" />
                </div>

                {/* Progress */}
                <div>
                  <div className="w-full h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(48,54,61,0.8)' }}>
                    <motion.div
                      className="h-full rounded-full bg-terminal-green"
                      style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${c1}, ${c2})` }}
                    />
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center pt-1">
                  <motion.button
                    whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.93 }}
                    onClick={togglePlay}
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all bg-terminal-green"
                    style={{
                      background: `linear-gradient(135deg, ${c1}, ${c2})`,
                      boxShadow: `0 0 20px ${c1}44, 0 4px 12px rgba(0,0,0,0.4)`,
                    }}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying
                      ? <Pause size={20} className="text-black" />
                      : <Play  size={20} className="text-black ml-0.5" />}
                  </motion.button>
                </div>

                {/* Volume */}
                <div className="flex items-center gap-3 pt-0.5">
                  <button
                    onClick={() => setMuted(m => !m)}
                    className="text-slate-500 hover:text-terminal-green transition-colors flex-shrink-0"
                    aria-label={muted ? 'Unmute' : 'Mute'}
                  >
                    {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  </button>

                  <div className="flex-1 relative h-1.5">
                    <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(48,54,61,0.8)' }} />
                    <div
                      className="absolute inset-y-0 left-0 rounded-full transition-all duration-100 bg-terminal-green"
                      style={{ width: `${(muted ? 0 : volume) * 100}%`, background: `linear-gradient(90deg, ${c1}, ${c2})` }}
                    />
                    <input
                      type="range" min="0" max="1" step="0.01"
                      value={muted ? 0 : volume}
                      onChange={e => { setVolume(parseFloat(e.target.value)); setMuted(false) }}
                      className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
                      aria-label="Volume"
                    />
                  </div>

                  <Music2 size={14} className="text-slate-500 flex-shrink-0" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
