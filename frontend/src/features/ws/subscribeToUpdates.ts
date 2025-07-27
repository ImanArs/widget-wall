// import { useEffect } from 'react'
// import type { Widget } from '@/entities/widget/model/types'
// import { MockWebSocket } from '@/shared/lib/ws/mockWebSocket'

// export const useWebSocketUpdates = (
//   widgets: Widget[],
//   onUpdate: (update: { id: number; value: number }) => void
// ) => {
//   useEffect(() => {
//     const socket = new MockWebSocket(widgets)
//     socket.onUpdate(onUpdate)

//     return () => {
//       socket.destroy()
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [widgets])
// }
