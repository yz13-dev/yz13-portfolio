import { create } from "zustand"

interface CanvasState {
  translateX: number
  translateY: number
  setTranslate: (x: number, y: number) => void
  updateTranslate: (dx: number, dy: number) => void
}

export const useCanvasStore = create<CanvasState>((set) => ({
  translateX: 0,
  translateY: 0,
  setTranslate: (x, y) => set({ translateX: x, translateY: y }),
  updateTranslate: (dx, dy) =>
    set((state) => ({
      translateX: state.translateX + dx,
      translateY: state.translateY + dy,
    })),
}))

// Селекторы для оптимизации ре-рендеров
export const useTranslateX = () => useCanvasStore((state) => state.translateX)
export const useTranslateY = () => useCanvasStore((state) => state.translateY)
export const useUpdateTranslate = () => useCanvasStore((state) => state.updateTranslate)
export const useTranslate = () => {
  const translateX = useCanvasStore(state => state.translateX)
  const translateY = useCanvasStore(state => state.translateY)
  return { translateX, translateY }
}
