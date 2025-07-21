"use client"

import { cn } from "@yz13/ui/utils"
import { StickerIcon } from "lucide-react"
import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import Availability from "../availability"
import Background from "../background"
import CallToAction from "../call-to-action"
import { Logo } from "../logo"
import { useCanvasStore } from "./canvas-store"
import { Group, GroupItem } from "./group"
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
  const lastTouchPos = useRef({ x: 0, y: 0 })
  const initialTouchPos = useRef({ x: 0, y: 0 })
  const lastTouchUpdate = useRef(0)
  const canvasRef = useRef<HTMLDivElement>(null)

  const width = 5_000;
  const height = 5_000;

  // Обработчик начала перетаскивания холста (мышь)
  const handlePointerDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true)
      lastMousePos.current = { x: e.clientX, y: e.clientY }
      e.preventDefault()
    }
  }, [])

  // Обработчик начала перетаскивания холста (касание)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true)
      const touch = e.touches[0]
      lastTouchPos.current = { x: touch.clientX, y: touch.clientY }
      initialTouchPos.current = { x: touch.clientX, y: touch.clientY }
      lastTouchUpdate.current = Date.now()
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

  // Обработчик перемещения касания для перетаскивания холста
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return

      const now = Date.now()
      // Throttle touch updates to 30fps (33ms) for smoother movement
      if (now - lastTouchUpdate.current < 33) return

      const touch = e.touches[0]
      const currentX = touch.clientX
      const currentY = touch.clientY

      // Вычисляем дельту от последней позиции
      const deltaX = currentX - lastTouchPos.current.x
      const deltaY = currentY - lastTouchPos.current.y

      // Применяем перемещение с более низким коэффициентом для еще более плавного движения
      const sensitivity = 0
      updateTranslate(deltaX * sensitivity, deltaY * sensitivity)

      lastTouchPos.current = { x: currentX, y: currentY }
      lastTouchUpdate.current = now
      e.preventDefault()
    },
    [isDragging, updateTranslate],
  )

  // Обработчик отпускания кнопки мыши для завершения перетаскивания холста
  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Обработчик окончания касания для завершения перетаскивания холста
  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Эффект для добавления и удаления слушателей событий
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
  }, [isDragging, handlePointerMove, handlePointerUp, handleTouchMove, handleTouchEnd])

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const startCol = Math.floor(-translateX / width) - 1
  const endCol = Math.ceil((-translateX + viewportWidth) / width) + 1
  const startRow = Math.floor(-translateY / height) - 1
  const endRow = Math.ceil((-translateY + viewportHeight) / height) + 1

  const MainWrapper = ({ root, children, className = "" }: { root: boolean, children?: React.ReactNode, className?: string }) => {
    if (root) return <main className={className}>{children}</main>
    return <div className={className}>{children}</div>
  }
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
          onTouchStart={handleTouchStart}
          contentClassName="flex flex-wrap flex-row"
        >
          <div className="w-dvw h-dvh flex md:items-center items-end relative justify-center p-4">
            {/* <Background /> */}

            <MainWrapper root={isRoot} className="w-full sm:max-w-sm max-w-full space-y-4 bg-card/60 backdrop-blur-md rounded-4xl border p-4">

              <div className="flex items-center justify-center relative gap-2 aspect-video w-full bg-secondary/20 border rounded-lg">
                <Logo size={56} type="icon" />
                <span className="text-5xl font-pixel font-medium">YZ13</span>
                <Background className="h-full" videoClassName="opacity-30" containerClassName="blur-md" />
              </div>

              <div>
                <h1 className="md:text-4xl text-3xl font-semibold">YZ13 - Фронтенд разработчик</h1>
              </div>

              <div>
                <p className="md:text-base text-sm text-muted-foreground">
                  Превращаю дизайн в работающий код. Разрабатываю сайты и веб-приложения с упором на удобство и скорость.
                </p>
              </div>

              <div className="py-2">
                <div className="w-full my-2 bg-secondary/30 rounded-xl">
                  <div className="w-full h-fit flex items-center">
                    <div className="md:size-24 size-20 flex items-center justify-center">
                      <div className="flex items-center justify-center size-14 rounded-full bg-secondary">
                        <StickerIcon size={28} />
                      </div>
                    </div>
                    <div className="w-[calc(100%-var(--spacing)*20)] h-full flex flex-col gap-0 md:py-3 py-2 pr-3">
                      <span className="md:text-lg text-base font-medium">React</span>
                      <span className="text-sm text-muted-foreground">
                        Быстрые и удобные решения для создания веб-приложений.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="w-full max-w-xs space-y-2">
                  <Availability className="bg-transparent !px-0 !py-0 border-0" size="sm" enabled={false} />
                  <div className="w-full">
                    <span className="text-muted-foreground block text-xs">
                      По вопросам и/или предложениям пишите:
                    </span>
                    <div className="flex items-center gap-1.5 text-xs">
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
            </MainWrapper>

          </div>
          <div className="w-[calc(100%-100dvw)] h-dvh p-4 flex flex-wrap gap-4 flex-row">
            <GroupItem label="OG">
              <img src="/og/og.png" className="w-full h-full object-cover" alt="og" />
            </GroupItem>
          </div>
          <div className="w-full h-full p-4 flex flex-wrap gap-4 flex-row">
            <Group label="YZ13 Portfolio">
              <GroupItem label="v1 Dark">
                <img src="/screenshots/yz13-v1-dark.png" className="object-cover" alt="yz13-dark" />
              </GroupItem>
              <GroupItem label="v1 Light">
                <img src="/screenshots/yz13-v1-light.png" className="object-cover" alt="yz13-light" />
              </GroupItem>
              <GroupItem label="v2">
                <img src="/screenshots/yz13-v2.png" className="object-cover" alt="yz13-light" />
              </GroupItem>
              <GroupItem label="v3">
                <img src="/screenshots/yz13-v3.png" className="object-cover" alt="yz13-light" />
              </GroupItem>
            </Group>
            <Group label="YZLAB">
              <GroupItem label="Главная (Dark)">
                <img src="/screenshots/yzlab-dark.png" className="object-cover" alt="yzlab-dark" />
              </GroupItem>
              <GroupItem label="Главная (Light)">
                <img src="/screenshots/yzlab-light.png" className="object-cover" alt="yzlab-light" />
              </GroupItem>
              <GroupItem label="Og">
                <img src="/screenshots/yzlab-light-og.png" className="" alt="yzlab-light-og" />
              </GroupItem>
              <GroupItem label="Site">
                <img src="/screenshots/yzlab-light-site.png" className="" alt="yzlab-light-site" />
              </GroupItem>
            </Group>
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
    </div>
  )
}
