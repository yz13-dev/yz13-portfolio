import Availability, { AvailabilitySkeleton } from "@/components/availability";
import GithubContributions from "@/components/github-contributions";
import { Logo } from "@/components/logo";
import { ProjectLogo } from "@/components/project-logo";
import { Time, TimeOffset } from "@/components/time/time";
import { available } from "@/utils/flags";
import { getStoreV1 } from "@yz13/api";
import { Badge } from "@yz13/ui/badge";
import { Button } from "@yz13/ui/button";
import { Skeleton } from "@yz13/ui/skeleton";
import { ArrowRightIcon, ExternalLinkIcon, PlusIcon, SendIcon } from "lucide-react";
import { Suspense } from "react";
import { Await, Link, useLoaderData } from "react-router";

export const loader = async () => {
  try {

    const isAvailable = available();
    const projects = await getStoreV1();

    return { available: isAvailable, publications: projects }
  } catch (error) {
    console.error(error)
    return {
      publications: [],
      available: false,
    }
  }
}

const telegram = "https://t.me/yz13_dev"
const twitter = "https://x.com/yz13_dev"
const github = "https://githib.com/yz13-dev"

const email = "yz13.dev@gmail.com"
const emailTo = (email: string) => `mailto:${email}`

export default function () {

  const { available, publications } = useLoaderData<typeof loader>();

  return (
    <div className="w-full lg:*:w-1/2 *:w-full flex lg:flex-row flex-col">
      <main className="h-dvh flex flex-col lg:sticky lg:top-0 static justify-between gap-6 p-6">
        <div className="space-y-4">
          <div className="flex flex-col gap-0">
            <Time className="text-lg font-medium text-foreground" />
            <TimeOffset className="text-xs text-muted-foreground" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-4">
            <Suspense fallback={<AvailabilitySkeleton className="!h-12" />}>
              <Await resolve={available}>
                {(available) => <Availability enabled={available} className="h-12 justify-center rounded-lg text-lg w-fit [&>svg]:!size-5" size="lg" />}
              </Await>
            </Suspense>
            <div className="w-full space-x-2 space-y-3 *:block max-w-2xl">
              <h1 className="lg:*:text-5xl text-3xl *:font-semibold">
                <span>YZ13</span><span>-</span><span>Фронтенд который не подведет.</span><br /><span></span>
              </h1>
              <p className="text-2xl font-medium text-muted-foreground">Разработаю сайт, страницы, приложение и компоненты разной сложности</p>
            </div>
          </div>
          <div className="space-y-2 w-full">
            <div className="w-full flex lg:flex-row flex-col lg:*:w-fit *:w-full gap-3">
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
            <span className="text-sm text-muted-foreground">
              По вопросам и предложениям можно связаться по электронной почте <Link to={emailTo(email)} className="hover:text-foreground transition-colors" target="_blank">{email}</Link> или чату.
            </span>
          </div>
        </div>
      </main>
      <div className="w-full *:p-6">
        <section className="space-y-6">
          <div className="w-full space-y-2 *:block">
            <h3 className="text-4xl font-medium">Активность</h3>
            <p className="text-base text-muted-foreground">
              Тепловая карта мой активности на GitHub.
            </p>
          </div>
          <Suspense fallback={<GithubContributions username="yz13-dev" loading />}>
            <GithubContributions username="yz13-dev" />
          </Suspense>
        </section>
        <section className="space-y-6">
          <div className="w-full space-y-2 *:block">
            <h3 className="text-4xl font-medium">Проекты</h3>
            <p className="text-base text-muted-foreground">
              Есть множество проектов над которыми я работаю.
            </p>
          </div>
          <ul className="space-y-6">
            <Await resolve={publications}>
              {
                (publications) =>
                  publications
                    .sort((a, b) => {
                      const aHavePublicUrl = a.public_url !== null;
                      const bHavePublicUrl = b.public_url !== null;
                      if (aHavePublicUrl && !bHavePublicUrl) return -1;
                      if (!aHavePublicUrl && bHavePublicUrl) return 1;
                      return 0;
                    })
                    .map((publication, index) => <li key={publication.id}>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <div className="size-7 rounded-[8px] bg-secondary border relative overflow-hidden">
                              <ProjectLogo project={publication} />
                            </div>
                            <span className="text-2xl font-medium">{publication.name}</span>
                            {publication.public_url && <ExternalLinkIcon size={18} />}
                            {
                              publication.stage &&
                              <Badge variant="secondary" className="capitalize">{publication.stage}</Badge>
                            }
                          </div>
                          <span className="text-base text-muted-foreground">{publication.description}</span>
                        </div>
                        {
                          publication.public_url &&
                          <Button variant="secondary" size="sm" asChild>
                            <Link to={publication.public_url} target="_blank">
                              <span>Открыть</span><ArrowRightIcon />
                            </Link>
                          </Button>
                        }
                      </div>
                    </li>)
              }
            </Await>
          </ul>
        </section>
        <section className="space-y-6">
          <div className="w-full space-y-2 *:block">
            <h3 className="text-4xl font-medium">Множество вариантов для сотрудничества</h3>
            <p className="text-base text-muted-foreground">
              Есть множество вариантов для сотрудничества от разработки сайтов, страниц, приложений и компонентов.
            </p>
          </div>
          <ul className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-3 gap-y-6">
            <li className="flex items-center gap-1">
              <PlusIcon size={20} className="text-muted-foreground" /><span className="text-foreground text-base">Компоненты</span>
            </li>
            <li className="flex items-center gap-1">
              <PlusIcon size={20} className="text-muted-foreground" /><span className="text-foreground text-base">Сайты</span>
            </li>
            <li className="flex items-center gap-1">
              <PlusIcon size={20} className="text-muted-foreground" /><span className="text-foreground text-base">Приложения</span>
            </li>
          </ul>
        </section>
        <section className="space-y-6">
          <div className="w-full space-y-2 *:block">
            <h3 className="text-4xl font-medium">Блог</h3>
            <p className="text-base text-muted-foreground">
              Время от времени добавляю что-то новое в блог.
            </p>
          </div>
        </section>
        <footer className="w-full max-w-7xl mx-auto space-y-6">
          <div className="w-full flex lg:flex-row flex-col gap-5 lg:*:w-1/3 *:w-full">
            <div className="w-fit space-y-1.5">
              <span className="text-xs block text-muted-foreground uppercase">Платформа</span>
              <ul>
                <li><span className="text-2xl text-muted-foreground font-medium">Проекты</span></li>
              </ul>
            </div>
            <div className="w-fit space-y-1.5">
              <span className="text-xs block text-muted-foreground uppercase">Ресуры</span>
              <ul>
                <li><span className="text-2xl text-muted-foreground font-medium">Блог</span></li>
              </ul>
            </div>
            <div className="w-fit space-y-1.5">
              <span className="text-xs block text-muted-foreground uppercase">Действия</span>
              <ul className="space-y-1.5 w-full">
                <li>
                  <Button disabled size="lg" variant="secondary" className="xl:text-2xl text-lg font-medium py-2 h-fit">
                    <span>Созвониться</span><ArrowRightIcon className="xl:size-6 size-5" />
                  </Button>
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
            <Logo size={128} type="full" />
            <div className="flex flex-col gap-3">
              <span className="text-xs text-muted-foreground">© YZ13 2025</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
