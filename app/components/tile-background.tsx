"use client"

import type React from "react"

interface TileBackgroundProps {
  col: number
  row: number
  tileWidth: number
  tileHeight: number
  onMouseDown: (e: React.MouseEvent) => void
}

export function TileBackground({ col, row, tileWidth, tileHeight, onMouseDown }: TileBackgroundProps) {
  return (
    <div
      className="absolute cursor-grab active:cursor-grabbing"
      style={{
        left: `${col * tileWidth}px`,
        top: `${row * tileHeight}px`,
        width: `${tileWidth}px`,
        height: `${tileHeight}px`,
        zIndex: 1, // Ниже элементов контента
      }}
      onMouseDown={onMouseDown}
    />
  )
}
