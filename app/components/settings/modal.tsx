import { Button } from "@yz13/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@yz13/ui/dialog";
import { useState } from "react";
import { useSettings } from "./store";
import { defaultSection, getContent, getName, getTabs } from "./structure";


export const ModalTrigger = ({ children }: { children?: React.ReactNode }) => {
  const setOpen = useSettings(state => state.setOpen)
  return <Button asChild={!!children} onClick={() => setOpen(true)}>{children}</Button>
}

export default function () {

  const open = useSettings(state => state.open);
  const setOpen = useSettings(state => state.setOpen);

  const [section, setSection] = useState<string>(defaultSection)

  const tags = getTabs();

  const name = getName(section) || "Настройки";
  const content = getContent(section);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="!max-w-3xl rounded-xl p-0 max-h-dvh w-full md:min-h-96 min-h-fit overflow-y-auto">
        <div className="w-full flex md:flex-row flex-col md:h-full h-fit md:*:h-full *:h-fit">
          <aside className="md:w-1/4 w-full flex flex-col p-3 gap-3 *:justify-start md:border-r border-r-0">
            <div className="gap-1 *:justify-start flex md:flex-col flex-row md:*:w-full *:w-fit">
              {
                tags.map(tab => {
                  const Icon = tab.icon;
                  const selected = section === tab.id;
                  return (
                    <Button
                      variant={selected ? "secondary" : "ghost"}
                      key={tab.id}
                      onClick={() => setSection(tab.id)}
                    >
                      <Icon />
                      <span>{tab.name}</span>
                    </Button>
                  )
                })
              }

            </div>
          </aside>
          <div className="md:w-3/4 w-full">
            <DialogHeader className="py-2 px-3 border-b h-14 flex flex-row items-center">
              <DialogTitle>{name}</DialogTitle>
            </DialogHeader>
            <div className="w-full h-[calc(100%-56px)] p-3">
              {content}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
