import { cn } from "@yz13/ui/utils"




type GroupProps = {
  children?: React.ReactNode
  className?: string
  label?: string
}
export const Group = ({ children, className = "", label = "" }: GroupProps) => {
  return (
    <div className="flex flex-col gap-2 w-fit h-fit">
      <div>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <div className={cn("grid grid-cols-2 gap-4 p-4 rounded-4xl bg-card/40 border", className)}>
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
    <div className="flex flex-col w-fit h-fit gap-2">
      <div className="px-1">
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <div className={cn("w-[600px] bg-card rounded-md overflow-hidden border relative", className)}>
        {children}
      </div>
    </div>
  )
}
