import Availability, { AvailabilitySkeleton } from "@/components/availability";
import DitheringBackground from "@/components/dithering-background";
import GithubContributions from "@/components/github-contributions";
import { Logo } from "@/components/logo";
import { Time, TimeOffset } from "@/components/time/time";
import User from "@/components/user";
import { available } from "@/utils/flags";
import { getPricingV1, getStoreV1 } from "@yz13/api";
import type { GetPricingV1200Item, GetStoreV1200Item } from "@yz13/api/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@yz13/ui/accordion";
import { SlidingNumber } from "@yz13/ui/animated/sliding-number";
import { Button } from "@yz13/ui/button";
import { Skeleton } from "@yz13/ui/skeleton";
import { cn } from "@yz13/ui/utils";
import { ArrowRightIcon, ExternalLinkIcon } from "lucide-react";
import { lazy, Suspense } from "react";
import { Await, isRouteErrorResponse, Link, useLoaderData, useRouteError } from "react-router";
import RecentProjects, { RecentProjectsSkeleton } from "./recent-projects";
import { Section, SectionContent, SectionTitle } from "./section";

const PricingDetails = lazy(() => import("./pricing-details"));
const PricingDuration = lazy(() => import("./pricing-duration"));

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
    const pricing = getPricingV1()
    const publications = getStoreV1()

    const isAvailable = available();

    return { publications, available: isAvailable, pricing }
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
      <header className="p-6 flex max-w-4xl mx-auto items-center justify-between">
        <div className="w-fit flex flex-row items-center gap-4">
          <Logo size={40} type="full" />
          <div className="flex flex-col gap-0">
            <Time className="text-lg font-medium text-foreground" />
            <TimeOffset className="text-xs text-muted-foreground" />
          </div>
        </div>
        <User />
      </header>
      <div className="w-full max-w-4xl mx-auto flex lg:flex-row flex-col-reverse lg:*:w-1/2 *:w-full">
        <main className="space-y-6 max-w-4xl mx-auto p-6">
          <div className="w-full space-y-4 *:block">
            <Title />
            <Description />
          </div>
          <div className="w-full flex flex-col lg:*:w-fit *:w-full gap-3 *:h-10">
            <Skeleton className="h-9 w-32" />
            <AvailabilitySkeleton />
          </div>
        </main>
        <div className="w-full lg:aspect-[9/12] aspect-[9/10] relative">
          <DitheringBackground withGradientOverylay={false} className="h-full" />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 px-6 *:w-full py-16 gap-6 max-w-4xl mx-auto">
        <RecentProjectsSkeleton />
      </div>
      <div className="w-full [&>section]:!py-16">
        <Section className="space-y-6 p-6 max-w-4xl mx-auto">
          <SectionContent>
            <GithubContributions username="yz13-dev" loading />
          </SectionContent>
        </Section>
      </div>
    </>
  )
}

export function HydrateFallback() {
  return (
    <>
      <header className="p-6 flex max-w-4xl mx-auto items-center justify-between">
        <div className="w-fit flex flex-row items-center gap-4">
          <Logo size={40} type="full" />
          <div className="flex flex-col gap-0">
            <Time className="text-lg font-medium text-foreground" />
            <TimeOffset className="text-xs text-muted-foreground" />
          </div>
        </div>
        <User />
      </header>
      <div className="w-full max-w-4xl mx-auto flex lg:flex-row flex-col-reverse lg:*:w-1/2 *:w-full">
        <main className="space-y-6 max-w-4xl mx-auto p-6">
          <div className="w-full space-y-4 *:block">
            <Title />
            <Description />
          </div>
          <div className="w-full flex flex-col lg:*:w-fit *:w-full gap-3 *:h-10">
            <Skeleton className="h-9 w-32" />
            <AvailabilitySkeleton />
          </div>
        </main>
        <div className="w-full lg:aspect-[9/12] aspect-[9/10] relative">
          <DitheringBackground withGradientOverylay={false} className="h-full" />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 px-6 *:w-full py-16 gap-6 max-w-4xl mx-auto">
        <RecentProjectsSkeleton />
      </div>
      <div className="w-full [&>section]:!py-16">
        <Section className="space-y-6 p-6 max-w-4xl mx-auto">
          <SectionContent>
            <GithubContributions username="yz13-dev" loading />
          </SectionContent>
        </Section>
      </div>
    </>
  )
}

