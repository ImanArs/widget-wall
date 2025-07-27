import { memo } from 'react'
import { FixedSizeGrid, type GridChildComponentProps } from 'react-window'
import type { Widget } from '@/entities/widget/model/types'
import { WidgetCard } from '@/entities/widget/ui/widget-card'

interface Props {
  widgets: Widget[]
}

const WIDGET_WIDTH = 44
const WIDGET_HEIGHT = 24
const GAP = 4

const Cell = memo(
  ({ columnIndex, rowIndex, style, data }: GridChildComponentProps) => {
    const { widgets, columnCount } = data
    const index = rowIndex * columnCount + columnIndex
    if (index >= widgets.length) return null

    const widget = widgets[index]

    return (
      <div style={style} className="p-[2px]">
        <WidgetCard data={widget} />
      </div>
    )
  },
  (prev, next) => {
    const prevIndex = prev.rowIndex * prev.data.columnCount + prev.columnIndex
    const nextIndex = next.rowIndex * next.data.columnCount + next.columnIndex
    const prevWidget = prev.data.widgets[prevIndex]
    const nextWidget = next.data.widgets[nextIndex]
    return prevWidget?.value === nextWidget?.value
  }
)

export const WidgetGrid = ({ widgets }: Props) => {
  const containerWidth = window.innerWidth
  const columnCount = Math.max(2, Math.floor((containerWidth + GAP) / (WIDGET_WIDTH + GAP)))
  const rowCount = Math.ceil(widgets.length / columnCount)

  return (
    <FixedSizeGrid
      columnCount={columnCount}
      columnWidth={WIDGET_WIDTH + GAP}
      height={window.innerHeight}
      rowCount={rowCount}
      rowHeight={WIDGET_HEIGHT + GAP}
      width={containerWidth}
      itemData={{ widgets, columnCount }}
    >
      {Cell}
    </FixedSizeGrid>
  )
}
