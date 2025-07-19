"use client"

import { useCanvasStore } from "@/stores/canvas-store"
import { Button } from "@yz13/ui/button"
import { cn } from "@yz13/ui/utils"
import { PlusIcon } from "lucide-react"
import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import Availability from "./availability"
import CallToAction from "./call-to-action"
import { TileBackground } from "./tile-background"

interface CanvasItemData {
  id: string
  x: number
  y: number
  content: React.ReactNode
}

// const REPEAT_WIDTH = 1000
// const REPEAT_HEIGHT = 1000

export default function InfiniteCanvas() {
  const { translateX, translateY, updateTranslate } = useCanvasStore()
  const [isDragging, setIsDragging] = useState(false)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)


  const [items, setItems] = useState<CanvasItemData[]>([])
  const nextItemId = useRef(0)

  // Обработчик начала перетаскивания холста
  const handlePointerDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true)
      lastMousePos.current = { x: e.clientX, y: e.clientY }
      e.preventDefault()
    }
  }, [])

  // Обработчик перемещения мыши для перетаскивания холста
  const handlePointerMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return

      const dx = e.clientX - lastMousePos.current.x
      const dy = e.clientY - lastMousePos.current.y

      updateTranslate(dx, dy)
      lastMousePos.current = { x: e.clientX, y: e.clientY }
    },
    [isDragging, updateTranslate],
  )

  // Обработчик отпускания кнопки мыши для завершения перетаскивания холста
  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Эффект для добавления и удаления слушателей событий
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("pointermove", handlePointerMove)
      window.addEventListener("pointerup", handlePointerUp)

      return () => {
        window.removeEventListener("pointermove", handlePointerMove)
        window.removeEventListener("pointerup", handlePointerUp)
      }
    }
  }, [isDragging, handlePointerMove, handlePointerUp])

  // Добавление нового HTML-блока на холст
  const handleAddItem = () => {
    const newItemId = `item-${nextItemId.current++}`

    const worldX = -translateX + window.innerWidth / 2
    const worldY = -translateY + window.innerHeight / 2

    const normalizedX = (((worldX % width) + width) % width) - 100
    const normalizedY = (((worldY % height) + height) % height) - 50

    setItems((prevItems) => [
      ...prevItems,
      {
        id: newItemId,
        x: normalizedX,
        y: normalizedY,
        content: (
          <div className="p-4 bg-card border w-fit h-fit flex flex-col">
            <h3 className="font-semibold text-lg mb-2 flex-shrink-0">{"Привет, мир!"}</h3>
            <p className="text-sm text-muted-foreground flex-1 mb-2">
              {"Это HTML-блок. Вы можете вставить сюда любой HTML-контент."}
            </p>
            <Button variant="outline" className="mt-2">
              {"Нажми меня"}
            </Button>
          </div>
        ),
      },
    ])
  }

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const startCol = Math.floor(-translateX / width) - 1
  const endCol = Math.ceil((-translateX + viewportWidth) / width) + 1
  const startRow = Math.floor(-translateY / height) - 1
  const endRow = Math.ceil((-translateY + viewportHeight) / height) + 1

  // Рендерим фоновые тайлы для перетаскивания
  const backgroundTiles = []
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
        >
          {
            items.map(item => {
              return item.content
            })
          }
        </TileBackground>
      )
    }
  }

  useEffect(() => {

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      const { width, height } = entry.contentRect
      setWidth(width)
      setHeight(height)
    })

    observer.observe(document.body)

    return () => {
      observer.disconnect()
    }
  }, [])
  return (
    <div className="relative w-full h-full overflow-hidden" ref={canvasRef}>
      {/* Контейнер для перемещения всего содержимого холста */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${translateX}px, ${translateY}px)`,
          transformOrigin: "0 0",
        }}
      >
        {/* Фоновые тайлы для перетаскивания */}
        {backgroundTiles}

      </div>

      {/* Кнопка для добавления нового HTML-блока */}
      <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-10">

        <Button onClick={handleAddItem} size="lg" className="w-2/3 mx-auto" variant="secondary">
          <PlusIcon className="mr-2 h-4 w-4" /> {"Добавить HTML-блок"}
        </Button>

        <div className="w-full !mt-auto space-y-4 bg-card/40 rounded-4xl border p-4">
          <div>
            <div className="w-full max-w-xs mx-auto">
              <Availability className="bg-transparent !px-0 !py-0 border-0 mx-auto" size="sm" enabled={false} />
              <div className="w-full">
                <span className="text-muted-foreground text-center block mx-auto text-xs">
                  По вопросам и/или предложениям пишите:
                </span>
                <div className="flex items-center justify-center gap-1.5 text-xs *:text-center">
                  <Link to="mailto:yz13.dev@gmail.com" className="font-medium text-foreground hover:underline">yz13.dev@gmail.com</Link>
                  <span className="text-muted-foreground">или</span>
                  <Link to="mailto:yztheceo@yandex.ru" className="font-medium text-foreground hover:underline">yztheceo@yandex.ru</Link>
                </div>
              </div>
            </div>
          </div>


          <div className={cn(
            "flex gap-4 items-center flex-col",
            "*:w-full *:h-12 *:text-base [&>svg]:!size-[18]"
          )}>
            <CallToAction enabled={false} />
          </div>
        </div>
      </footer>
    </div>
  )
}
