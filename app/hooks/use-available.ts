import { available as getAvailable } from "@/utils/flags";
import { useEffect } from "react";
import { create } from "zustand";



type State = {
  available: boolean
  loading: boolean
}
type Actions = {
  setAvailable: (available: boolean) => void
  setLoading: (loading: boolean) => void
}

export const useAvailableStore = create<State & Actions>((set) => ({
  available: false,
  loading: true,
  setAvailable: (available: boolean) => set({ available }),
  setLoading: (loading: boolean) => set({ loading }),
}))

export default function () {

  const available = useAvailableStore((state) => state.available)
  const loading = useAvailableStore((state) => state.loading)

  const setAvailable = useAvailableStore((state) => state.setAvailable)
  const setLoading = useAvailableStore((state) => state.setLoading)

  const load = async () => {
    setLoading(true)
    try {

      const isAvailable = await getAvailable()

      setAvailable(isAvailable)

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load();
  }, [])
  return [available, loading] as const;
}
