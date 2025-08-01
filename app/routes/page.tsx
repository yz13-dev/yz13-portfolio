import Availability from "@/components/availability";
import { Logo } from "@/components/logo";
import { ProjectLogo } from "@/components/projects";
import { Time, TimeOffset } from "@/components/time/time";
import { available } from "@/utils/flags";
import { formatDuration } from "@/utils/pricing-durations";
import { getV1Pricing, getV1Store } from "@yz13/api";
import { Badge } from "@yz13/ui/badge";
import { Button } from "@yz13/ui/button";
import { Separator } from "@yz13/ui/separator";
import { ArrowDownIcon, ArrowRightIcon, ChevronRightIcon, ExternalLinkIcon, PlusIcon, SendIcon } from "lucide-react";
import { Link, useLoaderData } from "react-router";

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

  const telegram = "https://t.me/yz13_dev"
  const twitter = "https://x.com/yz13_dev"
  const github = "https://githib.com/yz13-dev"

  const title = "YZ13 - Фронтенд который не подведет";
  const description = "Разработаю сайт, страницы, приложение и компоненты разной сложности";
  return (
    <>
      <header className="w-full px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo size={28} type="full" />
        </div>
        <div>
          <Button variant="secondary" disabled={!available}>
            <span className="sm:inline hidden">Запланировать видеозвонок</span>
            <span className="sm:hidden inline">Видеозвонок</span>
            <ArrowRightIcon />
          </Button>
        </div>
      </header>
      <div className="w-full h-[calc(100dvh-64px)] flex md:flex-row flex-col overflow-y-auto">
        <div className="md:w-1/2 w-full md:min-h-fit min-h-[calc(100dvh-64px)] md:h-full h-fit flex flex-col justify-between *:p-6 md:sticky static top-0">
          <div className="w-full">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Time className="text-2xl font-medium text-foreground" />
                <TimeOffset className="text-sm text-muted-foreground" />
              </div>
              <span className="text-2xl font-medium text-foreground">Tyumen, Russia</span>
            </div>
          </div>
          <div className="w-full space-y-8">
            <Availability size="lg" enabled={available} />
            <div className="w-full space-y-2 *:block">
              <h1 className="text-foreground text-4xl font-semibold">{title}</h1>
              <p className="text-muted-foreground text-2xl font-medium">
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
        <div className="md:w-1/2 w-full md:h-full h-fit *:p-6">
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
                                      className="block relative w-full h-[500px] rounded-2xl border"
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
            <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 *:h-9 *:text-base *:px-3">
              {
                pricing
                  .sort((a, b) => a.price - b.price)
                  .map(price => {
                    const duration = formatDuration(price.duration);
                    return (
                      <Badge key={price.id} variant="outline" className="flex items-center justify-between w-full">
                        <span className="font-medium">{price.name}</span>
                        <span className="text-muted-foreground/60">От {duration}</span>
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
              <Button size="lg">{(3000).toLocaleString()} ₽ <ArrowDownIcon className="animate-bounce" /></Button>
            </div>
            <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-3 *:rounded-xl">
              <div className="bg-secondary w-full min-h-56 row-span-2"></div>
              <div className="bg-secondary w-full h-56"></div>
              <div className="bg-secondary w-full h-56"></div>
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
          <footer className="flex lg:flex-row flex-col-reverse w-full h-git gap-8">
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
    </>
  )
}
