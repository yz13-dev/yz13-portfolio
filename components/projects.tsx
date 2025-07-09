import { cdn } from "@/utils/cdn";
import { getV1Store } from "@yz13/api";
import { GetV1Store200Item } from "@yz13/api/types";
import { Badge } from "@yz13/ui/badge";
import { Skeleton } from "@yz13/ui/skeleton";
import { cn } from "@yz13/ui/utils";
import { parseISO } from "date-fns";
import { ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
          <Image
            src={cdn(`/apps${icon.dark}`)}
            className={cn("dark-mode-image", className)}
            alt=""
            fill
          />
          <Image
            src={cdn(`/apps${icon.light}`)}
            className={cn("light-mode-image", className)}
            alt=""
            fill
          />
        </>
      )}
      {icon.type === "simple" && (
        <Image
          src={cdn(`/apps${icon.url}`)}
          className={className}
          alt=""
          fill
        />
      )}
    </>
  );
}

const ProjectRow = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => {
  return (
    <li className={cn("align-middle tracking-[-.01em]", className)}>
      {children}
    </li>
  )
}

const ProjectRowLogo = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => {
  return (
    <div className="size-4 inline-block relative mr-1 -bottom-0.5">
      {children}
    </div>
  )
}

export default async function () {

  const projects = await getV1Store();

  if (!projects.length) {
    return (
      <span className="text-sm text-muted-foreground">Проекты не найдены</span>
    )
  }
  return (
    <ol className="list-inside list-decimal text-sm/6 text-left space-y-2">
      {
        projects
          .sort((a, b) => {
            const aCreatedAt = parseISO(a.created_at);
            const bCreatedAt = parseISO(b.created_at);
            return aCreatedAt.getTime() - bCreatedAt.getTime();
          })
          .sort((a) => a.public_url ? -1 : 1)
          .map((project) => {

            const stage = project.stage;

            if (project.public_url) {
              return (
                <ProjectRow key={project.id}>
                  <ProjectRowLogo>
                    <Logo project={project} className="rounded-full" />
                  </ProjectRowLogo>
                  <Link href={project.public_url} target="_blank" className="hover:underline">
                    <span>{project.name}</span>
                    <ExternalLinkIcon
                      size={14}
                      className="inline-block ml-2"
                    />
                  </Link>
                  {stage && <Badge variant="secondary" className="ml-1 capitalize">{stage}</Badge>}
                </ProjectRow>
              )
            }

            return (
              <ProjectRow key={project.id}>
                <ProjectRowLogo>
                  <Logo project={project} className="rounded-full" />
                </ProjectRowLogo>
                <span>{project.name}</span>
                {stage && <Badge variant="secondary" className="ml-1 capitalize">{stage}</Badge>}
              </ProjectRow>
            );
          })
      }
    </ol>
  )
}
