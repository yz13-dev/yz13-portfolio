"use client"

import { cn } from "@yz13/ui/utils"
import type { ComponentProps, ReactNode } from "react"

type TileBackgroundProps = {
  col: number
  row: number
  width: number
  height: number
  children?: ReactNode
  contentClassName?: string
} & ComponentProps<"div">

export function TileBackground({ col, row, width, height, onMouseDown, onTouchStart, children, className = "", contentClassName = "", ...props }: TileBackgroundProps) {
  return (
    <div
      style={{
        left: `${col * width}px`,
        top: `${row * height}px`,
        width: `${width}px`,
        minHeight: `${height}px`,
        zIndex: 1, // Ниже элементов контента
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
      }}
      className={cn("absolute", className)}
      {...props}
    >
      <div className={cn("w-full h-full relative", contentClassName)}>
        {children}
      </div>
    </div>
  )
}
