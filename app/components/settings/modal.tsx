import { Button } from "@yz13/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@yz13/ui/dialog";
import { Input } from "@yz13/ui/input";
import { PaletteIcon, SearchIcon, UserCircleIcon } from "lucide-react";



export default function ({ children }: { children?: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild={!!children}>{children}</DialogTrigger>
      <DialogContent className="!max-w-3xl rounded-lg p-2 w-full">
        <DialogHeader className="py-2 px-3 border-b h-10">
          <DialogTitle>Настройки</DialogTitle>
        </DialogHeader>
        <div className="w-full flex min-h-96">
          <aside className="w-1/4 flex flex-col gap-1 *:justify-start">
            <div className="flex items-center gap-2 h-9">
              <SearchIcon size={16} className="absolute left-5 text-muted-foreground" />
              <Input placeholder="Поиск" className="w-full pl-9" />
            </div>
            <Button variant="ghost">
              <UserCircleIcon />
              <span>Профиль</span>
            </Button>
            <Button variant="ghost">
              <PaletteIcon />
              <span>Внешний вид</span>
            </Button>
          </aside>
          <div className="w-3/4 px-3">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <span className="text-base uppercase">Тема</span>
                <span className="text-sm text-muted-foreground">
                  Выберите тему, светлую, темную или системную.
                </span>
              </div>
              <div className="w-full h-28 grid grid-cols-3 gap-3">
                <div className="w-full h-full border rounded-lg [&>div]:rounded-lg">
                  <div className="w-full h-full bg-white relative overflow-hidden">
                    <div className="w-full h-full absolute top-4 left-4 rounded-lg bg-neutral-200" />
                  </div>
                </div>
                <div className="w-full h-full border rounded-lg [&>div]:rounded-lg">
                  <div className="w-full h-full bg-black relative overflow-hidden">
                    <div className="w-full h-full absolute top-4 left-4 rounded-lg bg-neutral-800" />
                  </div>
                </div>
                <div className="w-full h-full border rounded-lg [&>div]:first:rounded-l-lg [&>div]:last:rounded-r-lg flex">
                  <div className="w-1/2 h-full bg-white relative overflow-hidden">
                    <div className="w-full h-full absolute top-4 left-4 rounded-lg bg-neutral-200" />
                  </div>
                  <div className="w-1/2 h-full bg-black relative overflow-hidden">
                    <div className="w-full h-full absolute top-4 right-4 rounded-lg bg-neutral-800" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="py-2 px-3">
          <DialogClose asChild>
            <Button variant="secondary">Закрыть</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
