import Availability, { AvailabilitySkeleton } from "@/components/availability";
import DitheringBackground from "@/components/dithering-background";
import { Logo } from "@/components/logo";
import { Time, TimeOffset } from "@/components/time/time";
import User from "@/components/user";
import { available } from "@/utils/flags";
import type { GetPricingV1200Item, GetStoreV1200Item } from "@yz13/api/types";
import { Button } from "@yz13/ui/button";
import { Skeleton } from "@yz13/ui/skeleton";
import { ArrowRightIcon, SendIcon } from "lucide-react";
import { lazy, Suspense } from "react";
import { Await, isRouteErrorResponse, Link, useLoaderData, useRouteError } from "react-router";

const Pricing = lazy(() => import("./pricing"));

export type Project = GetStoreV1200Item;
export type Pricing = GetPricingV1200Item;

const telegram = "https://t.me/yz13_dev"
const twitter = "https://x.com/yz13_dev"
const github = "https://githib.com/yz13-dev"

export const Title = () => {
  return <h1 className="text-foreground text-4xl font-semibold">YZ13 - Фронтенд который не&nbsp;подведет</h1>
}

export const Description = () => {
  return <p className="text-muted-foreground text-xl font-medium">Разработаю сайт, страницы, приложение и&nbsp;компоненты разной сложности</p>
}

export const loader = async () => {
  try {
    // const pricing = getPricingV1()
    // const publications = getStoreV1()

    const isAvailable = available();

    return { available: isAvailable }
    // return { publications, available: isAvailable, pricing }
  } catch (error) {
    console.error(error)
    return {
      publications: [],
      available: false,
      pricing: []
    }
  }
}

export function ErrorBoundary() {
  const error = useRouteError();

  const errorTitle = error instanceof Error ? error.message : isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : "Unknown Error";

  const errorDescription = error instanceof Error ? error.stack : isRouteErrorResponse(error) ? error.data : undefined;

  return (
    <>
      <DitheringBackground withGradientOverylay={false} className="opacity-20" />
      <div className="w-full h-dvh mx-auto flex flex-col p-4 justify-end">
        <div className="w-full max-w-lg border-2 h-fit mx-auto p-6 space-y-6 rounded-4xl bg-gradient-to-b  from-background/80 to-background backdrop-blur-md">
          <header className="flex w-full mx-auto items-center justify-between">
            <div className="w-fit flex flex-row items-center gap-4">
              <Logo size={40} type="full" />
              <div className="flex flex-col gap-0">
                <Time className="text-lg font-medium text-foreground" />
                <TimeOffset className="text-xs text-muted-foreground" />
              </div>
            </div>
            <User />
          </header>
          <div className="w-full space-y-4 *:block">
            <Title />
            <Description />
          </div>
          <div className="w-full flex flex-col *:w-full gap-3">
            <Button className="h-12 text-lg w-fit [&>svg]:!size-5" size="lg" disabled>
              <SendIcon />
              <span>Открыть чат</span>
            </Button>
            <Skeleton className="h-12 w-32" />
          </div>
        </div>
      </div>
    </>
  )
}

export function HydrateFallback() {
  return (
    <>
      <DitheringBackground withGradientOverylay={false} className="opacity-20" />
      <div className="w-full h-dvh mx-auto flex flex-col p-4 justify-end">
        <div className="w-full max-w-lg border-2 h-fit mx-auto p-6 space-y-6 rounded-4xl bg-gradient-to-b  from-background/80 to-background backdrop-blur-md">
          <header className="flex w-full mx-auto items-center justify-between">
            <div className="w-fit flex flex-row items-center gap-4">
              <Logo size={40} type="full" />
              <div className="flex flex-col gap-0">
                <Time className="text-lg font-medium text-foreground" />
                <TimeOffset className="text-xs text-muted-foreground" />
              </div>
            </div>
            <User />
          </header>
          <div className="w-full space-y-4 *:block">
            <Title />
            <Description />
          </div>
          <div className="w-full flex flex-col *:w-full gap-3">
            <Button className="h-12 text-lg w-fit [&>svg]:!size-5" size="lg" asChild>
              <Link to={telegram} target="_blank">
                <SendIcon />
                <span>Открыть чат</span>
              </Link>
            </Button>
            <Skeleton className="h-12 w-32" />
          </div>
        </div>
      </div>
    </>
  )
}

export default function () {
  const { available } = useLoaderData<typeof loader>();

  return (
    <>
      <DitheringBackground withGradientOverylay={false} className="opacity-20" />
      <div className="w-full h-dvh mx-auto flex flex-col p-4 justify-end">
        <div className="w-full max-w-lg border-2 h-fit mx-auto p-6 space-y-6 rounded-4xl bg-gradient-to-b  from-background/80 to-background backdrop-blur-md">
          <header className="flex w-full mx-auto items-center justify-between">
            <div className="w-fit flex flex-row items-center gap-4">
              <Logo size={40} type="full" />
              <div className="flex flex-col gap-0">
                <Time className="text-lg font-medium text-foreground" />
                <TimeOffset className="text-xs text-muted-foreground" />
              </div>
            </div>
            <User />
          </header>
          <div className="w-full space-y-4 *:block">
            <Title />
            <Description />
          </div>
          <Suspense fallback={<AvailabilitySkeleton className="!h-12" />}>
            <Await resolve={available}>
              {(available) => <Availability enabled={available} className="h-12 justify-center rounded-lg text-lg w-fit [&>svg]:!size-5" size="lg" />}
            </Await>
          </Suspense>
          <div className="w-full flex flex-col *:w-full gap-3">
            <Button className="h-12 text-lg w-fit [&>svg]:!size-5" size="lg" asChild>
              <Link to={telegram} target="_blank">
                <SendIcon />
                <span>Открыть чат</span>
              </Link>
            </Button>
            <Suspense fallback={<Skeleton className="h-12 w-32" />}>
              <Await resolve={available}>
                {(available) => <Button disabled={!available} className="h-12 text-lg w-fit [&>svg]:!size-5" variant="secondary" size="lg">
                  <span className="sm:inline hidden">Запланировать видеозвонок</span>
                  <span className="sm:hidden inline">Видеозвонок</span>
                  <ArrowRightIcon />
                </Button>}
              </Await>
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}
