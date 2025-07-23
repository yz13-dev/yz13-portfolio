import { useCallback, useEffect, useRef, useState } from "react"

// Types
export interface Viewport {
  width: number
  height: number
}

export interface TouchState {
  isDragging: boolean
  lastMousePos: { x: number; y: number }
  lastTouchPos: { x: number; y: number }
  initialTouchPos: { x: number; y: number }
  lastTouchUpdate: number
}

// Custom hooks
export const useDebounce = (callback: Function, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  return useCallback((...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => callback(...args), delay)
  }, [callback, delay])
}

export const useViewport = () => {
  // Используем статичные значения для предотвращения бесконечных циклов
  const [viewport, setViewport] = useState<Viewport>({ width: 1920, height: 1080 })


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setViewport({
          width: window.innerWidth,
          height: window.innerHeight
        })
      }
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])
  return viewport
}

export const useTouchState = () => {
  const [isDragging, setIsDragging] = useState(false)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const lastTouchPos = useRef({ x: 0, y: 0 })
  const initialTouchPos = useRef({ x: 0, y: 0 })
  const lastTouchUpdate = useRef(0)

  return {
    isDragging,
    setIsDragging,
    lastMousePos,
    lastTouchPos,
    initialTouchPos,
    lastTouchUpdate
  }
}

export const useCanvasHandlers = (
  isDragging: boolean,
  setIsDragging: (dragging: boolean) => void,
  lastMousePos: React.MutableRefObject<{ x: number; y: number }>,
  lastTouchPos: React.MutableRefObject<{ x: number; y: number }>,
  initialTouchPos: React.MutableRefObject<{ x: number; y: number }>,
  lastTouchUpdate: React.MutableRefObject<number>,
  updateTranslate: (dx: number, dy: number) => void
) => {
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    updateTranslate(-e.deltaX, -e.deltaY)
  }, [updateTranslate])

  const handlePointerDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true)
      lastMousePos.current = { x: e.clientX, y: e.clientY }
      e.preventDefault()
    }
  }, [setIsDragging])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true)
      const touch = e.touches[0]
      lastTouchPos.current = { x: touch.clientX, y: touch.clientY }
      initialTouchPos.current = { x: touch.clientX, y: touch.clientY }
      lastTouchUpdate.current = Date.now()
      e.preventDefault()
    }
  }, [setIsDragging])

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

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
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
    },
    [isDragging, updateTranslate],
  )

  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
  }, [setIsDragging])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [setIsDragging])

  return {
    handleWheel,
    handlePointerDown,
    handleTouchStart,
    handlePointerMove,
    handleTouchMove,
    handlePointerUp,
    handleTouchEnd
  }
}
