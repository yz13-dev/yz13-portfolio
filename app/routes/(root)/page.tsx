import Availability, { AvailabilitySkeleton } from "@/components/availability";
import DitheringBackground from "@/components/dithering-background";
import GithubContributions, { CalendarSkeleton } from "@/components/github-contributions";
import { Logo } from "@/components/logo";
import { Time, TimeOffset } from "@/components/time/time";
import User from "@/components/user";
import { available } from "@/utils/flags";
import { getV1Pricing, getV1Store } from "@yz13/api";
import type { GetV1Pricing200Item, GetV1Store200Item } from "@yz13/api/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@yz13/ui/accordion";
import { Button } from "@yz13/ui/button";
import { Separator } from "@yz13/ui/separator";
import { Skeleton } from "@yz13/ui/skeleton";
import { cn } from "@yz13/ui/utils";
import { ArrowRightIcon, ExternalLinkIcon, SendIcon } from "lucide-react";
import { lazy, Suspense } from "react";
import { Await, isRouteErrorResponse, Link, useLoaderData, useRouteError } from "react-router";
import { Brands } from "./brands";
import { Resources } from "./nav/resources";
import { PricingDetailsSkeleton } from "./pricing-details";
import { PricingDurationSkeleton } from "./pricing-duration";
import { RecentProjectsError, RecentProjectsSkeleton } from "./recent-projects";
import { Section, SectionContent, SectionTitle } from "./section";

const PricingDetails = lazy(() => import("./pricing-details"));
const PricingDuration = lazy(() => import("./pricing-duration"));

const RecentProjects = lazy(() => import("./recent-projects"));

export type Project = GetV1Store200Item
export type Pricing = GetV1Pricing200Item;

const telegram = "https://t.me/yz13_dev"
const twitter = "https://x.com/yz13_dev"
const github = "https://githib.com/yz13-dev"

export const Title = () => {
  return <h1 className="text-foreground xl:text-6xl lg:text-5xl md:text-4xl text-3xl font-semibold">YZ13 - Фронтенд который не&nbsp;подведет</h1>
}

export const Description = () => {
  return <p className="text-muted-foreground xl:text-4xl lg:text-3xl md:text-2xl text-xl font-medium">Разработаю сайт, страницы, приложение и&nbsp;компоненты разной сложности</p>
}

