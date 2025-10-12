// import DitheringBackground from "@/components/dithering-background";
// import Footer from "@/components/footer";
// import Header from "@/components/header";
// import Blog from "@/components/blog";
// import Projects from "@/components/projects";
import { Section, SectionContent, SectionHeader } from "@/components/section";
import { call, email, emailTo, github, telegram, twitter } from "@/const/socials";
import useAvailable from "@/hooks/use-available";
import { Badge } from "@yz13/ui/badge";
import { Button } from "@yz13/ui/button";
import { ArrowRightIcon, ExternalLink, ExternalLinkIcon, SendIcon } from "lucide-react";
import { lazy, Suspense } from "react";
import { Link } from "react-router";

const Projects = lazy(() => import("@/components/projects"));
const Blog = lazy(() => import("@/components/blog"));
const Header = lazy(() => import("@/components/header"));
const Footer = lazy(() => import("@/components/footer"));
const DitheringBackground = lazy(() => import("@/components/dithering-background"));
const Availability = lazy(() => import("@/components/availability"));
const GithubContributions = lazy(() => import("@/components/github-contributions"));
const WorkflowLoop = lazy(() => import("@/components/workflow-loop"));

export default function () {

  const [available] = useAvailable();

  return (
    <div className="w-full lg:*:w-1/2 *:w-full flex lg:flex-row flex-col">
      <main className="h-dvh flex flex-col lg:sticky lg:top-0 static justify-between gap-6 p-6">
        <Header />
        <div className="size-full relative">
          <DitheringBackground className="size-full" withGradientOverylay={false} />
        </div>
        <div className="space-y-4">
          <div className="space-y-4">
            <Availability enabled={available} className="h-12 justify-center rounded-lg text-lg w-fit [&>svg]:!size-5" size="lg" />
            <div className="w-full space-x-2 space-y-3 *:block max-w-4xl">
              <h1 className="lg:*:text-5xl text-3xl *:font-semibold">
                <span>YZ13</span><span> - </span><span>Создаю интерфейсы, которые работают на результат</span><br /><span></span>
              </h1>
              <p className="text-2xl font-medium text-muted-foreground">Специализируюсь на React-экосистеме: от лендингов до сложных веб-приложений</p>
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
            Свяжитесь со мной для обсуждения ваших идей{" "}
            <Link to={emailTo(email)} className="hover:text-foreground hover:underline transition-colors inline-flex items-center gap-1" target="_blank">
            {email}<ExternalLink className="size-3" />
            </Link> {""}
            или {""}
            <Link to={telegram} target="_blank" className="hover:text-foreground hover:underline transition-colors inline-flex items-center gap-1">
            @yz13_dev<ExternalLink className="size-3" />
            </Link>.
            </span>
          </div>
        </div>
      </main>
      <div className="w-full p-6 space-y-24">
        <Section>
          <SectionHeader
            title="Активность"
            description={
              <>
                Тепловая карта моей активности на{" "}
                <Link to={github} target="_blank" className="hover:underline text-foreground inline-flex items-center gap-1">GitHub <ExternalLinkIcon size={14} /></Link>
              </>
            }
          />
          <SectionContent className="space-y-6">
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
          </SectionContent>
        </Section>
        {/**/}
        <Section>
          <SectionHeader
            title="Эффективный цикл разработки и обратной связи"
            description="Гибкий подход к разработке с регулярной обратной связью"
          />
          <SectionContent className="border *:py-3 *:px-4 bg-card rounded-3xl divide-y [&>div]:rounded-none overflow-hidden">
            <WorkflowLoop />
          </SectionContent>
        </Section>
        {/**/}
        <Projects />
        {/**/}
        <Blog />
        <Footer className="max-w-7xl mx-auto" />
      </div>
    </div>
  )
}
