import DitheringBackground from "@/components/dithering-background";
import { Logo } from "@/components/logo";
import { Badge } from "@yz13/ui/badge";
import { Button } from "@yz13/ui/button";
import { Input } from "@yz13/ui/input";
import { Link } from "react-router";


export default function Page() {
  return (
    <div className="w-full h-dvh relative flex flex-col items-center justify-center">
      <DitheringBackground />
      <div className="max-w-3xl w-full h-fit border bg-background flex md:flex-row flex-col rounded-4xl">
        <div className="md:w-1/2 w-full md:h-full h-1/2 pt-20 relative">
          <Logo size={48} type="icon" className="size-12 absolute top-6 left-6" />
          <div className="px-6 pb-6 h-full space-y-2">
            <h1 className="text-3xl font-semibold block">Регистрация</h1>
            <p className="text-lg block text-muted-foreground">
              Вам понадобится только почта.
            </p>
          </div>
        </div>
        <div className="md:w-1/2 w-full md:h-full h-1/2 pt-20 relative">
          <div className="px-6 pb-6 h-full gap-4 flex flex-col justify-between">
            <Input placeholder="yz13@yz13.ru" className="h-10 text-base" />
            <div className="w-full">
              <span className="text-muted-foreground text-sm">
                После регистрации вы получите доступ к <Link to="/apps" className="font-medium text-foreground hover:underline">сервисам</Link> <Badge variant="secondary">YZ13</Badge>
              </span>
            </div>
            <div className="flex items-center justify-end gap-3">
              <Button variant="ghost" asChild>
                <Link to="/auth/signin">
                  Уже есть аккаунт?
                </Link>
              </Button>
              <Button>Продолжить</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
