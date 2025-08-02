import { cdn } from "@/utils/cdn";
import { GetV1Store200Item } from "@yz13/api/types";
import { Button } from "@yz13/ui/button";
import { Skeleton } from "@yz13/ui/skeleton";
import { cn } from "@yz13/ui/utils";
import { parseISO } from "date-fns";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router";

export const ProjectsSkeleton = () => {
  return (
    <div className="space-y-2 *:shrink-0 *:h-[24px]">
      <Skeleton className="w-full" />
      <Skeleton className="w-full" />
      <Skeleton className="w-full" />
    </div>
  )
}

export const ProjectLogo = ({ project, className = "" }: { project: GetV1Store200Item, className?: string }) => {

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
    <div className={cn("w-full flex flex-row items-center gap-2 py-3", className)}>
      {children}
    </div>
  )
}

const ProjectRowLogo = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => {
  return (
    <div className={cn("size-10 shrink-0 relative bg-background border rounded-sm", className)}>
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
    <>
      {
        sorted
          .map((project) => {

            const description = project.description ?? "Без описания"
            const url = project.public_url;

            if (url) {
              return (
                <ProjectRow key={project.id}>
                  <div className="flex items-center gap-2">
                    <ProjectRowLogo>
                      <ProjectLogo project={project} className="rounded-sm" />
                    </ProjectRowLogo>
                    <div className="*:inline *:text-sm line-clamp-2">
                      <span className="text-foreground">{project.name}</span>
                      <span className="text-muted-foreground mx-1">-</span>
                      <p className="text-muted-foreground">{description}</p>
                    </div>
                  </div>
                  {
                    <Button size="sm" variant="outline" asChild>
                      <Link to={url} target="_blank">
                        <span className="sr-only">Перейти</span>
                        <ArrowRightIcon />
                      </Link>
                    </Button>
                  }
                </ProjectRow>
              )
            }

            return (
              <ProjectRow key={project.id}>
                <div className="flex items-center gap-2">
                  <ProjectRowLogo>
                    <ProjectLogo project={project} className="rounded-sm" />
                  </ProjectRowLogo>
                  <div className="*:inline *:text-sm line-clamp-2">
                    <span className="text-foreground">{project.name}</span>
                    <span className="text-muted-foreground mx-1">-</span>
                    <p className="text-muted-foreground">{description}</p>
                  </div>
                </div>
              </ProjectRow>
            );
          })
      }
    </>
  )
}
