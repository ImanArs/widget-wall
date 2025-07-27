// import type { Widget } from '@/entities/widget/model/types'

// type Callback = (update: { id: number; value: number }) => void

// export class MockWebSocket {
//   private interval: number | undefined
//   private callback: Callback | null = null
//   private store: Map<number, Widget> = new Map()
//   private directions: Map<number, 1 | -1> = new Map()

//   constructor(initialData: Widget[]) {
//     initialData.forEach((item) => {
//       this.store.set(item.id, item)
//       this.directions.set(item.id, Math.random() < 0.5 ? 1 : -1)
//     })
//   }

//   onUpdate(cb: Callback) {
//     this.callback = cb

//     this.interval = window.setInterval(() => {
//       const updates: { id: number; value: number }[] = []

//       for (let i = 0; i < 100; i++) {
//         const id = Math.floor(Math.random() * this.store.size)
//         const old = this.store.get(id)
//         const dir = this.directions.get(id)

//         if (!old || !dir) continue

//         let nextValue = old.value + dir

//         if (nextValue >= 100) {
//           nextValue = 100
//           this.directions.set(id, -1)
//         } else if (nextValue <= -100) {
//           nextValue = -100
//           this.directions.set(id, 1)
//         }

//         this.store.set(id, { ...old, value: nextValue })
//         updates.push({ id, value: nextValue })
//       }

//       updates.forEach((u) => this.callback?.(u))
//     }, 10)
//   }

//   destroy() {
//     clearInterval(this.interval)
//   }
// }
