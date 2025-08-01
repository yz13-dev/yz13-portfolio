import { Logo } from "@/components/logo";
import { Badge } from "@yz13/ui/badge";
import { Button } from "@yz13/ui/button";
import { Separator } from "@yz13/ui/separator";
import { ArrowDownIcon, ArrowRightIcon, PlusIcon, SendIcon } from "lucide-react";



export default function () {
  const title = "YZ13 - Фронтенд который не подведет";
  const description = "Разработаю сайт, страницы, приложение и компоненты разной сложности";
  return (
    <>
      <header className="w-full px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo size={28} type="full" />
        </div>
        <div>
          <Button variant="secondary">
            <span className="sm:inline hidden">Запланировать видеозвонок</span>
            <span className="sm:hidden inline">Видеозвонок</span>
            <ArrowRightIcon />
          </Button>
        </div>
      </header>
      <div className="w-full h-[calc(100dvh-64px)] bg-card border flex md:flex-row flex-col overflow-y-auto">
        <div className="md:w-1/2 w-full md:min-h-fit min-h-[calc(100dvh-64px)] md:h-full h-fit flex flex-col justify-between *:p-6 md:sticky static top-0">
          <div className="w-full"></div>
          <div className="w-full space-y-8">
            <div className="w-fit h-9 border rounded-full flex items-center gap-2 px-4">
              <div className="size-2 rounded-full bg-muted-foreground" />
              <span className="text-sm text-muted-foreground">Недоступен для работы</span>
            </div>
            <div className="w-full space-y-2 *:block">
              <h1 className="text-foreground text-4xl font-semibold">{title}</h1>
              <p className="text-muted-foreground text-2xl font-medium">
                {description}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="secondary"><SendIcon />Чат</Button>
              <Button>Запланировать видеозвонок <ArrowRightIcon /></Button>
            </div>
            <div className="w-full space-y-3">
              <span className="text-muted-foreground text-sm block">Бренды, доверившиеся мне</span>
              <div className="w-full h-16 flex items-center gap-3 overflow-hidden">

                <div className="h-full aspect-square bg-secondary rounded-sm" />
                <div className="h-full aspect-square bg-secondary rounded-sm" />
                <div className="h-full aspect-square bg-secondary rounded-sm" />
                <div className="h-full aspect-square bg-secondary rounded-sm" />
                <div className="h-full aspect-square bg-secondary rounded-sm" />

                <div className="h-full aspect-square bg-secondary rounded-sm" />
                <div className="h-full aspect-square bg-secondary rounded-sm" />
                <div className="h-full aspect-square bg-secondary rounded-sm" />
                <div className="h-full aspect-square bg-secondary rounded-sm" />
                <div className="h-full aspect-square bg-secondary rounded-sm" />

                <div className="h-full aspect-square bg-secondary rounded-sm" />
                <div className="h-full aspect-square bg-secondary rounded-sm" />
                <div className="h-full aspect-square bg-secondary rounded-sm" />
                <div className="h-full aspect-square bg-secondary rounded-sm" />
                <div className="h-full aspect-square bg-secondary rounded-sm" />

              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 w-full md:h-full h-fit *:p-6">
          <div className="space-y-6">
            <div className="w-full">
              <span className="text-2xl font-medium">Последние работы</span>
            </div>
            <div className="w-full h-[500px] overflow-hidden flex items-center gap-4">
              <div className="h-full aspect-[4/3] bg-secondary"></div>
              <div className="h-full aspect-[4/3] bg-secondary"></div>
              <div className="h-full aspect-[4/3] bg-secondary"></div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="w-full">
              <span className="text-2xl font-medium">Услуги и цены</span>
            </div>
            <div className="w-full grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-2 *:h-9 *:text-base *:px-3">
              <Badge variant="outline" className="flex items-center justify-between w-full">
                <span className="font-medium">MVP</span>
                <span className="text-muted-foreground/60">От 4 недель</span>
              </Badge>
              <Badge variant="outline" className="text-sm flex items-center justify-between w-full">
                <span className="font-medium">Сайт</span>
                <span className="text-muted-foreground/60">От 4 недель</span>
              </Badge>
            </div>
          </div>
          <div className="space-y-6">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-medium text-muted-foreground">Цены начинаются от</span>
                <ArrowRightIcon />
              </div>
              <Button size="lg">{(3000).toLocaleString()} ₽ <ArrowDownIcon /></Button>
            </div>
            <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-3">
              <div className="bg-secondary w-full min-h-56 row-span-2"></div>
              <div className="bg-secondary w-full h-56"></div>
              <div className="bg-secondary w-full h-56"></div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="w-full">
              <span className="text-2xl font-medium">Вопросы и ответы</span>
            </div>
            <ul className="*:py-3 *:px-5 *:rounded-full *:w-full *:border space-y-3">
              <li className="flex items-center justify-between">
                <span className="text-base">Вопрос #1</span>
                <PlusIcon size={20} className="text-muted-foreground" />
              </li>
              <li className="flex items-center justify-between">
                <span className="text-base">Вопрос #2</span>
                <PlusIcon size={20} className="text-muted-foreground" />
              </li>
              <li className="flex items-center justify-between">
                <span className="text-base">Вопрос #3</span>
                <PlusIcon size={20} className="text-muted-foreground" />
              </li>
            </ul>
          </div>
          <footer className="flex lg:flex-row flex-col w-full h-git gap-4">
            <div className="flex flex-col gap-8 md:max-w-64 max-w-full">
              <div className="w-full flex flex-col gap-3">
                <Logo size={48} />
                <div className="*:block space-y-1">
                  <span className="text-base text-foreground font-semibold">{title}</span>
                  <span className="text-sm text-muted-foreground">{description}</span>
                </div>
              </div>
              <div className="w-full flex flex-col *:w-full gap-3 *:h-10">
                <Button variant="secondary">
                  <span className="sm:inline hidden">Запланировать видеозвонок</span>
                  <span className="sm:hidden inline">Видеозвонок</span>
                  <ArrowRightIcon />
                </Button>
                <div className="justify-center h-9 border rounded-full flex items-center gap-2 px-4">
                  <div className="size-2 rounded-full bg-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Недоступен для работы</span>
                </div>
              </div>
            </div>
            <div className="w-full h-full flex flex-col gap-3">
              <div className="w-full h-full min-h-52 flex flex-row">
                <div className="w-1/2 flex flex-col gap-3">
                  <span>Проекты</span>
                  <ul>
                    <li className="flex items-center gap-2">
                      <div className="size-6 rounded-sm bg-secondary" />
                      <span className="text-sm">Проект #1</span>
                    </li>
                  </ul>
                </div>
                <div className="w-1/2 flex flex-col gap-3">
                  <span>Проекты</span>
                  <ul>
                    <li className="flex items-center gap-2">
                      <div className="size-6 rounded-sm bg-secondary" />
                      <span className="text-sm">Проект #1</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full h-9 flex items-center gap-2">
                <Button variant="ghost">Telegram</Button>
                <Separator orientation="vertical" className="!h-1/2" />
                <Button variant="ghost">X/Twitter</Button>
                <Separator orientation="vertical" className="!h-1/2" />
                <Button variant="ghost">Github</Button>
              </div>
            </div>
          </footer>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">YZ13 2025</span>
            <span className="text-xs text-muted-foreground">Фронтенд разработчик</span>
          </div>
        </div>
      </div>
    </>
  )
}
