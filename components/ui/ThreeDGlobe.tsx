'use client'

import { useEffect, useRef } from 'react'

export function ThreeDGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = 400)
    let height = (canvas.height = 400)

    const handleResize = () => {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      width = canvas.width = rect.width * window.devicePixelRatio
      height = canvas.height = rect.height * window.devicePixelRatio
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    // 3D Point Definition
    interface Point3D {
      x: number
      y: number
      z: number
      origX: number
      origY: number
      origZ: number
    }

    const points: Point3D[] = []
    const numPoints = 65
    const radius = Math.min(width, height) * 0.16

    for (let i = 0; i < numPoints; i++) {
      const theta = Math.acos(Math.random() * 2 - 1)
      const phi = Math.random() * Math.PI * 2
      const x = radius * Math.sin(theta) * Math.cos(phi)
      const y = radius * Math.sin(theta) * Math.sin(phi)
      const z = radius * Math.cos(theta)
      points.push({ x, y, z, origX: x, origY: y, origZ: z })
    }

    let targetRotateX = 0.003
    let targetRotateY = 0.003
    let rotateX = 0.003
    let rotateY = 0.003

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      // Tilt the rotation speed/direction based on mouse position
      targetRotateY = x * 0.00008
      targetRotateX = y * 0.00008
    }

    const handleMouseLeave = () => {
      targetRotateX = 0.003
      targetRotateY = 0.003
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    const perspective = 300

    const animate = () => {
      // Smooth interpolation for mouse movements
      rotateX += (targetRotateX - rotateX) * 0.05
      rotateY += (targetRotateY - rotateY) * 0.05

      ctx.clearRect(0, 0, width, height)

      // Rotate points
      points.forEach((p) => {
        // Rotate Y
        const cosY = Math.cos(rotateY)
        const sinY = Math.sin(rotateY)
        const x1 = p.x * cosY - p.z * sinY
        const z1 = p.x * sinY + p.z * cosY

        // Rotate X
        const cosX = Math.cos(rotateX)
        const sinX = Math.sin(rotateX)
        const y2 = p.y * cosX - z1 * sinX
        const z2 = p.y * sinX + z1 * cosX

        p.x = x1
        p.y = y2
        p.z = z2
      })

      const centerX = width / 2
      const centerY = height / 2

      // Draw connections/lines
      ctx.lineWidth = 0.7 * window.devicePixelRatio
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const p1 = points[i]
          const p2 = points[j]

          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dz = p1.z - p2.z
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

          // If close enough in 3D space, connect with a line
          if (dist < radius * 0.8) {
            const scale1 = perspective / (perspective + p1.z)
            const scale2 = perspective / (perspective + p2.z)

            const x1 = p1.x * scale1 + centerX
            const y1 = p1.y * scale1 + centerY
            const x2 = p2.x * scale2 + centerX
            const y2 = p2.y * scale2 + centerY

            // Fade lines based on depth and distance
            const alpha =
              (1 - dist / (radius * 0.8)) *
              0.15 *
              ((p1.z + p2.z + 2 * radius) / (4 * radius))
            ctx.strokeStyle = `rgba(0, 255, 136, ${alpha})`
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.stroke()
          }
        }
      }

      // Draw points/particles
      points.forEach((p) => {
        const scale = perspective / (perspective + p.z)
        const x = p.x * scale + centerX
        const y = p.y * scale + centerY
        const r = Math.max(1, 2.5 * scale * window.devicePixelRatio)

        // Fade colors based on depth (z coordinate)
        const zDepth = (p.z + radius) / (2 * radius) // 0 to 1
        const alpha = 0.3 + 0.7 * zDepth

        ctx.fillStyle = `rgba(0, 240, 255, ${alpha})`
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()

        // Draw small glowing core for closer particles
        if (p.z > 0) {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.7})`
          ctx.beginPath()
          ctx.arc(x, y, r * 0.4, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove)
        canvas.removeEventListener('mouseleave', handleMouseLeave)
      }
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[340px] flex items-center justify-center">
      {/* Glow background */}
      <div className="absolute inset-4 bg-terminal-green/5 rounded-full filter blur-2xl animate-pulse pointer-events-none" />
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      />
    </div>
  )
}
