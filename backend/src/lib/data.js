const TOTAL = 10000

const widgets = Array.from({ length: TOTAL }, (_, i) => ({
  id: i,
  name: `Item ${i}`,
  value: 0,
}))

const directions = new Map(widgets.map(w => [w.id, Math.random() < 0.5 ? 1 : -1]))

function updateWidgets() {
  const updates = []

  for (let i = 0; i < 100; i++) {
    const id = Math.floor(Math.random() * TOTAL)
    const widget = widgets[id]
    const dir = directions.get(id) ?? 1

    let nextValue = widget.value + dir
    if (nextValue >= 100) {
      nextValue = 100
      directions.set(id, -1)
    } else if (nextValue <= -100) {
      nextValue = -100
      directions.set(id, 1)
    }

    widget.value = nextValue
    updates.push({ id, value: nextValue })
  }

  return updates
}

module.exports = { widgets, updateWidgets }
