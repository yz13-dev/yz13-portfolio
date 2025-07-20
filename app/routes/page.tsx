import { AvailabilitySkeleton } from "@/components/availability";
import DitheringBackground from "@/components/dithering-background";
import InfiniteCanvas from "@/components/infinite-canvas/canvas";
import { InfoListSkeleton } from "@/components/info-list";
import { Logo } from "@/components/logo";
import { ProjectsSkeleton } from "@/components/projects";
import { Button } from "@yz13/ui/button";
import { Separator } from "@yz13/ui/separator";
import { Skeleton } from "@yz13/ui/skeleton";
import { cn } from "@yz13/ui/utils";
import { PhoneCallIcon, SendIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router";

export const loader = async () => {

  // const projects = await getV1Store()

  // const [available, list, settings, command] = await Promise.all([availableForWork(), getInfoList(), showSettings(), showCommand()])

  // return {
  //   command,
  //   projects,
  //   available,
  //   list,
  //   settings
  // }
}

export const HydrateFallback = () => {
  return (
    <main className="flex flex-col h-dvh max-w-md mx-auto *:max-w-sm p-8 gap-[32px] justify-center items-center sm:items-start">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Logo size={48} type="icon" />
          <h1 className="text-4xl font-pixel font-medium">YZ13</h1>
        </div>

        <p className="block text-muted-foreground">Фронтенд разработчик, специализируюсь на&nbsp;разработке сайтов, веб-приложений.</p>
      </div>

      <div className="space-y-6 w-full">
        <section>
          <InfoListSkeleton />
        </section>

        <Separator />

        <section className="space-y-3">
          <span className="block text-muted-foreground font-medium">Проекты</span>
          <ProjectsSkeleton />
        </section>
      </div>

      <div className="w-full space-y-4 sm:mt-0 mt-auto">
        <div className="w-full max-w-xs">
          <AvailabilitySkeleton size="sm" />
          <div className="w-full">
            <span className="text-muted-foreground text-center text-xs">
              По вопросам и/или предложениям пишите:
            </span>
            <div className="flex items-center gap-1.5 text-xs">
              <Link to="mailto:yz13.dev@gmail.com" className="font-medium text-foreground hover:underline">yz13.dev@gmail.com</Link>
              <span className="text-muted-foreground">или</span>
              <Link to="mailto:yztheceo@yandex.ru" className="font-medium text-foreground hover:underline">yztheceo@yandex.ru</Link>
            </div>
          </div>
        </div>

        <div className={cn(
          "flex gap-4 items-center flex-col sm:*:w-fit *:w-full sm:flex-row w-full",
          "sm:*:h-10 *:h-12 sm:*:text-sm *:text-base sm:*:[&>svg]:!size-4 *:[&>svg]:!size-[18]"
        )}>
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    </main>
  )
}

export function ErrorBoundary() {
  const error = useRouteError();

  const title = error instanceof Error ? error.message : isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : "Unknown Error";

  const description = error instanceof Error ? error.stack : isRouteErrorResponse(error) ? error.data : undefined;

  return (
    <>
      <DitheringBackground />
      <main className="flex flex-col h-dvh max-w-md mx-auto *:max-w-sm p-8 gap-[32px] justify-center items-center sm:items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Logo size={48} type="icon" />
            <h1 className="text-4xl font-pixel font-medium">YZ13</h1>
          </div>
        </div>

        <div className="w-full *:block space-y-2">
          <span className="text-muted-foreground">Произошла ошибка при загрузке страницы</span>
          <span className="text-foreground">{title}</span>
          {
            description &&
            <pre className="w-full overflow-auto min-h-96">
              {description}
            </pre>
          }
        </div>

        <div className="w-full">
          <span className="text-muted-foreground text-center text-xs">
            По вопросам и/или предложениям пишите:
          </span>
          <div className="flex items-center gap-1.5 text-xs">
            <Link to="mailto:yz13.dev@gmail.com" className="font-medium text-foreground hover:underline">yz13.dev@gmail.com</Link>
            <span className="text-muted-foreground">или</span>
            <Link to="mailto:yztheceo@yandex.ru" className="font-medium text-foreground hover:underline">yztheceo@yandex.ru</Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default function () {

  // const { available, projects, settings, command } = useLoaderData<typeof loader>();

  const [ready, setReady] = useState<boolean>(false)

  useEffect(() => {
    setReady(true)
  }, [])

  if (!ready) return null;
  return (
    <div className="w-full h-dvh overflow-hidden">
      <div className="absolute top-6 left-6 z-10">
        <Logo size={48} type="icon" />
      </div>
      <InfiniteCanvas />
      <footer className="fixed w-fit bottom-4 left-0 right-0 mx-auto gap-2 z-10">
        <div className="flex items-center gap-2 border rounded-xl bg-card/40 backdrop-blur-md h-14 w-fit px-2">
          <Button variant="secondary"><PhoneCallIcon />Запланировать видеозвонок</Button>
          <div className="flex items-center gap-2">
            <Button variant="secondary"><SendIcon /></Button>
            <Button>Войти</Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
