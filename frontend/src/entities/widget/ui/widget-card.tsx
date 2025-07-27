import React from "react"
import type { Widget } from "../model/types"

interface Props {
  data: Widget
}

const WidgetCardComponent = ({ data }: Props) => {
  let bg = 'bg-[#cccccc]'
  if (data.value > 50) bg = 'bg-[#ff0000]'
  else if (data.value < -50) bg = 'bg-[#0000ff]'

  return (
    <div
      className={`w-[44px] h-[24px] text-[7px] text-white px-[2px] py-[1px] flex gap-2 ${bg}`}
    >
      <span className="">{data.name}</span>
      <span className="self-end text-[9px] font-medium">{data.value}</span>
    </div>
  )
}

export const WidgetCard = React.memo(WidgetCardComponent, (prev, next) => {
  return prev.data.value === next.data.value
})
