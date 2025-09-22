import { Logo } from "@/components/logo";
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
      <main className="w-full h-dvh"></main>
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
