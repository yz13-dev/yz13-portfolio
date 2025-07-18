import { cdn } from "@/utils/cdn";
import { Link } from "@remix-run/react";
import { GetV1Store200Item } from "@yz13/api/types";
import { Badge } from "@yz13/ui/badge";
import { Button } from "@yz13/ui/button";
import { Skeleton } from "@yz13/ui/skeleton";
import { cn } from "@yz13/ui/utils";
import { parseISO } from "date-fns";
import { ArrowRightIcon, ExternalLinkIcon } from "lucide-react";

export const ProjectsSkeleton = () => {
  return (
    <div className="space-y-2 *:shrink-0 *:h-[24px]">
      <Skeleton className="w-full" />
      <Skeleton className="w-full" />
      <Skeleton className="w-full" />
    </div>
  )
}

const Logo = ({ project, className = "" }: { project: GetV1Store200Item, className?: string }) => {

  const icon = project.icon as any;

  return (
    <>
      {icon.type === "themed" && (
        <>
          <img
            src={cdn(`/apps${icon.dark}`)}
            className={cn("dark-mode-image", className)}
            alt=""
          />
          <img
            src={cdn(`/apps${icon.light}`)}
            className={cn("light-mode-image", className)}
            alt=""
          />
        </>
      )}
      {icon.type === "simple" && (
        <img
          src={cdn(`/apps${icon.url}`)}
          className={className}
          alt=""
        />
      )}
    </>
  );
}

const ProjectRow = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => {
  return (
    <li className={cn("flex items-start gap-2 p-3", className)}>
      {children}
    </li>
  )
}

const ProjectRowLogo = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => {
  return (
    <div className={cn("size-8 shrink-0 inline-block relative mt-1", className)}>
      {children}
    </div>
  )
}

export default function ({ projects = [] }: { projects?: GetV1Store200Item[] }) {

  const sorted = projects
    .sort((a, b) => {
      const aCreatedAt = parseISO(a.created_at);
      const bCreatedAt = parseISO(b.created_at);
      return aCreatedAt.getTime() - bCreatedAt.getTime();
    })

  if (!projects.length) {
    return (
      <span className="text-sm text-muted-foreground">Проекты не найдены</span>
    )
  }
  return (
    <ul className="list-inside rounded-lg divide-y bg-card/40 text-sm/6 text-left">
      {
        sorted
          .map((project) => {

            const stage = project.stage;
            const description = project.description ?? "Без описания"
            const url = project.public_url

            if (url) {
              return (
                <ProjectRow key={project.id}>
                  <ProjectRowLogo>
                    <Logo project={project} className="rounded-full" />
                  </ProjectRowLogo>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <Link to={url} target="_blank" className="hover:underline">
                        <span>{project.name}</span>
                        <ExternalLinkIcon
                          size={14}
                          className="inline-block ml-2 relative -top-0.5"
                        />
                      </Link>
                      {stage && <Badge variant="secondary" className="ml-1 capitalize">{stage}</Badge>}
                    </div>
                    <p className="text-sm line-clamp-1 text-muted-foreground">{description}</p>
                  </div>
                  {
                    <Button size="sm" className="ml-auto" variant="outline"><ArrowRightIcon /></Button>
                  }
                </ProjectRow>
              )
            }

            return (
              <ProjectRow key={project.id}>
                <ProjectRowLogo>
                  <Logo project={project} className="rounded-full" />
                </ProjectRowLogo>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span>{project.name}</span>
                    {stage && <Badge variant="secondary" className="ml-1 capitalize">{stage}</Badge>}
                  </div>
                  <p className="text-sm line-clamp-1 text-muted-foreground">{description}</p>
                </div>
              </ProjectRow>
            );
          })
      }
    </ul>
  )
}