export default function () {
  const { publications, available, pricing } = useLoaderData<typeof loader>();

  return (
    <>
      <header className="p-6 flex max-w-4xl mx-auto items-center justify-between">
        <div className="w-fit flex flex-row items-center gap-4">
          <Logo size={40} type="full" />
          <div className="flex flex-col gap-0">
            <Time className="text-lg font-medium text-foreground" />
            <TimeOffset className="text-xs text-muted-foreground" />
          </div>
        </div>
        <User />
      </header>
      <div className="w-full max-w-4xl mx-auto flex flex-col *:w-full">
        <div className="px-6 w-full">
          <div className="w-full aspect-video relative">
            <DitheringBackground withGradientOverylay={false} className="h-full" />
          </div>
        </div>
        <main className="space-y-6 max-w-4xl mx-auto p-6">
          <div className="w-full space-y-4 *:block">
            <Title />
            <Description />
          </div>
          <div className="w-full flex flex-col lg:*:w-fit *:w-full gap-3 *:h-10">
            <Suspense fallback={<Skeleton className="h-9 w-32" />}>
              <Await resolve={available}>
                {(available) => <Button disabled={!available}>
                  <span className="sm:inline hidden">Запланировать видеозвонок</span>
                  <span className="sm:hidden inline">Видеозвонок</span>
                  <ArrowRightIcon />
                </Button>}
              </Await>
            </Suspense>
            <Suspense fallback={<AvailabilitySkeleton />}>
              <Await resolve={available}>
                {(available) => <Availability size="default" enabled={available} className="justify-center" />}
              </Await>
            </Suspense>
          </div>
        </main>
      </div>
      <Section className="space-y-6 px-6 py-16 max-w-4xl mx-auto">
        <SectionContent>
          <GithubContributions username="yz13-dev" />
        </SectionContent>
      </Section>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 px-6 *:w-full py-16 gap-6 max-w-7xl mx-auto">
        <Suspense
          fallback={<RecentProjectsSkeleton />}>
          <Await
            resolve={publications}
            errorElement={null}
          >
            {
              (publications) => {
                return <RecentProjects projects={publications} />
              }
            }
          </Await>
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <Await
          resolve={pricing}
        >
          {
            (pricing) => {
              const sorted = pricing.sort((a, b) => {
                const aDuration = a.duration.reduce((prev, current) => prev + current, 0)
                const bDuration = b.duration.reduce((prev, current) => prev + current, 0)
                const aPricing = a.price;
                const bPricing = b.price;
                if (aDuration === bDuration) return aPricing - bPricing;
                return aDuration - bDuration
              })
              return (
                <Section className="px-6 py-16 max-w-4xl mx-auto space-y-6">
                  <PricingDuration pricing={sorted} />
                </Section>
              )
            }
          }
        </Await>
      </Suspense>
      <Section className="flex flex-col *:px-6 py-16 max-w-4xl mx-auto gap-4">
        <div className="w-full">
          <SectionTitle>Вопросы и ответы</SectionTitle>
        </div>
        <SectionContent className="w-full">
          <Accordion
            type="multiple"
          >
            <AccordionItem value="q-1" className="*:text-base group">
              <AccordionTrigger className="text-base data-[state=open]:text-muted-foreground">
                <span>Как быстро начнется разработка?</span>
              </AccordionTrigger>
              <AccordionContent>
                После определения задач разработки (1-2 созвона), работа обычно начнется на следующий день. Кроме выходных дней.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q-2" className="*:text-base group">
              <AccordionTrigger className="text-base data-[state=open]:text-muted-foreground">
                Есть ли лимит к поправкам?
              </AccordionTrigger>
              <AccordionContent>
                К небольшим поправкам - нет. К большим поправкам - да. В ценниках указана сумма за большие поправки. Небольшие идут бесплатно.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q-3" className="*:text-base group">
              <AccordionTrigger className="text-base data-[state=open]:text-muted-foreground">
                Что я получу в конце разработки?
              </AccordionTrigger>
              <AccordionContent>
                В конце разработки вы получаете свой проект на GitHub и получаете доступ к базе данных и функционалу сайта.
                Если вы заказали NPM-пакет, то вы получите доступ к нему и сможете установить его в своем проекте. При необходимости можно запросить архив вместо github репозитория.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SectionContent>
      </Section>
      <footer className={cn(
        "flex md:flex-row flex-col-reverse w-full h-git",
        "*:p-6 *:gap-6 max-w-4xl mx-auto py-16"
      )}>
        <div className="flex flex-col">
          <div className="w-full flex flex-col gap-3">
            <Logo size={48} />
            <div className="*:block space-y-1">
              <span className="text-base text-foreground font-semibold">
                YZ13 - Фронтенд который не&nbsp;подведет
              </span>
              <span className="text-sm text-muted-foreground">
                Разработаю сайт, страницы, приложение и&nbsp;компоненты разной сложности
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col *:w-full gap-3 *:h-10">
            <Suspense fallback={<Skeleton className="h-9 w-32" />}>
              <Await resolve={available}>
                {(available) => <Button disabled={!available}>
                  <span className="sm:inline hidden">Запланировать видеозвонок</span>
                  <span className="sm:hidden inline">Видеозвонок</span>
                  <ArrowRightIcon />
                </Button>}
              </Await>
            </Suspense>
            <Suspense fallback={<AvailabilitySkeleton />}>
              <Await resolve={available}>
                {(available) => <Availability size="default" animated={false} enabled={available} className="justify-center" />}
              </Await>
            </Suspense>
          </div>
        </div>
        <div className="w-full h-fit flex sm:flex-row flex-col md:*:w-1/2 *:w-full">
          <div className="w-1/3 flex flex-col gap-3">
            <span>Ссылки</span>
            <ul className="*:text-muted-foreground">
              <li className="flex items-center gap-2 h-9">
                <Link
                  to={telegram}
                  className="text-sm inline-flex items-center gap-1.5 hover:underline hover:text-foreground"
                >
                  Telegram
                  <ExternalLinkIcon size={12} />
                </Link>
              </li>
              <li className="flex items-center gap-2 h-9">
                <Link
                  to={twitter}
                  className="text-sm inline-flex items-center gap-1.5 hover:underline hover:text-foreground"
                >
                  X/Twitter
                  <ExternalLinkIcon size={12} />
                </Link>
              </li>
              <li className="flex items-center gap-2 h-9">
                <Link
                  to={github}
                  className="text-sm inline-flex items-center gap-1.5 hover:underline hover:text-foreground"
                >
                  Github
                  <ExternalLinkIcon size={12} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="flex p-6 items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">YZ13</span>
          <SlidingNumber number={(new Date).getFullYear()} className="text-xs text-muted-foreground" />
        </div>
        <span className="text-xs text-muted-foreground">Фронтенд разработчик</span>
      </div>
    </>
  )
}
