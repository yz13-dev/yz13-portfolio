"use client"

import { cn } from "@yz13/ui/utils";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const DITHER_CHARS = ["█", "▓", "▒", "░", "·", " "]

export default function DitheringBackground() {
  const [grid, setGrid] = useState<string[][]>([])
  const [gridSize, setGridSize] = useState({ width: 300, height: 150 })
  const animationRef = useRef<number>()
  const timeRef = useRef(0)
  const [ready, setReady] = useState<boolean>(false);
  const prevIntensitiesRef = useRef<number[][]>([])

  useEffect(() => {
    setReady(true)
  }, [])

  useEffect(() => {
    // Вычисляем размер сетки на основе размера экрана
    const calculateGridSize = () => {
      const charWidth = 4 // уменьшенный размер символа
      const charHeight = 6 // уменьшенный размер символа

      const width = Math.ceil(window.innerWidth / charWidth) + 20
      const height = Math.ceil(window.innerHeight / charHeight) + 20

      setGridSize({ width, height })
    }

    calculateGridSize()

    // Пересчитываем размер при изменении размера окна
    const handleResize = () => {
      calculateGridSize()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Функция для плавной интерполяции между символами
  const interpolateChar = (intensity: number, prevIntensity: number): string => {
    // Плавная интерполяция между предыдущим и текущим значением
    const lerpFactor = 0.15 // Коэффициент плавности (меньше = плавнее)
    const smoothedIntensity = prevIntensity + (intensity - prevIntensity) * lerpFactor
    
    // Выбираем символ на основе сглаженной интенсивности
    const charIndex = Math.floor(smoothedIntensity * (DITHER_CHARS.length - 1))
    return DITHER_CHARS[Math.max(0, Math.min(DITHER_CHARS.length - 1, charIndex))]
  }

  useEffect(() => {
    if (gridSize.width > 0 && gridSize.height > 0) {
      // Инициализация сетки и предыдущих интенсивностей
      const initGrid = () => {
        const newGrid: string[][] = []
        const newPrevIntensities: number[][] = []
        
        for (let y = 0; y < gridSize.height; y++) {
          const row: string[] = []
          const intensityRow: number[] = []
          for (let x = 0; x < gridSize.width; x++) {
            const intensity = Math.random()
            row.push(DITHER_CHARS[Math.floor(intensity * (DITHER_CHARS.length - 1))])
            intensityRow.push(intensity)
          }
          newGrid.push(row)
          newPrevIntensities.push(intensityRow)
        }
        setGrid(newGrid)
        prevIntensitiesRef.current = newPrevIntensities
      }

      // Анимационная функция с более плавными параметрами
      const animate = () => {
        timeRef.current += 0.005 // Еще более медленная скорость для плавности

        setGrid((prevGrid) => {
          const newGrid = prevGrid.map((row, y) =>
            row.map((_, x) => {
              // Создаем более плавные волновые паттерны с меньшей частотой
              const wave1 = Math.sin(x * 0.03 + timeRef.current) * 0.4 + 0.5
              const wave2 = Math.sin(y * 0.05 + timeRef.current * 0.6) * 0.4 + 0.5
              const wave3 = Math.sin((x + y) * 0.025 + timeRef.current * 0.4) * 0.4 + 0.5

              // Комбинируем волны для создания сложного паттерна
              const combined = (wave1 + wave2 + wave3) / 3

              // Минимальный шум для стабильности
              const noise = Math.random() * 0.02
              const intensity = Math.max(0, Math.min(1, combined + noise))

              // Получаем предыдущую интенсивность для этого пикселя
              const prevIntensity = prevIntensitiesRef.current[y]?.[x] || intensity
              
              // Обновляем предыдущую интенсивность
              prevIntensitiesRef.current[y][x] = intensity

              // Используем интерполяцию для плавного перехода
              return interpolateChar(intensity, prevIntensity)
            }),
          )
          return newGrid
        })

        animationRef.current = requestAnimationFrame(animate)
      }

      initGrid()
      animate()

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }
  }, [gridSize])

  return (
    <div className="w-full h-dvh absolute top-0 z-[-1] left-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 1 }}
        className={cn(
          "w-full h-full relative",
          "grayscale bg-gradient-to-b from-background via-transparent to-background blur-2xl"
        )}
      >
        <div className="absolute inset-0 bg-background opacity-50">
          <pre
            className="text-foreground/50 text-xs leading-none font-mono whitespace-pre opacity-70 w-full h-full"
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

        <div className="absolute inset-0 bg-gradient-to-br from-card via-transparent to-background" />
      </motion.div>
    </div>
  )
}
