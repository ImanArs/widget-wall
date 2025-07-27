'use client'

import { useEffect, useRef, useState } from 'react'

export const FpsTracker = () => {
  const [fps, setFps] = useState(0)
  const frames = useRef(0)
  const lastTime = useRef(performance.now())

  useEffect(() => {
    let animId: number
    const loop = (now: number) => {
      frames.current++

      if (now - lastTime.current >= 1000) {
        setFps(frames.current)
        frames.current = 0
        lastTime.current = now
      }

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)

    return () => cancelAnimationFrame(animId)
  }, [])

  const color =
    fps > 50 ? 'text-green-500' : fps > 30 ? 'text-yellow-500' : 'text-red-500'

  return (
    <div className="fixed top-2 right-2 z-50 bg-black/80 text-white px-2 py-1 rounded text-sm font-mono">
      <span className={color}>FPS: {fps}</span>
    </div>
  )
}
