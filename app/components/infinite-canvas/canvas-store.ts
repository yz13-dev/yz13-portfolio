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
