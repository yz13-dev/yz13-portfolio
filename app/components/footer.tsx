import { call, telegram } from "@/const/socials";
import useAvailable from "@/hooks/use-available";
import { Button } from "@yz13/ui/button";
import { cn } from "@yz13/ui/utils";
import { ArrowRightIcon, SendIcon } from "lucide-react";
import { ComponentProps } from "react";
import { Link } from "react-router";
import LogoSvg from "./logo-svg";

type Props = ComponentProps<"footer">;
export default function ({ className = "", ...props }: Props) {

  const [available] = useAvailable()

  return (
    <footer className={cn(
      "w-full space-y-6",
      className
    )}>
      <div className="w-full flex lg:flex-row flex-col gap-5 lg:*:w-1/3 *:w-full">
        <div className="w-fit space-y-1.5">
          <span className="text-xs block text-muted-foreground uppercase">Платформа</span>
          <ul>
            <li>
              <Link
                to="/apps"
                className="text-2xl inline-flex items-center gap-1.5 font-medium hover:underline"
              >
                Проекты
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-fit space-y-1.5">
          <span className="text-xs block text-muted-foreground uppercase">Ресуры</span>
          <ul>
            <li>
              <Link to="/blog" className="text-2xl inline-flex items-center gap-1.5 font-medium hover:underline">Блог</Link>
            </li>
            <li>
              <span className="text-2xl text-muted-foreground font-medium">Шаблоны</span>
            </li>
          </ul>
        </div>
        <div className="w-fit space-y-1.5">
          <span className="text-xs block text-muted-foreground uppercase">Действия</span>
          <ul className="space-y-1.5 w-full">
            <li>
              {
                available
                  ?
                  <Button asChild size="lg" variant="secondary" className="xl:text-2xl text-lg font-medium py-2 h-fit">
                    <Link to={call} target="_blank">
                      <span>Видеозвонок</span><ArrowRightIcon className="xl:size-6 size-5" />
                    </Link>
                  </Button>
                  :
                  <Button disabled={!available} size="lg" variant="secondary" className="xl:text-2xl text-lg font-medium py-2 h-fit">
                    <span>Видеозвонок</span><ArrowRightIcon className="xl:size-6 size-5" />
                  </Button>
              }
            </li>
            <li>
              <Button size="lg" variant="outline" className="xl:text-2xl text-lg font-medium py-2 h-fit" asChild>
                <Link to={telegram} target="_blank">
                  <SendIcon className="xl:size-6 size-5" /><span>Перейти в чат</span>
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full flex lg:flex-row flex-col-reverse gap-5">
        <LogoSvg className="w-full opacity-10 hover:opacity-100 transition-opacity" />
      </div>
    </footer>
  )
}
