"use client"

import { cn } from "@yz13/ui/utils"
import type { ComponentProps, ReactNode } from "react"

type TileBackgroundProps = {
  col: number
  row: number
  width: number
  height: number
  children?: ReactNode
} & ComponentProps<"div">

export function TileBackground({ col, row, width, height, onMouseDown, children, className = "", ...props }: TileBackgroundProps) {
  return (
    <div
      style={{
        left: `${col * width}px`,
        top: `${row * height}px`,
        width: `${width}px`,
        minHeight: `${height}px`,
        zIndex: 1, // Ниже элементов контента
      }}
      className={cn("absolute cursor-grab border active:cursor-grabbing", className)}
      {...props}
    >
      <div className="w-full h-full relative">
        {children}
      </div>
    </div>
  )
}
