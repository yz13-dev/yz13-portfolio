import Footer from "@/components/footer";
import Header from "@/components/header";
import { Project } from "@/components/project-logo";
import { getAbc, sortByAbc, sortLetters } from "@/utils/abc";
import { available } from "@/utils/flags";
import { getStoreV1 } from "@yz13/api";
import { cn } from "@yz13/ui/utils";
import { useInViewport } from "ahooks";
import { ExternalLinkIcon } from "lucide-react";
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

  const [q, setQ] = useQueryState("letter", parseAsString)

  const length = projects?.length ?? 0;
  const ref = useRef<HTMLDivElement>(null);
  const [inView] = useInViewport(ref, {
    // threshold: [.25, .5, .75],
    // root: () => document.getElementById("root"),
    rootMargin: '-20% 0px -80% 0px',
  });

  const isSelected = q === letter;

  useEffect(() => {
    if (inView) setQ(letter)
  }, [letter, inView])
  return (
    <div
      key={letter}
      ref={ref}
      className={cn(
        "w-full flex flex-row py-24 rounded-lg transition-opacity",
        !isSelected && "opacity-50 hover:opacity-100",
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
      <Header className="max-w-7xl mx-auto p-6" />
      <Await resolve={publications}>
        {
          publications => {
            const abc = getAbc(publications);
            const sorted = sortByAbc(publications);
            const letters = sortLetters(Object.keys(Object.fromEntries(sorted)));

            return (
              <>
                <div className="max-w-7xl w-full mx-auto p-6 sticky top-0 bg-background/50 backdrop-blur-sm z-10 flex lg:flex-row flex-col lg:gap-0 gap-4">
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
      <Footer className="max-w-7xl mx-auto px-6" />
    </>
  )
}
