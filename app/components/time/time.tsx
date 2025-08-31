import { SlidingNumber } from "@yz13/ui/animated/sliding-number"
import { cn } from "@yz13/ui/utils"
import { useInterval } from "ahooks"
import { format } from "date-fns"
import { useEffect, useMemo, useState } from "react"
import { getNewDate, useDate } from "./store"

type Props = {
  children?: React.ReactNode;
}

export const DateProvider = ({ children }: Props) => {

  const [ready, setReady] = useState<boolean>(false)
  const [prev, setPrev] = useState(new Date())
  const setDate = useDate(state => state.setDate)


  useInterval(() => {
    const isChanged = format(prev, "HH:mm") !== format(getNewDate(), "HH:mm");

    if (isChanged) {
      setPrev(getNewDate())
      setDate(getNewDate())
    }

  }, ready ? 1000 : undefined)
  useEffect(() => {
    setReady(true)
  }, [])
  return children
}

type TimeProps = {
  className?: string
}
export const Time = ({
  className = "",
}: TimeProps) => {
  const [ready, setReady] = useState<boolean>(false)
  const date = useDate(state => state.date);

  useEffect(() => {
    setReady(true)
  }, [])
  return (
    <div className={cn("flex items-center font-sans", className)}>
      {
        ready
          ? <>
            <SlidingNumber padStart number={date.getHours()} />
            :
            <SlidingNumber padStart number={date.getMinutes()} />
          </>
          : <span>00:00</span>
      }
    </div>
  )
}

export const TimeOffset = ({ className = "" }: { className?: string }) => {
  const date = useDate(state => state.date)
  const offset = useMemo(() => date.getTimezoneOffset() / 60, [date])
  return (
    <span className={cn("", className)}>{offset} UTC</span>
  )
}
