import Availability, { AvailabilitySkeleton } from "@/components/availability";
import { Logo } from "@/components/logo";
import { ProjectLogo } from "@/components/projects";
import { Time, TimeOffset } from "@/components/time/time";
import { chunk } from "@/utils/chunk";
import { available } from "@/utils/flags";
import { formatDuration } from "@/utils/pricing-durations";
import { getV1Pricing, getV1Store } from "@yz13/api";
import { Badge } from "@yz13/ui/badge";
import { Button } from "@yz13/ui/button";
import { Separator } from "@yz13/ui/separator";
import { cn } from "@yz13/ui/utils";
import { ArrowDownIcon, ArrowRightIcon, CheckIcon, ChevronRightIcon, ExternalLinkIcon, PlusIcon, SendIcon } from "lucide-react";
import { Fragment } from "react";
import { Link, useLoaderData } from "react-router";

const telegram = "https://t.me/yz13_dev"
const twitter = "https://x.com/yz13_dev"
const github = "https://githib.com/yz13-dev"

const title = "YZ13 - Фронтенд который не подведет";
const description = "Разработаю сайт, страницы, приложение и компоненты разной сложности";

// Создаем массив брендов для бесконечной прокрутки
const brands = [
  { type: 'square', id: 1 },
  { type: 'video', id: 2 },
  { type: 'square', id: 3 },
  { type: 'square', id: 4 },
  { type: 'video', id: 5 },
  { type: 'square', id: 6 },
  { type: 'square', id: 7 },
  { type: 'video', id: 8 },
  { type: 'square', id: 9 },
  { type: 'square', id: 10 },
  { type: 'video', id: 11 },
  { type: 'square', id: 12 },
  { type: 'square', id: 13 },
  { type: 'video', id: 14 },
  { type: 'square', id: 15 },
]

