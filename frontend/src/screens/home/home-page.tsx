import { useEffect, useRef, useState } from 'react'
import { WidgetGrid } from '@/widgets/widget-grid/widget-grid'
import type { Widget } from '@/entities/widget/model/types'

export const HomePage = () => {
  const [widgets, setWidgets] = useState<Widget[]>([])
  const widgetsMap = useRef<Map<number, Widget>>(new Map())
  const needsUpdate = useRef(false)

  useEffect(() => {
    fetch('http://localhost:3001/widgets')
      .then(res => res.json())
      .then((data: Widget[]) => {
        widgetsMap.current = new Map(data.map(w => [w.id, w]))
        setWidgets(data)
      })
  }, [])

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3001')

    socket.onmessage = (event) => {
      try {
        const { id, value }: { id: number; value: number } = JSON.parse(event.data)
        const item = widgetsMap.current.get(id)
        if (!item || item.value === value) return

        const updated = { ...item, value }
        widgetsMap.current.set(id, updated)
        needsUpdate.current = true
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        console.error('Invalid WS message', event.data)
      }
    }

    return () => socket.close()
  }, [])

  useEffect(() => {
    let rafId: number

    const loop = () => {
      if (needsUpdate.current) {
        needsUpdate.current = false
        setWidgets(Array.from(widgetsMap.current.values()))
      }
      rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return <WidgetGrid widgets={widgets} />
}
