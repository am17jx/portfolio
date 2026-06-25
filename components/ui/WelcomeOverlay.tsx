'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, ArrowRight, Hand } from 'lucide-react'
import { globalAudio } from '@/lib/audioManager'

export function WelcomeOverlay() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [coffeeReady, setCoffeeReady] = useState(false)
  const [pourComplete, setPourComplete] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const dismissed = sessionStorage.getItem('welcome-overlay-dismissed')
    if (!dismissed) setIsVisible(true)
  }, [])

  // When user taps → start pour
  const handleInteract = useCallback(() => {
    if (hasInteracted) return
    setHasInteracted(true)

    // Start pour animation
    setTimeout(() => setCoffeeReady(true), 200)
    // Pour finishes
    setTimeout(() => {
      setPourComplete(true)
    }, 2800)
    // Show buttons
    setTimeout(() => setShowButtons(true), 3200)
  }, [hasInteracted])

  // Particles
  useEffect(() => {
    if (!isVisible || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
    }
    resize()
    window.addEventListener('resize', resize)
    interface P { x: number; y: number; vx: number; vy: number; s: number; o: number; l: number; ml: number }
    const ps: P[] = []
    for (let i = 0; i < 45; i++) {
      ps.push({
        x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.15, vy: -Math.random() * 0.3 - 0.05,
        s: Math.random() * 2 + 0.5, o: Math.random() * 0.25 + 0.05,
        l: Math.random() * 350, ml: 350 + Math.random() * 350,
      })
    }
    let aid: number
    const anim = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      for (const p of ps) {
        p.x += p.vx; p.y += p.vy; p.l++
        if (p.l > p.ml) { p.x = Math.random() * window.innerWidth; p.y = window.innerHeight + 10; p.l = 0 }
        const a = p.o * Math.sin((p.l / p.ml) * Math.PI)
        ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,255,136,${a})`; ctx.fill()
      }
      aid = requestAnimationFrame(anim)
    }
    anim()
    return () => { cancelAnimationFrame(aid); window.removeEventListener('resize', resize) }
  }, [isVisible])

  const handleChoice = (playMusic: boolean) => {
    if (playMusic) globalAudio.togglePlay()
    sessionStorage.setItem('welcome-overlay-dismissed', 'true')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none overflow-hidden"
          style={{ background: 'radial-gradient(ellipse at 50% 40%, #0f1a14 0%, #0a0e14 40%, #060a10 100%)' }}
          onClick={!hasInteracted ? handleInteract : undefined}
        >
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.4 }} />

          {/* Ambient glows */}
          <div className="absolute pointer-events-none" style={{
            width: '700px', height: '700px',
            background: 'radial-gradient(circle, rgba(0,255,136,0.05) 0%, transparent 60%)',
            top: '45%', left: '50%', transform: 'translate(-50%, -55%)',
          }} />

          {/* ===== 3D COFFEE CUP ===== */}
          <motion.div
            initial={{ scale: 0.5, y: 60, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 18, delay: 0.3 }}
            className="relative z-10" style={{ marginBottom: '16px' }}
          >
            <motion.div
              animate={coffeeReady ? { y: [0, -4, 0] } : {}}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="relative flex flex-col items-center"
            >
              {/* ---- STEAM ---- */}
              <AnimatePresence>
                {pourComplete && (
                  <div className="absolute pointer-events-none z-30" style={{ top: '32px', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '50px' }}>
                    {[0, 1, 2, 3, 4].map(i => (
                      <motion.div key={i}
                        initial={{ opacity: 0 }}
                        animate={{
                          y: [0, -25, -55, -80],
                          x: [0, (i % 2 === 0 ? 6 : -6), (i % 2 === 0 ? -3 : 3), 0],
                          opacity: [0, 0.35, 0.15, 0],
                          scaleX: [0.6, 1.3, 1.8, 0.3],
                        }}
                        transition={{ repeat: Infinity, duration: 3 + i * 0.4, delay: i * 0.6, ease: 'easeOut' }}
                        style={{
                          position: 'absolute', left: `${10 + i * 14}px`, bottom: 0,
                          width: '3.5px', height: '20px', borderRadius: '999px',
                          background: 'linear-gradient(to top, rgba(255,255,255,0.18), rgba(255,255,255,0.04), transparent)',
                          filter: 'blur(3px)',
                        }}
                      />
                    ))}
                  </div>
                )}
              </AnimatePresence>

              {/* ---- POUR STREAM ---- */}
              <AnimatePresence>
                {coffeeReady && !pourComplete && (
                  <motion.div
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    exit={{ opacity: 0, scaleY: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{
                      position: 'absolute', top: '-140px', left: '50%', marginLeft: '-4px',
                      transformOrigin: 'top center', width: '8px', height: '225px', zIndex: 25,
                      background: 'linear-gradient(180deg, transparent 0%, rgba(101,67,33,0.3) 10%, rgba(80,50,20,0.7) 40%, rgba(60,35,12,0.9) 100%)',
                      borderRadius: '4px', filter: 'blur(0.8px)',
                    }}
                  >
                    {/* Drip drops */}
                    {[0, 1, 2].map(i => (
                      <motion.div key={i}
                        animate={{ y: [0, 220], opacity: [0.8, 0], scale: [1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 0.4 + i * 0.1, delay: i * 0.12, ease: 'easeIn' }}
                        style={{
                          position: 'absolute', bottom: 0, left: '50%', marginLeft: `${(i - 1) * 5}px`,
                          width: '5px', height: '8px', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                          background: 'rgba(101,67,33,0.8)',
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ================ SVG CUP ================ */}
              <div style={{ position: 'relative', width: '240px', height: '260px' }}>
                <svg viewBox="0 0 240 260" width="240" height="260" style={{ position: 'absolute', top: 0, left: 0 }}>
                  <defs>
                    {/* Glass body reflections */}
                    <linearGradient id="glassGradient" x1="0" y1="0" x2="1" y2="0.6">
                      <stop offset="0%" stopColor="rgba(255, 255, 255, 0.16)" />
                      <stop offset="25%" stopColor="rgba(255, 255, 255, 0.04)" />
                      <stop offset="50%" stopColor="rgba(255, 255, 255, 0.01)" />
                      <stop offset="75%" stopColor="rgba(255, 255, 255, 0.04)" />
                      <stop offset="100%" stopColor="rgba(255, 255, 255, 0.12)" />
                    </linearGradient>

                    {/* Glass green tint glow */}
                    <linearGradient id="glassGreenGlow" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="rgba(0, 255, 136, 0.08)" />
                      <stop offset="50%" stopColor="transparent" />
                      <stop offset="100%" stopColor="rgba(0, 255, 136, 0.05)" />
                    </linearGradient>

                    {/* Coffee body gradient */}
                    <linearGradient id="coffeeBody" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2c1608" />
                      <stop offset="100%" stopColor="#140a04" />
                    </linearGradient>

                    {/* Coffee surface */}
                    <radialGradient id="coffeeTop" cx="0.45" cy="0.45" r="0.55">
                      <stop offset="0%" stopColor="#5c361c" />
                      <stop offset="35%" stopColor="#3c2010" />
                      <stop offset="75%" stopColor="#221107" />
                      <stop offset="100%" stopColor="#140a04" />
                    </radialGradient>

                    {/* Crema ring */}
                    <radialGradient id="cremaRing" cx="0.5" cy="0.5" r="0.5">
                      <stop offset="65%" stopColor="transparent" />
                      <stop offset="82%" stopColor="rgba(195,145,85,0.22)" />
                      <stop offset="90%" stopColor="rgba(160,110,50,0.14)" />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>

                    {/* Saucer */}
                    <linearGradient id="saucerCol" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(40, 50, 45, 0.4)" />
                      <stop offset="100%" stopColor="rgba(15, 20, 18, 0.7)" />
                    </linearGradient>

                    {/* Soft shadow filter */}
                    <filter id="shadow1" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#000000" floodOpacity="0.75" />
                    </filter>
                    <filter id="shadow2" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000000" floodOpacity="0.55" />
                    </filter>

                    {/* Green rim glow */}
                    <filter id="rimGlow">
                      <feGaussianBlur stdDeviation="2" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    {/* Coffee interior clip path */}
                    <clipPath id="innerCup">
                      <path d="M 65,65 C 69,115 76,160 85,190 Q 120,200 155,190 C 164,160 171,115 175,65 Z" />
                    </clipPath>
                  </defs>

                  {/* ==== SAUCER ==== */}
                  <ellipse cx="120" cy="218" rx="100" ry="16" fill="rgba(0,0,0,0.65)" filter="url(#shadow1)" />
                  <ellipse cx="120" cy="213" rx="96" ry="14" fill="url(#saucerCol)" stroke="rgba(0,255,136,0.15)" strokeWidth="1.2" />
                  <ellipse cx="120" cy="213" rx="60" ry="9" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                  {/* ==== GLASS HANDLE ==== */}
                  <path
                    d="M 160,90 C 208,85 230,115 224,152 C 218,182 188,188 145,178"
                    fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="20" strokeLinecap="round"
                  />
                  <path
                    d="M 160,90 C 208,85 230,115 224,152 C 218,182 188,188 145,178"
                    fill="none" stroke="rgba(0,255,136,0.1)" strokeWidth="16" strokeLinecap="round"
                  />
                  <path
                    d="M 168,96 C 200,93 214,115 212,140"
                    fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" strokeLinecap="round"
                  />

                  {/* ==== GLASS BACK CAVITY ==== */}
                  <path
                    d="M 60,65 C 64,115 72,165 82,195 Q 120,205 158,195 C 168,165 176,115 180,65 Z"
                    fill="rgba(255,255,255,0.02)"
                  />
                  {/* Back rim line */}
                  <path
                    d="M 60,65 A 60,15 0 0,1 180,65"
                    fill="none"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="1.2"
                  />

                  {/* ==== COFFEE FILL (Inside the cup, behind front wall) ==== */}
                  <g clipPath="url(#innerCup)">
                    {/* Coffee body fill */}
                    <motion.rect
                      initial={{ y: 195, height: 0 }}
                      animate={coffeeReady ? { y: 70, height: 130 } : { y: 195, height: 0 }}
                      transition={{ duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
                      x="60"
                      width="120"
                      fill="url(#coffeeBody)"
                    />

                    {/* Coffee surface */}
                    <motion.ellipse
                      initial={{ cy: 195, rx: 37, ry: 8 }}
                      animate={coffeeReady ? { cy: 82, rx: 52.5, ry: 11.5 } : { cy: 195, rx: 37, ry: 8 }}
                      transition={{ duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
                      cx="120"
                      fill="url(#coffeeTop)"
                    />

                    {/* Crema ring */}
                    <motion.ellipse
                      initial={{ cy: 195, rx: 35, ry: 7, opacity: 0 }}
                      animate={coffeeReady ? { cy: 82, rx: 50, ry: 10, opacity: 1 } : { cy: 195, rx: 35, ry: 7, opacity: 0 }}
                      transition={{ duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
                      cx="120"
                      fill="url(#cremaRing)"
                    />

                    {/* Center crema dot */}
                    <motion.circle
                      initial={{ cy: 195, r: 2, opacity: 0 }}
                      animate={coffeeReady ? { cy: 82, r: 7, opacity: 1 } : { cy: 195, r: 2, opacity: 0 }}
                      transition={{ duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
                      cx="120"
                      fill="rgba(195,145,85,0.16)"
                    />
                  </g>

                  {/* ==== GLASS FRONT WALL ==== */}
                  <path
                    d="M 60,65 C 64,115 72,165 82,195 Q 120,205 158,195 C 168,165 176,115 180,65 Z"
                    fill="url(#glassGradient)"
                    stroke="rgba(255,255,255,0.22)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 60,65 C 64,115 72,165 82,195 Q 120,205 158,195 C 168,165 176,115 180,65 Z"
                    fill="url(#glassGreenGlow)"
                  />

                  {/* reflections */}
                  <path
                    d="M 63,68 C 67,113 74,158 83,188"
                    fill="none"
                    stroke="rgba(255,255,255,0.28)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 177,68 C 173,113 166,158 157,188"
                    fill="none"
                    stroke="rgba(255,255,255,0.14)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 105,75 Q 108,130 112,185"
                    fill="none"
                    stroke="rgba(255,255,255,0.04)"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />

                  {/* ==== GLASS FRONT RIM ==== */}
                  <ellipse cx="120" cy="65" rx="60" ry="15" fill="none" stroke="rgba(255,255,255,0.32)" strokeWidth="1.8" />
                  <ellipse cx="120" cy="65" rx="60" ry="15" fill="none" stroke="rgba(0,255,136,0.28)" strokeWidth="1" filter="url(#rimGlow)" />
                </svg>

                {/* Slow crema swirl */}
                {pourComplete && (
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
                    style={{
                      position: 'absolute', top: '73px', left: '50%', marginLeft: '-38px',
                      width: '76px', height: '18px', zIndex: 3, borderRadius: '50%',
                      background: 'conic-gradient(from 0deg, transparent, rgba(195,145,85,0.1), transparent, rgba(160,110,50,0.08), transparent)',
                    }}
                  />
                )}
              </div>

              {/* Ground glow */}
              <motion.div
                initial={{ scaleX: 0.5, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                style={{
                  width: '200px', height: '20px', marginTop: '-4px',
                  background: 'radial-gradient(ellipse, rgba(0,255,136,0.06) 0%, transparent 75%)',
                  filter: 'blur(8px)', borderRadius: '50%',
                }}
              />
            </motion.div>
          </motion.div>

          {/* ===== TEXT & BUTTONS ===== */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="relative z-10 text-center px-6"
          >
            {/* Before interaction: tap prompt */}
            <AnimatePresence mode="wait">
              {!hasInteracted ? (
                <motion.div
                  key="tap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center"
                >
                  <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{
                    background: 'linear-gradient(135deg, #00ff88, #66ffbb, #00ff88)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 20px rgba(0,255,136,0.15))',
                  }}>
                    Welcome
                  </h2>
                  <p className="text-slate-400 text-sm max-w-[260px] mx-auto mb-6">
                    A fresh cup is waiting for you.
                  </p>
                  <motion.div
                    animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="flex items-center gap-2 text-terminal-green/70 text-xs font-mono tracking-widest uppercase cursor-pointer"
                  >
                    <Hand size={14} />
                    Tap to pour
                  </motion.div>
                </motion.div>
              ) : !showButtons ? (
                <motion.div
                  key="pouring"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-mono text-terminal-green/50 tracking-widest"
                >
                  Brewing...
                </motion.div>
              ) : (
                <motion.div
                  key="buttons"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{
                    background: 'linear-gradient(135deg, #00ff88, #66ffbb)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  }}>
                    Enjoy ☕
                  </h2>
                  <p className="text-slate-400 text-sm max-w-[260px] mx-auto mb-6">
                    Would you like smooth jazz<br/>while you browse?
                  </p>

                  <div className="flex flex-col gap-3 w-full max-w-[260px]">
                    <motion.button
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleChoice(true)}
                      className="w-full py-3.5 rounded-2xl font-bold text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all"
                      style={{
                        background: 'linear-gradient(135deg, #00ff88 0%, #00dd70 50%, #00bb5a 100%)',
                        color: '#0a1610',
                        boxShadow: '0 0 25px rgba(0,255,136,0.2), 0 6px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                      }}
                    >
                      <Music size={16} />
                      Play Cozy Jazz
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleChoice(false)}
                      className="w-full py-3 rounded-2xl font-semibold text-sm text-slate-400 hover:text-slate-200 transition-all flex items-center justify-center gap-2"
                      style={{
                        background: 'rgba(20,20,20,0.5)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      Just Browse
                      <ArrowRight size={14} />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-5 text-[9px] font-mono text-slate-700 z-10 tracking-widest uppercase"
          >
            ☕ brewed with love
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
