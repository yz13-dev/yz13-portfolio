import { cn } from "@yz13/ui/utils"
import { GroupIcon, LayoutGridIcon } from "lucide-react"




type GroupProps = {
  children?: React.ReactNode
  className?: string
  label?: string
}
export const Group = ({ children, className = "", label = "" }: GroupProps) => {
  return (
    <div className="flex flex-col w-fit h-fit">
      <div className="flex items-center justify-between gap-3 py-3">
        <div className="flex items-center gap-2">
          <div className="size-6 flex items-center justify-center bg-secondary rounded-[6px]">
            <GroupIcon size={14} className="text-muted-foreground" />
          </div>
          <span className="text-sm text-muted-foreground">{label}</span>
        </div>
        <div className="flex items-center gap-2">
        </div>
      </div>
      <div className={cn("grid grid-cols-2 gap-4 px-4 pb-4 rounded-3xl bg-card/40 border", className)}>
        {children}
      </div>
    </div>
  )
}


type GroupItemProps = {
  children?: React.ReactNode
  className?: string
  label?: string
}

export const GroupItem = ({ children, className = "", label = "" }: GroupItemProps) => {
  return (
    <div className="flex flex-col w-fit h-fit">
      <div className="flex items-center justify-between gap-3 py-3">
        <div className="flex items-center gap-2">
          <div className="size-6 flex items-center justify-center bg-secondary rounded-[6px]">
            <LayoutGridIcon size={14} className="text-muted-foreground" />
          </div>
          <span className="text-sm text-foreground">{label}</span>
        </div>
        <div className="flex items-center gap-2"></div>
      </div>
      <div className={cn("w-[600px] bg-card rounded-sm overflow-hidden border relative", className)}>
        {children}
      </div>
    </div>
  )
}
