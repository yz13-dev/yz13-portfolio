import { useEffect, useState } from "react"
import { create } from "zustand"
import { persist } from 'zustand/middleware'

type Theme = "system" | "light" | "dark"

type State = {
  theme: Theme
}

type Actions = {
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create(
  persist<State & Actions>((set) => ({
    theme: "system",
    setTheme: (theme) => set({ theme }),
  }),
    {
      name: "theme",
    }
  )
)

export const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
) => {
  const result = store(callback) as F
  const [data, setData] = useState<F>()

  useEffect(() => {
    setData(result)
  }, [result])

  return data
}


export default function () {
  const theme = useStore(useThemeStore, (state) => state)

  return [theme?.theme, theme?.setTheme] as const;
}