export const loader = async () => {
  try {
    const [pricing, publications] = await Promise.all([getV1Pricing(), getV1Store()]);

    const isAvailable = await available();

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

export const HydrateFallback = () => {
  return (
    <div className="w-full h-dvh flex md:flex-row flex-col overflow-y-auto">
      <div className="md:w-1/2 w-full md:min-h-fit min-h-dvh md:h-full h-fit flex flex-col justify-between *:p-6 md:sticky static top-0">
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
          <div className="w-full space-y-2 *:block">
            <h1 className="text-foreground md:text-4xl text-3xl font-semibold">{title}</h1>
            <p className="text-muted-foreground md:text-2xl text-xl font-medium">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary"><SendIcon />Чат</Button>
            <Button>Запланировать видеозвонок <ArrowRightIcon /></Button>
          </div>
          <div className="w-full space-y-3">
            <span className="text-muted-foreground text-sm block">Бренды, доверившиеся мне</span>
            <div className="w-full h-16 overflow-hidden infinite-scroll-container">
              <div className="h-full flex w-max items-center gap-3 infinite-scroll-track">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 w-full md:h-full h-fit *:p-6">

      </div>
    </div>
  )
}

export default function () {
  const { publications, available, pricing } = useLoaderData<typeof loader>();
  const attachments = publications
    .filter(pub => !!pub.attachments.length)
    .map(pub => ({
      id: pub.id,
      title: pub.name,
      description: pub.description,
      attachments: pub.attachments
    }))
  const projects = publications
    .filter(pub => !!pub.public_url)

  const cheapest = pricing.sort((a, b) => a.price - b.price)[0];

  const chunkedPricing = chunk(pricing, 3);

  return (
    <div className="w-full h-dvh flex md:flex-row flex-col overflow-y-auto">
      <div className="md:w-1/2 w-full md:min-h-fit min-h-dvh md:h-full h-fit flex flex-col justify-between *:p-6 md:sticky static top-0">
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
          <Availability size="lg" enabled={available} />
          <div className="w-full space-y-2 *:block">
            <h1 className="text-foreground md:text-4xl text-3xl font-semibold">{title}</h1>
            <p className="text-muted-foreground md:text-2xl text-xl font-medium">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary"><SendIcon />Чат</Button>
            <Button disabled={!available}>Запланировать видеозвонок <ArrowRightIcon /></Button>
          </div>
          <div className="w-full space-y-3">
            <span className="text-muted-foreground text-sm block">Бренды, доверившиеся мне</span>
            <div className="w-full h-16 overflow-hidden infinite-scroll-container">
              <div className="h-full flex w-max items-center gap-3 infinite-scroll-track">
                {
                  [...brands, ...brands]
                    .map((brand) => (
                      <div
                        key={brand.id}
                        className={`h-full ${brand.type === 'video' ? 'aspect-video' : 'aspect-square'} bg-secondary rounded-sm`}
                      />
                    ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 w-full md:h-full h-fit *:px-6 *:py-12">
        <div className="space-y-6">
          <div className="w-full">
            <span className="text-2xl font-medium">Последние работы</span>
          </div>
          <div className="w-full h-fit overflow-x-hidden infinite-scroll-container">
            <div
              style={{
                '--duration': '60s'
              } as React.CSSProperties}
              className="flex items-center gap-4 w-max infinite-scroll-track"
            >
              {
                [...attachments, ...attachments]
                  .map((attachment) => {
                    const title = attachment.title
                    const description = attachment.description
                    const attachments = attachment.attachments
                    return (
                      <div key={attachment.id} className="flex shrink-0 flex-col gap-3 h-full">
                        <div className="flex items-center h-full gap-3">
                          {
                            attachments
                              .map(item => {
                                return (
                                  <img
                                    className="block relative w-full xl:h-[500px] h-[400px] rounded-2xl border"
                                    key={attachment.id}
                                    src={item.url}
                                    alt={attachment.title}
                                  />
                                )
                              })
                          }
                        </div>
                        <div className="flex items-center gap-2 *:text-base">
                          <span className="text-foreground line-clamp-1">
                            {title} - {description}
                          </span>
                        </div>
                      </div>
                    )
                  })
              }
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="w-full">
            <span className="text-2xl font-medium">Услуги и цены</span>
          </div>
          <div className="w-full grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-2 *:h-9 *:px-3">
            {
              pricing
                .sort((a, b) => {
                  const aDuration = a.duration.reduce((acc, val) => acc + val, 0)
                  const bDuration = b.duration.reduce((acc, val) => acc + val, 0)
                  return aDuration - bDuration
                })
                .map(price => {
                  const duration = formatDuration(price.duration);
                  return (
                    <Badge key={price.id} variant="outline" className="flex items-center justify-between w-full">
                      <span className="text-base font-medium">{price.name}</span>
                      <span className="text-sm text-muted-foreground/60">От {duration}</span>
                    </Badge>
                  )
                })
            }
          </div>
        </div>
        <div className="space-y-6">
          <div className="w-full flex gap-2 items-center justify-between">
            <span className="shrink-0 text-2xl font-medium text-muted-foreground">Цены начинаются от</span>
            <div className="w-full md:flex hidden items-center pl-3">
              <Separator className="shrink !h-[2px] !bg-muted" />
              <ChevronRightIcon className="text-muted relative -left-3" />
            </div>
            <Button size="lg">{(cheapest.price ?? 0).toLocaleString()} ₽ <ArrowDownIcon className="animate-bounce" /></Button>
          </div>
          <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-3 *:rounded-xl">
            {
              chunkedPricing.map((chunk, index) => {
                const isOdd = index % 2 === 0;
                return (
                  <Fragment key={`chunk/${index}`}>
                    {
                      chunk
                        .map((pricing, priceIndex) => {
                          const isOddChunk = priceIndex === 0;
                          const isEvenChunk = priceIndex === 1;
                          const active = isOdd ? isOddChunk : isEvenChunk;
                          const details = pricing.details
                          return (
                            <div
                              key={pricing.id}
                              data-active={active}
                              className={cn(
                                "w-full flex flex-col group *:p-3 border",
                                isOdd
                                  ? isOddChunk
                                    ? "row-span-2 bg-foreground !border-foreground/60"
                                    : "row-span-1 bg-card"
                                  : isEvenChunk
                                    ? "row-span-2 bg-foreground !border-foreground/60"
                                    : "row-span-1 bg-card"
                              )}>
                              <div className={cn(
                                "w-full h-fit flex gap-2 rounded-lg justify-between",
                                active ? "flex-col" : "flex-row items-center",
                              )}>
                                <div className="w-full space-y-1 *:block">
                                  <span className="text-2xl font-medium group-data-[active=true]:text-background">{pricing.name}</span>
                                  <span className="text-base group-data-[active=true]:text-background/60 text-muted-foreground">{pricing.description}</span>
                                </div>
                                {
                                  !active &&
                                  <div className="gap-2 flex w-fit items-center flex-col">
                                    <span className="text-2xl shrink-0 font-medium">{pricing.price.toLocaleString()} ₽</span>
                                    <Button className="w-fit" size="lg" variant={active ? "secondary" : "default"} disabled={!available}>
                                      Заказать
                                      <ArrowRightIcon />
                                    </Button>
                                  </div>
                                }
                              </div>
                              <div className="w-full h-fit">
                                <ul
                                  className="*:py-2"
                                >
                                  {
                                    details
                                      .sort((a, b) => {
                                        const aHasPricing = !!a.price_per_item;
                                        const bHasPricing = !!b.price_per_item;
                                        if (aHasPricing && !bHasPricing) return -1;
                                        if (!aHasPricing && bHasPricing) return 1;
                                        return 0;
                                      })
                                      .map((detail, index) => {
                                        const hasPricing = !!detail.price_per_item;
                                        return (
                                          <li
                                            key={`${detail.type}/${index}`}
                                            className="flex items-center gap-2 group-data-[active=true]:text-background"
                                          >
                                            {
                                              hasPricing
                                                ? <PlusIcon size={16} className="shrink-0" />
                                                : <CheckIcon size={16} className="shrink-0" />
                                            }
                                            <span className="text-sm">{detail.label}</span>
                                            {
                                              hasPricing &&
                                              <span className="text-sm font-medium ml-auto">{(detail.price_per_item ?? 0).toLocaleString()} ₽</span>
                                            }
                                          </li>
                                        )
                                      })
                                  }
                                </ul>
                              </div>
                              {
                                active &&
                                <div className="gap-2 w-full h-full flex justify-end items-start flex-col">
                                  <span className="text-4xl shrink-0 font-medium group-data-[active=true]:text-background">{pricing.price.toLocaleString()} ₽</span>
                                  <Button className="w-full" size="lg" variant={active ? "secondary" : "default"} disabled={!available}>
                                    Заказать
                                    <ArrowRightIcon />
                                  </Button>
                                </div>
                              }
                            </div>
                          )
                        })
                    }
                  </Fragment>
                )
              })
            }
          </div>
        </div>
        <div className="space-y-6">
          <div className="w-full">
            <span className="text-2xl font-medium">Вопросы и ответы</span>
          </div>
          <ul className="*:py-3 *:px-5 *:rounded-full *:w-full *:border space-y-3">
            <li className="flex items-center justify-between">
              <span className="text-base">Вопрос #1</span>
              <PlusIcon size={20} className="text-muted-foreground" />
            </li>
            <li className="flex items-center justify-between">
              <span className="text-base">Вопрос #2</span>
              <PlusIcon size={20} className="text-muted-foreground" />
            </li>
            <li className="flex items-center justify-between">
              <span className="text-base">Вопрос #3</span>
              <PlusIcon size={20} className="text-muted-foreground" />
            </li>
          </ul>
        </div>
        <footer className="flex xl:flex-row flex-col-reverse w-full h-git gap-8">
          <div className="flex flex-col gap-8 md:max-w-64 max-w-full">
            <div className="w-full flex flex-col gap-3">
              <Logo size={48} />
              <div className="*:block space-y-1">
                <span className="text-base text-foreground font-semibold">{title}</span>
                <span className="text-sm text-muted-foreground">{description}</span>
              </div>
            </div>
            <div className="w-full flex flex-col *:w-full gap-3 *:h-10">
              <Button variant="secondary" disabled={!available}>
                <span className="sm:inline hidden">Запланировать видеозвонок</span>
                <span className="sm:hidden inline">Видеозвонок</span>
                <ArrowRightIcon />
              </Button>
              <Availability size="default" animated={false} enabled={available} className="justify-center" />
            </div>
          </div>
          <div className="w-full h-fit flex sm:flex-row flex-col md:gap-0 gap-6 md:*:w-1/3 *:w-full">
            <div className="w-1/3 flex flex-col gap-3">
              <span>Проекты</span>
              <ul>
                {
                  projects
                    .map(project => {
                      return (
                        <li key={project.id} className="flex items-center gap-2 h-9 group relative">
                          <Link to={project.public_url!} className="absolute inset-0" />
                          <div className="size-6 relative">
                            <ProjectLogo project={project} />
                          </div>
                          <span className="text-sm group-hover:underline text-muted-foreground group-hover:text-foreground">{project.name}</span>
                          <ExternalLinkIcon size={12} />
                        </li>
                      )
                    })
                }
              </ul>
            </div>
            <div className="w-1/3 flex flex-col gap-3">
              <span>Ресурсы</span>
              <ul>
                <li className="flex items-center gap-2 h-9">
                  <span className="text-sm">Лого</span>
                </li>
              </ul>
            </div>
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
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">YZ13 2025</span>
          <span className="text-xs text-muted-foreground">Фронтенд разработчик</span>
        </div>
      </div>
    </div>
  )
}
