'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react'

// Single Cozy Coffee Shop Track config
const TRACK = {
  title: 'Cozy Coffee Shop Jazz',
  artist: 'Smooth Piano Jazz',
  mood: '☕ Cozy Lounge',
  bpm: 54,
  key: 'Ab Maj',
  gradient: ['#00ff88', '#004d26']
}

export function MusicLounge() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.6)
  const [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [visData, setVisData] = useState<number[]>(new Array(16).fill(0))

  // Refs for Web Audio API & Audio Element
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const ctxRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const animationRef = useRef<number>(0)

  // Initialize audio and connect it to analyser
  const initAudio = useCallback(() => {
    if (ctxRef.current) return

    // Create Audio Element
    const audio = new Audio('/cozy-jazz.mp3')
    audio.loop = true
    audio.crossOrigin = 'anonymous'
    audioRef.current = audio

    // Web Audio Setup
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new AudioContextClass()
    const master = ctx.createGain()
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 64

    // Connect Source -> Analyser -> Master -> Destination
    const source = ctx.createMediaElementSource(audio)
    source.connect(analyser)
    analyser.connect(master)
    master.connect(ctx.destination)

    ctxRef.current = ctx
    masterRef.current = master
    analyserRef.current = analyser
    sourceRef.current = source

    // Sync initial volume
    master.gain.setValueAtTime(muted ? 0 : volume, ctx.currentTime)
  }, [volume, muted])

  // Play/Pause Action
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
    }
  }, [isPlaying, initAudio])

  // Sync volume state to gain node
  useEffect(() => {
    if (masterRef.current && ctxRef.current) {
      masterRef.current.gain.setValueAtTime(muted ? 0 : volume, ctxRef.current.currentTime)
    }
  }, [volume, muted])

  // Sync progress bar and visualizer loop
  useEffect(() => {
    let active = true

    const updateLoop = () => {
      if (!active) return

      // Update progress bar
      const audio = audioRef.current
      if (audio && audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }

      // Update Visualizer
      if (isPlaying && analyserRef.current) {
        const dataArr = new Uint8Array(analyserRef.current.frequencyBinCount)
        analyserRef.current.getByteFrequencyData(dataArr)
        
        const stepSize = Math.floor(dataArr.length / 16)
        const newVis = []

        for (let i = 0; i < 16; i++) {
          let sum = 0
          for (let j = 0; j < stepSize; j++) {
            sum += dataArr[i * stepSize + j] || 0
          }
          const avg = sum / stepSize
          newVis.push(avg)
        }
        setVisData(newVis)

      } else {
        // Idle animation
        const time = Date.now() / 200
        setVisData(new Array(16).fill(0).map((_, i) => Math.abs(Math.sin(time + i * 0.4)) * 12))
      }

      animationRef.current = requestAnimationFrame(updateLoop)
    }

    updateLoop()
    return () => {
      active = false
      cancelAnimationFrame(animationRef.current)
    }
  }, [isPlaying])

  // Clean up audio on unmount
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
    <section id="music-lounge" className="py-24 bg-bg-secondary/40 border-y border-border-subtle relative overflow-hidden">
      {/* Dynamic glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-terminal-green/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="font-mono text-terminal-green text-sm mb-2 tracking-widest uppercase block">Interactive Lounge</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 flex items-center justify-center gap-3">
            <Music className="text-terminal-green w-7 h-7 sm:w-8 sm:h-8 animate-pulse" />
            3D Cozy Cafe Jazz Lounge
          </h2>
          <p className="text-slate-400 mt-2 max-w-xl mx-auto text-sm sm:text-base">
            Grab a coffee and enjoy smooth cozy piano jazz streaming straight from the 3D turntable record player.
          </p>
        </div>

        {/* Outer 3D Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: 3D Turntable / Record Player */}
          <div className="col-span-1 lg:col-span-7 flex flex-col items-center justify-center relative min-h-[380px]">
            
            {/* Perspective wrapper */}
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center perspective-1200">
              
              {/* 3D Turntable Base */}
              <motion.div
                animate={{ rotateX: 52, rotateZ: -28 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="w-[320px] sm:w-[380px] h-[320px] sm:h-[380px] rounded-[32px] p-6 relative shadow-2xl preserve-3d"
                style={{
                  background: 'linear-gradient(135deg, #182230 0%, #0d1622 100%)',
                  border: '3px solid rgba(0, 255, 136, 0.3)',
                  boxShadow: '0 50px 100px rgba(0,0,0,0.8), inset 0 2px 5px rgba(255,255,255,0.05)',
                }}
              >
                {/* Turntable Platter Rim */}
                <div className="absolute top-[12.5%] left-[12.5%] w-[75%] h-[75%] rounded-full border-[6px] border-slate-700/80 bg-slate-900 shadow-inner flex items-center justify-center preserve-3d">
                  
                  {/* Rotating Vinyl Record */}
                  <motion.div
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                    className="w-[92%] h-[92%] rounded-full relative cursor-pointer overflow-hidden flex items-center justify-center"
                    style={{
                      background: 'radial-gradient(circle, #2d3748 0%, #1a202c 10%, #0d1117 12%, #111 20%, #0a0a0a 100%)',
                      boxShadow: '0 12px 36px rgba(0,0,0,0.6), inset 0 0 10px rgba(0,0,0,0.8)',
                    }}
                    onClick={togglePlay}
                  >
                    {/* Vinyl grooves */}
                    <div className="absolute inset-[8%] rounded-full border border-white/5" />
                    <div className="absolute inset-[18%] rounded-full border border-white/5" />
                    <div className="absolute inset-[28%] rounded-full border border-white/5" />
                    <div className="absolute inset-[38%] rounded-full border border-white/5" />
                    <div className="absolute inset-[48%] rounded-full border border-white/5" />

                    {/* Central Album Label */}
                    <div
                      className="absolute w-[32%] h-[32%] rounded-full flex flex-col items-center justify-center text-center p-1"
                      style={{
                        background: `linear-gradient(135deg, ${c1}, ${c2})`,
                        boxShadow: 'inset 0 0 8px rgba(0,0,0,0.4)',
                      }}
                    >
                      <div className="w-3 h-3 rounded-full bg-slate-900 shadow-inner border border-white/20 mb-1" />
                      <span className="text-[7px] sm:text-[8px] font-bold text-slate-900 uppercase tracking-widest truncate max-w-full">
                        COZY CAFE
                      </span>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  animate={{
                    rotate: isPlaying ? -24 : 0,
                    z: isPlaying ? 8 : 0,
                  }}
                  transition={{ duration: 0.9, ease: 'easeInOut' }}
                  className="absolute right-[8%] top-[8%] w-[100px] sm:w-[120px] h-[30px] origin-top-right preserve-3d pointer-events-none"
                >
                  {/* Pivot base */}
                  <div className="absolute right-0 top-0 w-8 h-8 rounded-full bg-slate-700 border border-slate-600 shadow-md flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-slate-800 border border-slate-950 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-terminal-green" />
                    </div>
                  </div>
                  {/* Metal Arm Pole */}
                  <div
                    className="absolute right-3 top-3 w-[70px] sm:w-[85px] h-[3px] rounded-full"
                    style={{
                      background: 'linear-gradient(to left, #718096, #cbd5e0)',
                      transform: 'rotate(-25deg)',
                      transformOrigin: 'right center',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                    }}
                  />
                  {/* Stylus */}
                  <div
                    className="absolute left-[-2px] top-[40px] w-4 h-6 rounded bg-slate-800 border border-slate-700 shadow-lg flex items-center justify-center"
                    style={{
                      transform: 'rotate(-25deg)',
                    }}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isPlaying ? 'bg-terminal-green shadow-[0_0_8px_#00ff88]' : 'bg-slate-600'}`} />
                  </div>
                </motion.div>

                {/* Controls */}
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className={`w-10 h-10 rounded-full border transition-all duration-300 flex items-center justify-center shadow-lg ${
                      isPlaying
                        ? 'border-terminal-green bg-terminal-green/10 text-terminal-green shadow-[0_0_12px_rgba(0,255,136,0.3)]'
                        : 'border-slate-700 bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">
                    ST-300 DIRECT DRIVE
                  </span>
                </div>

                {/* Lights */}
                <div className="absolute top-6 left-6 flex gap-1.5">
                  <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${isPlaying ? 'bg-terminal-green shadow-[0_0_8px_#00ff88]' : 'bg-red-500/40'}`} />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Information Panel & 3D Frequency Visualizer */}
          <div className="col-span-1 lg:col-span-5 space-y-6 sm:space-y-8">
            
            {/* Song Panel */}
            <div className="p-6 rounded-2xl bg-bg-primary/80 border border-border-subtle shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-100">{TRACK.title}</h3>
                  <p className="text-slate-400 text-sm mt-0.5">{TRACK.artist}</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: `${c1}22`, border: `1px solid ${c1}44`, color: c1 }}>
                  {TRACK.mood}
                </span>
              </div>

              {/* Progress Slider */}
              <div className="space-y-1">
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden relative">
                  <div className="h-full bg-terminal-green" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>{TRACK.bpm} BPM</span>
                  <span>{TRACK.key}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center pt-2">
                <button
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-full bg-terminal-green flex items-center justify-center text-black font-semibold shadow-lg hover:shadow-terminal-green/20 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                </button>
              </div>

              {/* Volume Controller */}
              <div className="flex items-center gap-3 pt-2">
                <button onClick={() => setMuted(m => !m)} className="text-slate-500 hover:text-slate-300 transition-colors" aria-label={muted ? 'Unmute' : 'Mute'}>
                  {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <div className="flex-1 relative h-1.5">
                  <div className="absolute inset-0 rounded-full bg-slate-800" />
                  <div className="absolute inset-y-0 left-0 rounded-full bg-terminal-green" style={{ width: `${(muted ? 0 : volume) * 100}%` }} />
                  <input
                    type="range" min="0" max="1" step="0.01"
                    value={muted ? 0 : volume}
                    onChange={e => { setVolume(parseFloat(e.target.value)); setMuted(false) }}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
                    aria-label="Volume slider"
                  />
                </div>
              </div>
            </div>

            {/* 3D Equalizer Column Visualizer */}
            <div className="p-6 rounded-2xl bg-bg-primary/80 border border-border-subtle shadow-xl space-y-4">
              <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block">3D Frequency Spectrogram</span>
              
              <div className="flex items-end justify-between h-28 pt-4 overflow-hidden relative">
                {visData.map((val, idx) => {
                  const heightPercentage = Math.min(100, Math.max(8, (val / 200) * 100))
                  return (
                    <div
                      key={idx}
                      className="w-[4.5%] rounded-full relative transition-all duration-75 origin-bottom"
                      style={{
                        height: `${heightPercentage}%`,
                        background: `linear-gradient(to top, ${c2}44, ${c1})`,
                        boxShadow: `0 0 10px rgba(0, 255, 136, ${isPlaying ? (val / 255) * 0.5 : 0.15})`,
                      }}
                    />
                  )
                })}
              </div>

              <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 pt-2 border-t border-border-subtle/50">
                <span>20 Hz (BASS)</span>
                <span>MID</span>
                <span>20 kHz (TREBLE)</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
