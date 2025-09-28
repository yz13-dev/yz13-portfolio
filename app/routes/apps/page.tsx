import { Logo } from "@/components/logo";
import { Time, TimeOffset } from "@/components/time/time";
import User from "@/components/user";
import { getAbc, sortByAbc, sortLetters } from "@/utils/abc";
import { getStoreV1 } from "@yz13/api";
import { ExternalLinkIcon } from "lucide-react";
import { Await, Link, useLoaderData } from "react-router";

export const loader = async () => {
  try {

    const projects = getStoreV1();

    return { publications: projects }
  } catch (error) {
    console.error(error)
    return {
      publications: [],
    }
  }
}

export default function () {

  const { publications } = useLoaderData<typeof loader>();

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
                <div className="max-w-7xl w-full mx-auto px-6 py-3 flex lg:flex-row flex-col lg:gap-0 gap-4">
                  <div className="lg:w-1/4 w-full">
                    <span className="text-xs text-muted-foreground uppercase">
                      проекты yz13
                    </span>
                  </div>
                  <div className="lg:w-3/4 w-full grid grid-cols-12 gap-2">
                    {
                      abc.map(letter => <div
                        key={letter}
                        className="size-8 rounded-[6px] cursor-pointer hover:bg-muted flex items-center justify-center border-2 !border-transparent hover:!border-foreground transition-colors"
                      >
                        {letter}
                      </div>
                      )
                    }
                  </div>
                </div>
                <div className="max-w-7xl w-full mx-auto px-6 py-3">
                  {
                    letters
                      .map(letter => {
                        const projects = sorted.get(letter);
                        const length = projects?.length ?? 0;;
                        if (!projects) return null;
                        return (
                          <div key={letter} className="w-full flex flex-row py-12">
                            <div className="w-1/4 flex flex-row gap-1">
                              <span className="text-2xl font-medium">{letter}</span>
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
                                }
                                )
                              }
                            </div>
                          </div>
                        )
                      })
                  }
                </div>
              </>
            )
          }
        }
      </Await>
    </>
  )
}