export const loader = async () => {
  try {
    const pricing = getV1Pricing()
    const publications = getV1Store()

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
      <DitheringBackground />
      <div className="w-full md:min-h-fit h-dvh flex flex-col justify-between *:p-6">
        <header className="w-full space-y-6">
          <Logo size={28} type="full" />
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Time className="text-2xl font-medium text-foreground" />
              <TimeOffset className="text-sm text-muted-foreground" />
            </div>
            <span className="text-2xl font-medium text-foreground">Tyumen, Russia</span>
          </div>
        </header>
        <div className="w-full space-y-8">
          <main className="w-full space-y-3 max-w-3xl *:block">
            <Title />
            <Description />
          </main>
          <div className={cn(
            "flex md:flex-row flex-col items-center gap-3",
            "*:h-12 *:!px-6 md:*:w-fit *:w-full *:text-lg *:[&>svg]:!size-5"
          )}>
            <Button variant="secondary" asChild>
              <Link to={telegram}>
                <SendIcon />
                <span className="md:hidden inline">Перейти в чат</span>
                <span className="md:inline hidden">Чат</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export function HydrateFallback() {
  return (
    <>
      <DitheringBackground />
      <div className="w-full md:min-h-fit h-dvh flex flex-col justify-between *:p-6">
        <header className="w-full space-y-6">
          <Logo size={28} type="full" />
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-medium text-foreground">00:00</span>
              <span className="text-sm text-muted-foreground">-5 UTC</span>
            </div>
            <span className="text-2xl font-medium text-foreground">Tyumen, Russia</span>
          </div>
        </header>
        <div className="w-full space-y-8">
          <AvailabilitySkeleton />
          <main className="w-full space-y-3 max-w-3xl *:block">
            <Title />
            <Description />
          </main>
          <div className={cn(
            "flex md:flex-row flex-col items-center gap-3",
            "*:h-12 *:!px-6 md:*:w-fit *:w-full *:text-lg *:[&>svg]:!size-5"
          )}>
            <Button variant="secondary" asChild>
              <Link to={telegram}>
                <SendIcon />
                <span className="md:hidden inline">Перейти в чат</span>
                <span className="md:inline hidden">Чат</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full max-w-[1600px] mt-[5%] mx-auto">

        <div className="space-y-6">
          <div className="w-full">
            <span >Последние работы</span>
          </div>
          <RecentProjectsSkeleton />
        </div>

        <Section className="space-y-6 p-6">
          <SectionContent>
            <CalendarSkeleton loading />
          </SectionContent>
        </Section>

        <div className="space-y-6">
          <div className="w-full">
            <span >Услуги и цены</span>
          </div>
          <PricingDurationSkeleton />
        </div>
        <div className="space-y-6">
          <PricingDetailsSkeleton />
        </div>

      </div>
    </>
  )
}

export default function () {
  const { publications, available, pricing } = useLoaderData<typeof loader>();

  return (
    <>
      <DitheringBackground />
      <div className="w-full max-w-[1600px] mx-auto md:min-h-fit h-dvh flex flex-col justify-between *:p-6">
        <header className="w-full space-y-6">
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-2">
              <Logo size={28} type="full" />
              {
                false &&
                <div className="px-3 flex items-center gap-2">
                  <Resources />
                  <Button variant="ghost">Услуги и цены</Button>
                </div>
              }
            </div>
            <div className="flex items-center gap-2">
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Time className="text-2xl font-medium text-foreground" />
              <TimeOffset className="text-sm text-muted-foreground" />
            </div>
            <span className="text-2xl font-medium text-foreground w-fit">Tyumen, Russia</span>
          </div>
        </header>
        <div className="w-full space-y-12">
          <Suspense fallback={<AvailabilitySkeleton />}>
            <Await resolve={available}>
              {(available) => <Availability size="lg" enabled={available} />}
            </Await>
          </Suspense>
          <main className="w-full space-y-3 max-w-3xl *:block">
            <Title />
            <Description />
          </main>
          <div className="flex lg:flex-row flex-col-reverse justify-between lg:items-center items-end w-full gap-3">
            <div className={cn(
              "flex lg:flex-row flex-col items-center gap-3 lg:w-fit w-full",
              "*:h-12 *:!px-6 lg:*:w-fit *:w-full *:text-lg *:[&>svg]:!size-5"
            )}>
              <Button variant="secondary" asChild>
                <Link to={telegram}>
                  <SendIcon />
                  <span className="md:hidden inline">Перейти в чат</span>
                  <span className="md:inline hidden">Чат</span>
                </Link>
              </Button>
              <Suspense fallback={<Skeleton className="h-9 w-32" />}>
                <Await resolve={available}>
                  {(available) => <Button disabled={!available}>Запланировать видеозвонок <ArrowRightIcon /></Button>}
                </Await>
              </Suspense>
            </div>
            <User />
          </div>
        </div>
      </div>
      <div className="w-full">
        {
          false &&
          <Brands />
        }
        {
          false &&
          <Section>
            <div className="w-full p-6 max-w-[1600px] mx-auto">
              <SectionTitle >Последние работы</SectionTitle>
            </div>
            <Suspense fallback={<RecentProjectsSkeleton />}>
              <Await
                resolve={publications}
                errorElement={<RecentProjectsError />}
              >
                {
                  (projects) =>
                    <RecentProjects projects={projects} />
                }
              </Await>
            </Suspense>
          </Section>
        }
        <Separator className="w-full" />
        <Section className="space-y-6 p-6 max-w-[1600px] border-x mx-auto">
          <SectionContent>
            <GithubContributions username="yz13-dev" />
          </SectionContent>
        </Section>
        <div className="w-full">
          <Suspense fallback={
            <>
              <Separator className="w-full" />
              <Section className="space-y-6 p-6 max-w-[1600px] border-x mx-auto">
                <div className="w-full">
                  <SectionTitle >Услуги и цены</SectionTitle>
                </div>
                <PricingDurationSkeleton />
              </Section>
              <Separator className="w-full" />
              <Section className="space-y-6 p-6 max-w-[1600px] border-x mx-auto">
                <PricingDetailsSkeleton />
              </Section>
            </>
          }>
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
                    <>
                      <Separator className="w-full" />
                      <Section className="p-6 max-w-[1600px] mx-auto border-x space-y-6">
                        <div className="w-full">
                          <SectionTitle >Услуги и цены</SectionTitle>
                        </div>
                        <PricingDuration pricing={sorted} />
                      </Section>
                      <Separator className="w-full" />
                      <Section className="max-w-[1600px] mx-auto">
                        <PricingDetails pricing={sorted} />
                      </Section>
                    </>
                  )
                }
              }
            </Await>
          </Suspense>
          <Separator className="w-full" />
          <Section className="flex lg:flex-row flex-col border-x max-w-[1600px] mx-auto gap-4">
            <div className="lg:w-1/3 w-full p-6">
              <SectionTitle>Вопросы и ответы</SectionTitle>
            </div>
            <SectionContent className="lg:w-2/3 w-full border-l py-12">
              <Accordion
                type="multiple"
                className="border-y"
              >
                <AccordionItem value="q-1" className="*:px-5 *:text-base">
                  <AccordionTrigger className="text-base data-[state=open]:text-muted-foreground">
                    Как быстро начнется разработка?
                  </AccordionTrigger>
                  <AccordionContent>
                    После определения задач разработки (1-2 созвона), работа обычно начнется на следующий день. Кроме выходных дней.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q-2" className="*:px-5 *:text-base">
                  <AccordionTrigger className="text-base data-[state=open]:text-muted-foreground">
                    Есть ли лимит к поправкам?
                  </AccordionTrigger>
                  <AccordionContent>
                    К небольшим поправкам - нет. К большим поправкам - да. В ценниках указана сумма за большие поправки. Небольшие идут бесплатно.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q-3" className="*:px-5 *:text-base">
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
        </div>
        <Separator className="w-full" />
        <div className="w-full">
          <footer className={cn(
            "flex md:flex-row flex-col-reverse w-full h-git",
            "*:p-6 *:gap-6 md:divide-x divide-x-0 max-w-[1600px] mx-auto border-x"
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
            <Separator className="md:hidden !p-0 block" />
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
        </div>
        <Separator className="w-full" />
        <div className="flex p-6 items-center justify-between max-w-[1600px] border-x mx-auto">
          <span className="text-xs text-muted-foreground">YZ13 2025</span>
          <span className="text-xs text-muted-foreground">Фронтенд разработчик</span>
        </div>
      </div>
    </>
  )
}
