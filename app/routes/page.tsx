import DitheringBackground from "@/components/dithering-background";
import { Logo } from "@/components/logo";
import Nav from "@/components/nav";
import { ProjectLogo } from "@/components/project-logo";
import { Time, TimeOffset } from "@/components/time/time";
import { call, email, emailTo, github, telegram, twitter } from "@/const/socials";
import useAvailable from "@/hooks/use-available";
import useBlog from "@/hooks/use-blog";
import usePublications from "@/hooks/use-publications";
import { Badge } from "@yz13/ui/badge";
import { Button } from "@yz13/ui/button";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { ArrowRightIcon, ExternalLinkIcon, SendIcon } from "lucide-react";
import { lazy, Suspense } from "react";
import { Link } from "react-router";


const Availability = lazy(() => import("@/components/availability"));
const GithubContributions = lazy(() => import("@/components/github-contributions"));
const User = lazy(() => import("@/components/user"));
const WorkflowLoop = lazy(() => import("@/components/workflow-loop"));

export default function () {

  const [available] = useAvailable();
  const [blog] = useBlog();
  const [publications] = usePublications();

  return (
    <div className="w-full lg:*:w-1/2 *:w-full flex lg:flex-row flex-col">
      <main className="h-dvh flex flex-col lg:sticky lg:top-0 static justify-between gap-6 p-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Logo type="full" size={36} />
            </Link>
            <div className="flex flex-col gap-0">
              <Time className="text-lg font-medium text-foreground" />
              <TimeOffset className="text-xs text-muted-foreground" />
            </div>
            <Nav className="md:block hidden" />
          </div>
          <User />
        </header>
        <div className="size-full relative">
          <DitheringBackground className="size-full" withGradientOverylay={false} />
        </div>
        <div className="space-y-4">
          <div className="space-y-4">
            <Availability enabled={available} className="h-12 justify-center rounded-lg text-lg w-fit [&>svg]:!size-5" size="lg" />
            <div className="w-full space-x-2 space-y-3 *:block max-w-4xl">
              <h1 className="lg:*:text-5xl text-3xl *:font-semibold">
                <span>YZ13</span><span> - </span><span>Фронтенд который не&nbsp;подведет.</span><br /><span></span>
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
              {
                available
                  ?
                  <Button asChild className="h-12 text-lg w-fit [&>svg]:!size-5" variant="secondary" size="lg">
                    <Link to={call} target="_blank">
                      <span className="sm:inline hidden">Запланировать видеозвонок</span>
                      <span className="sm:hidden inline">Видеозвонок</span>
                      <ArrowRightIcon />
                    </Link>
                  </Button>
                  :
                  <Button disabled={!available} className="h-12 text-lg w-fit [&>svg]:!size-5" variant="secondary" size="lg">
                    <span className="sm:inline hidden">Запланировать видеозвонок</span>
                    <span className="sm:hidden inline">Видеозвонок</span>
                    <ArrowRightIcon />
                  </Button>
              }
            </div>
            <span className="text-sm text-muted-foreground">
              По вопросам и предложениям можно связаться по электронной почте <Link to={emailTo(email)} className="hover:text-foreground transition-colors" target="_blank">{email}</Link> или чату.
            </span>
          </div>
        </div>
      </main>
      <div className="w-full *:px-6 *:py-12 [&>section]:first:p-6">
        <section className="space-y-6">
          <div className="w-full space-y-2 *:block">
            <h3 className="text-4xl font-medium">Активность</h3>
            <p className="text-base text-muted-foreground">
              Тепловая карта мой активности на <Link to={github} target="_blank" className="hover:underline text-foreground inline-flex items-center gap-1">GitHub <ExternalLinkIcon size={14} /></Link>.
            </p>
          </div>
          <Suspense fallback={<GithubContributions username="yz13-dev" loading />}>
            <GithubContributions username="yz13-dev" />
          </Suspense>
          <div className="flex flex-row gap-4">
            <Badge variant="secondary" asChild>
              <Link to={telegram} target="_blank" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                Telegram <ExternalLinkIcon size={16} />
              </Link>
            </Badge>
            <Badge variant="secondary" asChild>
              <Link to={github} target="_blank" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                Github <ExternalLinkIcon size={16} />
              </Link>
            </Badge>
            <Badge variant="secondary" asChild>
              <Link to={twitter} target="_blank" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                Twitter/X <ExternalLinkIcon size={16} />
              </Link>
            </Badge>
          </div>
        </section>
        <section className="space-y-6">
          <div className="w-full space-y-2 *:block">
            <h3 className="text-4xl font-medium">Безотказный цикл разработки и обратной связи</h3>
            <p className="text-base text-muted-foreground">
              Приблизительный цикл разработки и обратной связи (может меняться в будущем).
            </p>
          </div>
          <WorkflowLoop />
        </section>
        <section className="space-y-6">
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between w-full gap-2">
              <h3 className="text-4xl font-medium">Проекты</h3>
              <Button asChild size="sm" variant="secondary"><Link to="/apps"><ArrowRightIcon /></Link></Button>
            </div>
            <p className="text-base text-muted-foreground">
              Есть множество проектов над которыми я работаю.
            </p>
          </div>
          <ul className="space-y-6">
            {
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
                </li>
                )
            }
          </ul>
        </section>
        <section className="space-y-6">
          <div className="w-full space-y-2 *:block">
            <h3 className="text-4xl font-medium">Блог</h3>
            <p className="text-base text-muted-foreground">
              Время от времени добавляю что-то новое в блог.
            </p>
          </div>
          {
            blog
              .map(post => {

                const created_at = new Date(post.updated_at);

                return (
                  <div key={post.id} className="w-full flex items-center justify-between gap-4 relative ">
                    <div className="flex items-center gap-2">
                      <div className="w-full flex flex-col gap-1">
                        <Link to={`https://blog.yz13.ru/${post.id}`} className="font-medium text-2xl inline-flex items-center gap-2">
                          {/* @ts-expect-error */}
                          {post.title}
                          <ExternalLinkIcon className="size-5" />
                        </Link>
                        {/* @ts-expect-error */}
                        <span className="text-muted-foreground">{post.summary}</span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-base"
                    >
                      {format(created_at, "dd MMMM", { locale: ru })}
                    </Badge>
                  </div>
                )
              })
          }
        </section>
        <footer className="w-full max-w-7xl mx-auto space-y-6">
          <div className="w-full flex lg:flex-row flex-col gap-5 lg:*:w-1/3 *:w-full">
            <div className="w-fit space-y-1.5">
              <span className="text-xs block text-muted-foreground uppercase">Платформа</span>
              <ul>
                <li>
                  <Link to="/apps" className="text-2xl inline-flex items-center gap-1.5 font-medium hover:underline">Проекты</Link>
                </li>
              </ul>
            </div>
            <div className="w-fit space-y-1.5">
              <span className="text-xs block text-muted-foreground uppercase">Ресуры</span>
              <ul>
                <li>
                  <Link to="/blog" className="text-2xl inline-flex items-center gap-1.5 font-medium hover:underline">Блог</Link>
                </li>
                <li>
                  <span className="text-2xl text-muted-foreground font-medium">Шаблоны</span>
                </li>
              </ul>
            </div>
            <div className="w-fit space-y-1.5">
              <span className="text-xs block text-muted-foreground uppercase">Действия</span>
              <ul className="space-y-1.5 w-full">
                <li>
                  {
                    available
                      ?
                      <Button asChild size="lg" variant="secondary" className="xl:text-2xl text-lg font-medium py-2 h-fit">
                        <Link to={call} target="_blank">
                          <span>Видеозвонок</span><ArrowRightIcon className="xl:size-6 size-5" />
                        </Link>
                      </Button>
                      :
                      <Button disabled={!available} size="lg" variant="secondary" className="xl:text-2xl text-lg font-medium py-2 h-fit">
                        <span>Видеозвонок</span><ArrowRightIcon className="xl:size-6 size-5" />
                      </Button>
                  }
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
            <Logo size={128} type="full" className="shrink-0 w-full opacity-10 [&>img]:size-full" />
          </div>
        </footer>
      </div>
    </div>
  )
}
