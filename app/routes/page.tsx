import { Logo } from "@/components/logo";
import User from "@/components/user";
import { available } from "@/utils/flags";
import { Button } from "@yz13/ui/button";
import { ArrowRightIcon, SendIcon } from "lucide-react";
import { useLoaderData } from "react-router";

export const loader = async () => {
  try {

    const isAvailable = available();

    return { available: isAvailable }
  } catch (error) {
    console.error(error)
    return {
      publications: [],
      available: false,
      pricing: []
    }
  }
}

const telegram = "https://t.me/yz13_dev"
const twitter = "https://x.com/yz13_dev"
const github = "https://githib.com/yz13-dev"

export default function () {

  const { available } = useLoaderData<typeof loader>();

  return (
    <>
      <header className="w-full max-w-7xl flex items-center justify-between mx-auto py-3 px-6">
        <Logo size={48} type="full" />
        <User />
      </header>
      <main className="w-full max-w-7xl mx-auto px-6 py-[5%] space-y-6">
        <div className="size-24 rounded-lg bg-card border flex items-center justify-center">
          <Logo size={64} type="icon" />
        </div>
        <h1 className="*:inline space-x-2 *:text-4xl *:font-semibold max-w-2xl">
          <span>YZ13</span><span>-</span><span>Фронтенд который не подведет. Разработаю сайт, страницы, приложение и компоненты разной сложности</span>
        </h1>
      </main>
      <footer className="w-full max-w-7xl mx-auto p-6 space-y-6">
        <div className="w-full flex md:flex-row flex-col gap-5 md:*:w-1/3 *:w-full">
          <div className="w-fit space-y-1.5">
            <span className="text-xs block text-muted-foreground uppercase">Платформа</span>
            <ul>
              <li><span className="text-2xl font-medium">Проекты</span></li>
            </ul>
          </div>
          <div className="w-fit space-y-1.5">
            <span className="text-xs block text-muted-foreground uppercase">Ресуры</span>
            <ul>
              <li><span className="text-2xl font-medium">Блог</span></li>
            </ul>
          </div>
          <div className="w-fit space-y-1.5">
            <span className="text-xs block text-muted-foreground uppercase">Действия</span>
            <ul className="space-y-1.5">
              <li>
                <Button variant="secondary" className="text-2xl font-medium h-fit">Созвониться<ArrowRightIcon className="size-6" /></Button>
              </li>
              <li>
                <Button variant="outline" className="text-2xl font-medium h-fit"><SendIcon className="size-6" />Перейти в чат</Button>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full flex md:flex-row flex-col-reverse gap-5">
          <Logo size={128} type="full" />
          <div className="flex flex-col gap-3">
            <span className="text-xs text-muted-foreground">© YZ13 2025</span>
          </div>
        </div>
      </footer>
    </>
  )
}
