import { Logo } from "@/components/logo";
import { Badge } from "@yz13/ui/badge";
import { Button } from "@yz13/ui/button";
import { ArrowDownIcon, ArrowRightIcon, PlusIcon, SendIcon } from "lucide-react";



export default function () {
  return (
    <>
      <header className="w-full px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo size={28} type="full" />
        </div>
        <div>
          <Button>
            <span className="sm:inline hidden">Запланировать видеозвонок</span>
            <span className="sm:hidden inline">Видеозвонок</span>
            <ArrowRightIcon /></Button>
        </div>
      </header>
      <div className="w-full h-[calc(100dvh-64px)] bg-card border flex md:flex-row flex-col">
        <div className="md:w-1/2 w-full md:h-full h-fit flex flex-col justify-between *:p-6">
          <div className="w-full"></div>
          <div className="w-full space-y-8">
            <div className="w-fit h-9 border rounded-full flex items-center gap-2 px-4">
              <div className="size-2 rounded-full bg-muted-foreground" />
              <span className="text-sm text-muted-foreground">Недоступен для работы</span>
            </div>
            <div className="w-full *:text-4xl *:font-semibold space-y-2 *:block">
              <h1 className="text-foreground">YZ13 - Фронтенд который не подведет.</h1>
              <p className="text-foreground">
                Разработаю сайт, приложение разной сложности.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="secondary"><SendIcon />Чат</Button>
              <Button>Запланировать видеозвонок <ArrowRightIcon /></Button>
            </div>
            <div className="w-full space-y-3">
              <span className="text-muted-foreground text-sm block">Бренды, доверившиеся мне</span>
              <div className="w-full h-16 bg-secondary"></div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 w-full md:h-full h-fit *:p-6">
          <div className="w-full h-[500px] overflow-hidden flex items-center gap-4">
            <div className="h-full aspect-[4/3] bg-secondary"></div>
            <div className="h-full aspect-[4/3] bg-secondary"></div>
            <div className="h-full aspect-[4/3] bg-secondary"></div>
          </div>
          <div className="w-full grid grid-cols-4 gap-2 *:h-9 *:text-base *:px-3">
            <Badge variant="outline" className="flex items-center justify-between w-full">
              <span className="font-medium">MVP</span>
              <span className="text-muted-foreground/60">От 4 недель</span>
            </Badge>
            <Badge variant="outline" className="text-sm flex items-center justify-between w-full">
              <span className="font-medium">Сайт</span>
              <span className="text-muted-foreground/60">От 4 недель</span>
            </Badge>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-medium text-muted-foreground">Цены начинаются от</span>
              <ArrowRightIcon />
            </div>
            <Button size="lg">{(3000).toLocaleString()} ₽ <ArrowDownIcon /></Button>
          </div>
          <ul className="*:py-3 *:px-5 *:rounded-full *:w-full *:border">
            <li className="flex items-center justify-between">
              <span className="text-base">Вопрос #1</span>
              <PlusIcon size={20} className="text-muted-foreground" />
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
