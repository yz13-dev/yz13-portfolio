import { cn } from "@yz13/ui/utils"
import { GroupIcon, LayoutGridIcon } from "lucide-react"




type GroupProps = {
  children?: React.ReactNode
  className?: string
  label?: string
  description?: string
  groupClassName?: string
  actions?: React.ReactNode
}
export const Group = ({
  groupClassName = "",
  children,
  className = "",
  label = "",
  description,
  actions
}: GroupProps) => {
  return (
    <div className={cn("flex flex-col divide-y w-fit h-fit", groupClassName)}>
      <div className="flex items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-2">
          <div className="size-6 flex items-center justify-center bg-secondary rounded-[6px]">
            <GroupIcon size={14} className="text-muted-foreground" />
          </div>
          <span className="text-sm text-foreground">{label}</span>
          {
            description &&
            <span className="text-sm line-clamp-1 text-muted-foreground">{description}</span>
          }
        </div>
        <div className="flex items-center gap-2">
          {actions}
        </div>
      </div>
      {
        children &&
        <div className={cn("grid grid-cols-2 divide-x rounded-3xl", className)}>
          {children}
        </div>
      }
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
    <div className="flex flex-col w-fit h-fit divide-y">
      <div className="flex items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-2">
          <div className="size-6 flex items-center justify-center bg-secondary rounded-[6px]">
            <LayoutGridIcon size={14} className="text-muted-foreground" />
          </div>
          <span className="text-sm text-foreground">{label}</span>
        </div>
        <div className="flex items-center gap-2"></div>
      </div>
      <div className={cn("w-[600px] bg-card overflow-hidden relative", className)}>
        {children}
      </div>
    </div>
  )
}
