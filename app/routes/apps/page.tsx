import { Logo } from "@/components/logo";
import Nav from "@/components/nav";
import { Project } from "@/components/project-logo";
import { Time, TimeOffset } from "@/components/time/time";
import User from "@/components/user";
import { call, github, telegram, twitter } from "@/const/socials";
import { getAbc, sortByAbc, sortLetters } from "@/utils/abc";
import { available } from "@/utils/flags";
import { getStoreV1 } from "@yz13/api";
import { Button } from "@yz13/ui/button";
import { cn } from "@yz13/ui/utils";
import { useInViewport } from "ahooks";
import { ArrowRightIcon, ExternalLinkIcon, SendIcon } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useRef } from "react";
import { Await, Link, useLoaderData } from "react-router";

export const loader = async () => {
  try {

    const projects = getStoreV1();
    const isAvailable = available();

    return { publications: projects, available: isAvailable }
  } catch (error) {
    console.error(error)
    return {
      publications: [],
      available: false,
    }
  }
}

const LetterRow = ({ letter, projects }: { letter: string, projects: Project[] }) => {

  const [_, setQ] = useQueryState("letter", parseAsString)

  const length = projects?.length ?? 0;
  const ref = useRef<HTMLDivElement>(null);
  const [inView] = useInViewport(ref, {
    // threshold: [.25, .5, .75],
    // root: () => document.getElementById("root"),
    rootMargin: '-15% 0px -85% 0px',
  });

  useEffect(() => {
    if (inView) setQ(letter)
  }, [letter, inView])
  return (
    <div
      key={letter}
      ref={ref}
      className={cn(
        "w-full flex flex-row py-24 rounded-lg",
      )}
    >
      <div className="w-1/4 flex flex-row gap-1">
        <span className={cn("text-2xl font-medium", inView ? "text-foreground" : "text-muted-foreground")}>{letter}</span>
        <span className="text-xs text-muted-foreground align-super">{length}</span>
      </div>
      <div className="w-3/4 gap-3 grid xl:grid-cols-3 ld:grid-cols-2 grid-cols-1">
        {
          projects.map(project => {
            const url = project.public_url;
            if (url) return (
              <Link key={project.id} to={url} className="inline-flex items-center gap-1.5 hover:underline">
                <span className="text-2xl font-medium">{project.name}</span>
                <ExternalLinkIcon className="size-5" />
              </Link>
            )
            return <span key={project.id} className="text-2xl font-medium">{project.name} </span>
          })
        }
      </div>
    </div>
  )
}

export default function () {

  const { publications, available } = useLoaderData<typeof loader>();

  const [q] = useQueryState("letter", parseAsString)

  return (
    <>
      <header className="flex items-center justify-between max-w-7xl w-full mx-auto px-6 py-3">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Logo type="full" size={36} />
          </Link>
          <div className="flex flex-col gap-0">
            <Time className="text-lg font-medium text-foreground" />
            <TimeOffset className="text-xs text-muted-foreground" />
          </div>
          <Nav />
        </div>
        <User />
      </header>
      <Await resolve={publications}>
        {
          publications => {
            const abc = getAbc(publications);
            const sorted = sortByAbc(publications);
            const letters = sortLetters(Object.keys(Object.fromEntries(sorted)));

            return (
              <>
                <div className="max-w-7xl w-full mx-auto p-6 sticky top-0 bg-background flex lg:flex-row flex-col lg:gap-0 gap-4">
                  <div className="lg:w-1/4 w-full">
                    <span className="text-xs text-muted-foreground uppercase">
                      проекты yz13
                    </span>
                  </div>
                  <div className="lg:w-3/4 w-full grid grid-cols-12 gap-2">
                    {
                      abc
                        .map(letter => {

                          const isActive = q === letter;
                          return (
                            <div
                              key={letter}
                              className={cn(
                                "cursor-pointer border-2 !border-transparent transition-colors",
                                "size-8 rounded-[6px] flex items-center justify-center",
                                "hover:bg-muted hover:!border-foreground text-muted-foreground",
                                isActive && "bg-secondary text-foreground !border-foreground"
                              )}
                            >
                              {letter}
                            </div>
                          )
                        }
                        )
                    }
                  </div>
                </div>
                <div className="max-w-7xl w-full mx-auto px-6 py-12">
                  {
                    letters
                      .map(letter => {
                        const projects = sorted.get(letter);
                        if (!projects) return null;
                        return <LetterRow key={letter} letter={letter} projects={projects} />
                      })
                  }
                </div>
              </>
            )
          }
        }
      </Await>
      <footer className="w-full max-w-7xl mx-auto space-y-6 px-6">
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
              <li><span className="text-2xl text-muted-foreground font-medium">Шаблоны</span></li>
            </ul>
          </div>
          <div className="w-fit space-y-1.5">
            <span className="text-xs block text-muted-foreground uppercase">Действия</span>
            <ul className="space-y-1.5 w-full">
              <li>
                <Await resolve={available}>
                  {
                    (available) => {
                      if (available) return (
                        <Button asChild size="lg" variant="secondary" className="xl:text-2xl text-lg font-medium py-2 h-fit">
                          <Link to={call} target="_blank">
                            <span>Видеозвонок</span><ArrowRightIcon className="xl:size-6 size-5" />
                          </Link>
                        </Button>
                      )
                      return (
                        <Button disabled={!available} size="lg" variant="secondary" className="xl:text-2xl text-lg font-medium py-2 h-fit">
                          <span>Видеозвонок</span><ArrowRightIcon className="xl:size-6 size-5" />
                        </Button>
                      )
                    }
                  }
                </Await>
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
          <div className="flex md:flex-col flex-row md:items-start items-center gap-3 shrink-0">
            <Link to={github} target="_blank" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              Github <ExternalLinkIcon size={16} />
            </Link>
            <Link to={twitter} target="_blank" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              Twitter/X <ExternalLinkIcon size={16} />
            </Link>
            <span className="text-xs text-muted-foreground">© YZ13 2025</span>
          </div>
        </div>
      </footer>
    </>
  )
}
