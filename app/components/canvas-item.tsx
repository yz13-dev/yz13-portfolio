"use client"

import type React from "react"

interface CanvasItemProps {
  id: string
  x: number
  y: number
  children: React.ReactNode
}

export function CanvasItem({ id, x, y, children }: CanvasItemProps) {
  return (
    <div
      className="absolute z-10 border inset-0 w-full h-full"
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      {children}
    </div>
  )
}
