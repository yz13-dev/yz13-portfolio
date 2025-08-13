import { Button } from "@yz13/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@yz13/ui/dropdown-menu"
import { cn } from "@yz13/ui/utils"
import { useDebounceFn } from "ahooks"
import { ArrowRightIcon, ChevronDownIcon } from "lucide-react"
import { useState } from "react"



export const Resources = () => {

  const [open, setOpen] = useState<boolean>(false)

  const close = useDebounceFn(() => setOpen(false), { wait: 250 })

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        onPointerEnter={() => setOpen(true)}
        onPointerLeave={() => close.run()}
      >
        <Button variant="ghost">
          Ресурсы
          <ChevronDownIcon className={cn("transition-transform", open ? "rotate-180" : "")} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-48 bg-popover/40 backdrop-blur-sm"
        onPointerEnter={() => {
          setOpen(true)
          close.cancel()
        }}
        onPointerLeave={() => setOpen(false)}
      >
        <DropdownMenuItem className="justify-between">
          <span>Блог</span>
          <ArrowRightIcon />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
