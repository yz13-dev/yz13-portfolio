"use client"
import { cn } from "@yz13/ui/utils"
import { motion } from "motion/react"
import { useEffect, useRef, useState } from "react"

type DitheringStyle = "blocks" | "ascii"

interface DitheringBackgroundProps {
  className?: string
  style?: DitheringStyle
}

const DITHER_STYLES = {
  blocks: ["█", "▓", "▒", "░", "·", " "],
  ascii: ["@", "#", "%", "&", "*", "+", "=", "-", ":", ".", " "],
}


export default function DitheringBackground({ style = "blocks", className = "" }: DitheringBackgroundProps) {
  const [grid, setGrid] = useState<string[][]>([])
  const [gridSize, setGridSize] = useState({ width: 300, height: 150 })
  const animationRef = useRef<number>()
  const timeRef = useRef(0)
  const intensityGridRef = useRef<number[][]>([])

  const [ready, setReady] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const DITHER_CHARS = DITHER_STYLES[style]

  useEffect(() => {
    setReady(true)
  }, [])
  useEffect(() => {
    const div = ref.current;
    if (!div) return;
    // Вычисляем размер сетки на основе размера экрана
    const calculateGridSize = () => {
      const charWidth = 4
      const charHeight = 6

      const width = Math.ceil(div.clientWidth / charWidth) + 20
      const height = Math.ceil(div.clientHeight / charHeight) + 20

      setGridSize({ width, height })
    }

    calculateGridSize()

    const handleResize = () => {
      calculateGridSize()
    }

    div.addEventListener("resize", handleResize)

    return () => {
      div.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (gridSize.width > 0 && gridSize.height > 0) {
      // Инициализация сетки интенсивности
      const initIntensityGrid = () => {
        const newIntensityGrid: number[][] = []
        for (let y = 0; y < gridSize.height; y++) {
          const row: number[] = []
          for (let x = 0; x < gridSize.width; x++) {
            row.push(Math.random())
          }
          newIntensityGrid.push(row)
        }
        intensityGridRef.current = newIntensityGrid
      }

      // Инициализация символьной сетки
      const initGrid = () => {
        const newGrid: string[][] = []
        for (let y = 0; y < gridSize.height; y++) {
          const row: string[] = []
          for (let x = 0; x < gridSize.width; x++) {
            const intensity = intensityGridRef.current[y][x]
            const charIndex = Math.floor(intensity * (DITHER_CHARS.length - 1))
            row.push(DITHER_CHARS[charIndex])
          }
          newGrid.push(row)
        }
        setGrid(newGrid)
      }

      // Анимационная функция с плавными переходами
      const animate = () => {
        timeRef.current += 0.008

        // Обновляем интенсивность с интерполяцией
        const newIntensityGrid = intensityGridRef.current.map((row, y) =>
          row.map((currentIntensity, x) => {
            // Вычисляем целевую интенсивность
            const wave1 = Math.sin(x * 0.05 + timeRef.current) * 0.5 + 0.5
            const wave2 = Math.sin(y * 0.08 + timeRef.current * 0.7) * 0.5 + 0.5
            const wave3 = Math.sin((x + y) * 0.04 + timeRef.current * 0.5) * 0.5 + 0.5

            const combined = (wave1 + wave2 + wave3) / 3
            const noise = Math.random() * 0.005
            const targetIntensity = Math.max(0, Math.min(1, combined + noise))

            // Плавная интерполяция к целевой интенсивности
            const lerpFactor = 0.05
            return currentIntensity + (targetIntensity - currentIntensity) * lerpFactor
          }),
        )

        intensityGridRef.current = newIntensityGrid

        // Обновляем символьную сетку на основе новой интенсивности
        setGrid((prevGrid) => {
          return prevGrid.map((row, y) =>
            row.map((_, x) => {
              const intensity = intensityGridRef.current[y][x]
              const charIndex = Math.floor(intensity * (DITHER_CHARS.length - 1))
              return DITHER_CHARS[charIndex]
            }),
          )
        })

        animationRef.current = requestAnimationFrame(animate)
      }

      initIntensityGrid()
      initGrid()
      animate()

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }
  }, [gridSize, DITHER_CHARS])
  return (
    <div
      ref={ref}
      className={cn("w-full h-dvh absolute overflow-hidden top-0 z-[-1] left-0", className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 1 }}
        className={cn(
          "w-full h-full relative",
          "grayscale bg-gradient-to-b from-background via-transparent to-background blur-xl"
        )}
      >
        <div className="absolute inset-0 w-full h-full bg-background opacity-50">
          <pre
            className="text-foreground/50 text-base leading-none font-mono whitespace-pre opacity-70 w-full h-full"
            style={{
              letterSpacing: "0px",
              lineHeight: "0.6em",
            }}
          >
            {grid.map((row, y) => (
              <div key={y}>{row.join("")}</div>
            ))}
          </pre>
        </div>

        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-card via-transparent to-background" />
      </motion.div>
    </div>
  )
}
