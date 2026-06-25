// Global Audio Manager for Cozy Coffee Shop Jazz
export type AudioListener = (state: {
  isPlaying: boolean
  volume: number
  muted: boolean
  progress: number
  visData: number[]
}) => void

class AudioManager {
  private audio: HTMLAudioElement | null = null
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private analyser: AnalyserNode | null = null
  private listeners: Set<AudioListener> = new Set()
  
  public isPlaying = false
  public volume = 0.6
  public muted = false
  public progress = 0
  public visData: number[] = new Array(16).fill(0)
  
  private animationFrameId: number | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      // Lazy init on first interaction
    }
  }

  private init() {
    if (this.audio) return

    this.audio = new Audio('/cozy-jazz.mp3')
    this.audio.loop = true
    this.audio.crossOrigin = 'anonymous'

    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    this.ctx = new AudioContextClass()
    this.master = this.ctx.createGain()
    this.analyser = this.ctx.createAnalyser()
    this.analyser.fftSize = 64

    const source = this.ctx.createMediaElementSource(this.audio)
    source.connect(this.analyser)
    this.analyser.connect(this.master)
    this.master.connect(this.ctx.destination)

    this.master.gain.setValueAtTime(this.muted ? 0 : this.volume, this.ctx.currentTime)
    this.startUpdateLoop()
  }

  public subscribe(listener: AudioListener) {
    this.listeners.add(listener)
    this.notify()
    return () => {
      this.listeners.delete(listener)
    }
  }

  private notify() {
    const state = {
      isPlaying: this.isPlaying,
      volume: this.volume,
      muted: this.muted,
      progress: this.progress,
      visData: this.visData
    }
    this.listeners.forEach(l => l(state))
  }

  public togglePlay() {
    this.init()
    if (!this.audio || !this.ctx) return

    if (this.isPlaying) {
      this.audio.pause()
      this.isPlaying = false
    } else {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume()
      }
      this.audio.play().catch(() => {})
      this.isPlaying = true
    }
    this.notify()
  }

  public setVolume(val: number) {
    this.volume = val
    this.init()
    if (this.master && this.ctx) {
      this.master.gain.setValueAtTime(this.muted ? 0 : this.volume, this.ctx.currentTime)
    }
    this.notify()
  }

  public toggleMute() {
    this.muted = !this.muted
    this.init()
    if (this.master && this.ctx) {
      this.master.gain.setValueAtTime(this.muted ? 0 : this.volume, this.ctx.currentTime)
    }
    this.notify()
  }

  private startUpdateLoop() {
    const update = () => {
      if (this.audio && this.audio.duration) {
        this.progress = (this.audio.currentTime / this.audio.duration) * 100
      }

      if (this.isPlaying && this.analyser) {
        const dataArr = new Uint8Array(this.analyser.frequencyBinCount)
        this.analyser.getByteFrequencyData(dataArr)
        const stepSize = Math.floor(dataArr.length / 16)
        const newVis = []
        for (let i = 0; i < 16; i++) {
          let sum = 0
          for (let j = 0; j < stepSize; j++) {
            sum += dataArr[i * stepSize + j] || 0
          }
          newVis.push(sum / stepSize)
        }
        this.visData = newVis
      } else {
        const time = Date.now() / 200
        this.visData = new Array(16).fill(0).map((_, i) => Math.abs(Math.sin(time + i * 0.4)) * 12)
      }

      this.notify()
      this.animationFrameId = requestAnimationFrame(update)
    }
    update()
  }
}

export const globalAudio = new AudioManager()
