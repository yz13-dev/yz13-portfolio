import Availability, { AvailabilitySkeleton } from "@/components/availability";
import CallToAction from "@/components/call-to-action";
import DitheringBackground from "@/components/dithering-background";
import { InfoListSkeleton } from "@/components/info-list";
import { Logo } from "@/components/logo";
import Projects, { ProjectsSkeleton } from "@/components/projects";
import Modal from "@/components/settings/modal";
import { availableForWork, getInfoList, showCommand, showSettings } from "@/flags/flags";
import useIsMac from "@/hooks/use-is-mac";
import { getV1Store } from "@yz13/api";
import { Button } from "@yz13/ui/button";
import { Separator } from "@yz13/ui/separator";
import { Skeleton } from "@yz13/ui/skeleton";
import { cn } from "@yz13/ui/utils";
import { ChevronDownIcon, SearchIcon, SettingsIcon } from "lucide-react";
import { motion } from "motion/react";
import { isRouteErrorResponse, Link, useLoaderData, useRouteError } from "react-router";

export const loader = async () => {

  const projects = await getV1Store()

  const [available, list, settings, command] = await Promise.all([availableForWork(), getInfoList(), showSettings(), showCommand()])

  return {
    command,
    projects,
    available,
    list,
    settings
  }
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

  const { available, projects, settings, command } = useLoaderData<typeof loader>();


  const isMac = useIsMac()

  return (
    <>
      <DitheringBackground className="fixed" />
      <div className="w-full h-dvh flex flex-col items-center justify-center">

        <motion.main
          transition={{ duration: 0.2 }}
          className="w-full gap-4 flex flex-col justify-between p-4 md:max-w-md max-w-full md:h-fit h-dvh"
        >
          <div className="space-y-4 py-8 px-4">
            <div className="flex items-center gap-2 justify-between w-full">
              <div className="flex items-center gap-2">
                <Logo size={48} type="icon" />
                <h1 className="text-4xl font-pixel font-medium">YZ13</h1>
              </div>
              <div className="flex items-center gap-2">
                {
                  command &&
                  <Button variant="secondary">
                    <SearchIcon />
                    <span className="text-sm font-mono">
                      <kbd>{isMac ? "Cmd + K" : "Ctrl + K"}</kbd>
                    </span>
                  </Button>
                }
                {
                  settings &&
                  <Modal>
                    <Button variant="secondary" size="icon"><SettingsIcon /></Button>
                  </Modal>
                }
                {
                  false &&
                  <Button variant="secondary" size="icon">
                    <ChevronDownIcon />
                  </Button>
                }
              </div>
            </div>

            <div>
              <p className="block text-muted-foreground">Фронтенд разработчик, специализируюсь на&nbsp;разработке сайтов, веб-приложений.</p>
            </div>

            <Projects projects={projects} />

          </div>

          <div className="w-full !mt-auto space-y-4 bg-card/40 rounded-4xl p-4">
            <div className="w-full max-w-xs">
              <Availability className="bg-transparent !px-0 !py-0 border-0" size="sm" enabled={available} />
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
              "flex gap-4 items-center flex-col",
              "*:w-full *:h-12 *:text-base [&>svg]:!size-[18]"
            )}>
              <CallToAction enabled={available} />
            </div>
          </div>
        </motion.main>

      </div>
    </>
  )
}
