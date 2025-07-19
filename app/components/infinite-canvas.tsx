"use client"

import { useCanvasStore } from "@/stores/canvas-store"
import { Button } from "@yz13/ui/button"
import { PlusIcon } from "lucide-react"
import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { CanvasItem } from "./canvas-item"
import { TileBackground } from "./tile-background"

interface CanvasItemData {
  id: string
  x: number
  y: number
  content: React.ReactNode
}

const REPEAT_WIDTH = 1000
const REPEAT_HEIGHT = 1000

export default function InfiniteCanvas() {
  const { translateX, translateY, updateTranslate } = useCanvasStore()
  const [isDragging, setIsDragging] = useState(false)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLDivElement>(null)

  const [items, setItems] = useState<CanvasItemData[]>([])
  const nextItemId = useRef(0)

  // Обработчик начала перетаскивания холста
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true)
      lastMousePos.current = { x: e.clientX, y: e.clientY }
      e.preventDefault()
    }
  }, [])

  // Обработчик перемещения мыши для перетаскивания холста
  const handleMouseMove = useCallback(
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
  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Эффект для добавления и удаления слушателей событий
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  // Добавление нового HTML-блока на холст
  const handleAddItem = () => {
    const newItemId = `item-${nextItemId.current++}`

    const worldX = -translateX + window.innerWidth / 2
    const worldY = -translateY + window.innerHeight / 2

    const normalizedX = (((worldX % REPEAT_WIDTH) + REPEAT_WIDTH) % REPEAT_WIDTH) - 100
    const normalizedY = (((worldY % REPEAT_HEIGHT) + REPEAT_HEIGHT) % REPEAT_HEIGHT) - 50

    setItems((prevItems) => [
      ...prevItems,
      {
        id: newItemId,
        x: normalizedX,
        y: normalizedY,
        content: (
          <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200 w-[200px] h-[100px] flex flex-col">
            <h3 className="font-semibold text-lg mb-2 flex-shrink-0">{"Привет, мир!"}</h3>
            <p className="text-sm text-gray-600 flex-1 mb-2">
              {"Это HTML-блок. Вы можете вставить сюда любой HTML-контент."}
            </p>
            <Button variant="outline" size="sm" className="bg-transparent flex-shrink-0">
              {"Нажми меня"}
            </Button>
          </div>
        ),
      },
    ])
  }

  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  const startCol = Math.floor(-translateX / REPEAT_WIDTH) - 1
  const endCol = Math.ceil((-translateX + viewportWidth) / REPEAT_WIDTH) + 1
  const startRow = Math.floor(-translateY / REPEAT_HEIGHT) - 1
  const endRow = Math.ceil((-translateY + viewportHeight) / REPEAT_HEIGHT) + 1

  // Рендерим фоновые тайлы для перетаскивания
  const backgroundTiles = []
  for (let col = startCol; col <= endCol; col++) {
    for (let row = startRow; row <= endRow; row++) {
      backgroundTiles.push(
        <TileBackground
          key={`bg-${col}-${row}`}
          col={col}
          row={row}
          tileWidth={REPEAT_WIDTH}
          tileHeight={REPEAT_HEIGHT}
          onMouseDown={handleMouseDown}
        />,
      )
    }
  }

  // Рендерим элементы контента
  const renderedItems: React.ReactNode[] = []
  for (let col = startCol; col <= endCol; col++) {
    for (let row = startRow; row <= endRow; row++) {
      items.forEach((item) => {
        renderedItems.push(
          <CanvasItem
            key={`${item.id}-${col}-${row}`}
            id={item.id}
            x={item.x + col * REPEAT_WIDTH}
            y={item.y + row * REPEAT_HEIGHT}
          >
            {item.content}
          </CanvasItem>,
        )
      })
    }
  }

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

        {/* Рендеринг всех элементов контента */}
        {renderedItems}
      </div>

      {/* Кнопка для добавления нового HTML-блока */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        <Button onClick={handleAddItem}>
          <PlusIcon className="mr-2 h-4 w-4" /> {"Добавить HTML-блок"}
        </Button>
      </div>
    </div>
  )
}
