"use client"
import { cn } from "@yz13/ui/utils"
import { ListIcon } from "lucide-react"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { ExtenderPublication } from "../../routes/page"
import Projects from "../projects"
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
  const lastPointerPos = useRef({ x: 0, y: 0 })

  // Constants
  const dimensions: Dimensions = {
    width: 2400,
    height: 1800
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

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button === 0) {
      setIsDragging(true)
      lastPointerPos.current = { x: e.clientX, y: e.clientY }
      e.preventDefault()
    }
  }

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging) return

    // requestAnimationFrame(() => {
    const dx = e.clientX - lastPointerPos.current.x
    const dy = e.clientY - lastPointerPos.current.y

    updateTranslate(dx, dy)
    lastPointerPos.current = { x: e.clientX, y: e.clientY }
    // })
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  // Event listeners
  useEffect(() => {
    if (isDragging) {
      const handlePointerMoveEvent = (e: PointerEvent) => handlePointerMove(e)
      const handlePointerUpEvent = () => handlePointerUp()

      window.addEventListener("pointermove", handlePointerMoveEvent, { passive: false })
      window.addEventListener("pointerup", handlePointerUpEvent)

      return () => {
        window.removeEventListener("pointermove", handlePointerMoveEvent)
        window.removeEventListener("pointerup", handlePointerUpEvent)
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
          onWheel={handleWheel}
          contentClassName={cn(
            "flex flex-wrap bg-background flex-row cursor-grab",
            "divide-y divide-x border-t",
            isDragging && "cursor-grabbing"
          )}
        >
          <div className="w-full flex divide-x">
            <MainContent isRoot={isRoot} />
            <div className="w-[calc(100%-var(--container-sm))] h-full flex flex-row divide-x">
              <LogoSection />
              <aside className="w-96 h-full shrink-0">
                <div className="w-full p-3 flex items-center gap-2 text-muted-foreground">
                  <ListIcon size={14} />
                  <span className="text-sm">Проекты</span>
                </div>
                <div className="px-3">
                  <Projects projects={projects} />
                </div>
              </aside>
              <div className="w-[calc(100%-var(--spacing)*96)] h-full"></div>
            </div>
          </div>
          <div className="w-full flex divide-x">
            <ScreenshotsSection />
          </div>
          <div className="w-full h-full flex flex-col divide-y border-r">
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
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${translateX}px, ${translateY}px)`,
          transformOrigin: "0 0",
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      >
        {backgroundTiles}
      </div>
    </div>
  )
}
