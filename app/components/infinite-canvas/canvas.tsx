"use client"
import { cn } from "@yz13/ui/utils"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { ExtenderPublication } from "../../routes/page"
import { useTranslate, useUpdateTranslate } from "./canvas-store"
import {
  chunkArray,
  LogoSection,
  MainContent,
  ProjectChunk,
  ScreenshotsSection
} from "./components"
import { TileBackground } from "./tile-background"

// Types
interface Dimensions {
  width: number
  height: number
}

interface VisibleTiles {
  startCol: number
  endCol: number
  startRow: number
  endRow: number
}

// Main component
export default function InfiniteCanvas({ projects = [] }: { projects?: ExtenderPublication[] }) {
  // State and refs
  const chunk = useMemo(() => chunkArray(projects, 2), [projects])
  const { translateX, translateY } = useTranslate()
  const updateTranslate = useUpdateTranslate()
  const canvasRef = useRef<HTMLDivElement>(null)

  // Local state
  const [isDragging, setIsDragging] = useState(false)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const lastTouchPos = useRef({ x: 0, y: 0 })
  const initialTouchPos = useRef({ x: 0, y: 0 })
  const lastTouchUpdate = useRef(0)

  // Constants
  const dimensions: Dimensions = {
    width: 2400,
    height: 1300
  }

  // Viewport - используем статичные значения
  const viewport = {
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080
  }

  // Computed values
  const visibleTiles: VisibleTiles = {
    startCol: Math.floor(-translateX / dimensions.width) - 1,
    endCol: Math.ceil((-translateX + viewport.width) / dimensions.width) + 1,
    startRow: Math.floor(-translateY / dimensions.height) - 1,
    endRow: Math.ceil((-translateY + viewport.height) / dimensions.height) + 1
  }

  // Event handlers
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    updateTranslate(-e.deltaX, -e.deltaY)
  }

  const handlePointerDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true)
      lastMousePos.current = { x: e.clientX, y: e.clientY }
      e.preventDefault()
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true)
      const touch = e.touches[0]
      lastTouchPos.current = { x: touch.clientX, y: touch.clientY }
      initialTouchPos.current = { x: touch.clientX, y: touch.clientY }
      lastTouchUpdate.current = Date.now()
      e.preventDefault()
    }
  }

  const handlePointerMove = (e: MouseEvent) => {
    if (!isDragging) return

    const dx = e.clientX - lastMousePos.current.x
    const dy = e.clientY - lastMousePos.current.y

    updateTranslate(dx, dy)
    lastMousePos.current = { x: e.clientX, y: e.clientY }
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return

    const now = Date.now()
    if (now - lastTouchUpdate.current < 33) return // Throttle to 30fps

    const touch = e.touches[0]
    const currentX = touch.clientX
    const currentY = touch.clientY

    const deltaX = currentX - lastTouchPos.current.x
    const deltaY = currentY - lastTouchPos.current.y

    const sensitivity = 1
    updateTranslate(deltaX * sensitivity, deltaY * sensitivity)

    lastTouchPos.current = { x: currentX, y: currentY }
    lastTouchUpdate.current = now
    e.preventDefault()
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("pointermove", handlePointerMove)
      window.addEventListener("pointerup", handlePointerUp)
      window.addEventListener("touchmove", handleTouchMove, { passive: false })
      window.addEventListener("touchend", handleTouchEnd)

      return () => {
        window.removeEventListener("pointermove", handlePointerMove)
        window.removeEventListener("pointerup", handlePointerUp)
        window.removeEventListener("touchmove", handleTouchMove)
        window.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [isDragging])

  // Render background tiles
  const backgroundTiles = []
  const { startCol, endCol, startRow, endRow } = visibleTiles
  const { width, height } = dimensions

  for (let col = startCol; col <= endCol; col++) {
    for (let row = startRow; row <= endRow; row++) {
      const isRoot = col === 0 && row === 0
      backgroundTiles.push(
        <TileBackground
          id={isRoot ? "root-container" : undefined}
          key={`bg-${col}-${row}`}
          col={col}
          row={row}
          width={width}
          height={height}
          onPointerDown={handlePointerDown}
          onTouchStart={handleTouchStart}
          onWheel={handleWheel}
          contentClassName={cn("flex flex-wrap bg-background flex-row cursor-grab", isDragging && "cursor-grabbing")}
        >
          <div className="w-full flex">
            <div className="p-4">
              <MainContent isRoot={isRoot} />
            </div>
            <div className="w-[calc(100%-var(--container-sm))] h-full p-4 flex flex-row gap-4">
              <LogoSection />
              <ScreenshotsSection />
            </div>
          </div>
          <div className="w-full h-full p-4 flex flex-col gap-4">
            {
              chunk.map((items, index) => (
                <ProjectChunk key={`chunk/${index}`} items={items} />
              ))
            }
          </div>
        </TileBackground>
      )
    }
  }

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      ref={canvasRef}
      style={{
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${translateX}px, ${translateY}px)`,
          transformOrigin: "0 0",
        }}
      >
        {backgroundTiles}
      </div>
    </div>
  )
}
