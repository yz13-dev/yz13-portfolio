import { TZDate } from "@date-fns/tz"
import { formatISO } from "date-fns"
import { create } from "zustand"

type State = {
  date: Date
}
type Actions = {
  setDate: (date: Date) => void
}

export const getNewDate = () => {
  const date = formatISO(new Date())
  return new TZDate(date, "Asia/Yekaterinburg")
}

export const useDate = create<State & Actions>()((set) => ({
  date: getNewDate(),
  setDate: (date) => set({ date }),
}))
