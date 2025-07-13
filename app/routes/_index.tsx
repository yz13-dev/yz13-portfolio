import Availability, { AvailabilitySkeleton } from "@/components/availability";
import Background from "@/components/background";
import CallToAction from "@/components/call-to-action";
import InfoList, { InfoListSkeleton } from "@/components/info-list";
import { Logo } from "@/components/logo";
import Projects, { ProjectsSkeleton } from "@/components/projects";
import Modal from "@/components/settings/modal";
import { availableForWork, getInfoList, showSettings } from "@/flags/flags";
import { isRouteErrorResponse, Link, useLoaderData, useRouteError } from "@remix-run/react";
import { getV1Store } from "@yz13/api";
import { Button } from "@yz13/ui/button";
import { Separator } from "@yz13/ui/separator";
import { Skeleton } from "@yz13/ui/skeleton";
import { cn } from "@yz13/ui/utils";
import { SettingsIcon } from "lucide-react";
import { Suspense } from "react";

export const loader = async () => {

  const projects = await getV1Store()

  const available = await availableForWork()
  const list = await getInfoList()
  const settings = await showSettings()

  return {
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
      <Background />
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

  const { available, list, projects, settings } = useLoaderData<typeof loader>();

  return (
    <>
      <Background />
      <main className="flex flex-col h-dvh max-w-md mx-auto *:max-w-sm p-8 gap-[32px] justify-center items-center sm:items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-2 justify-between w-full">
            <div className="flex items-center gap-2">
              <Logo size={48} type="icon" />
              <h1 className="text-4xl font-pixel font-medium">YZ13</h1>
            </div>
            {
              settings &&
              <Modal>
                <Button variant="secondary" size="icon"><SettingsIcon /></Button>
              </Modal>
            }
          </div>

          <p className="block text-muted-foreground">Фронтенд разработчик, специализируюсь на&nbsp;разработке сайтов, веб-приложений.</p>
        </div>

        <div className="space-y-6 w-full">
          {
            list.length !== 0 &&
            <section>
              <Suspense fallback={<InfoListSkeleton />}>
                <InfoList list={list} />
              </Suspense>
            </section>
          }

          <Separator />

          <section className="space-y-3">
            <span className="block text-muted-foreground font-medium">Проекты</span>
            <Suspense fallback={<ProjectsSkeleton />}>
              <Projects projects={projects} />
            </Suspense>
          </section>
        </div>

        <div className="w-full space-y-4 sm:mt-0 mt-auto">
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
            "flex gap-4 items-center flex-col sm:*:w-fit *:w-full sm:flex-row w-full",
            "sm:*:h-10 *:h-12 sm:*:text-sm *:text-base sm:*:[&>svg]:!size-4 *:[&>svg]:!size-[18]"
          )}>
            <CallToAction enabled={available} />
          </div>
        </div>
      </main>
    </>
  );
}
