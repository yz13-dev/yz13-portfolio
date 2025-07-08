import { Skeleton } from "@yz13/ui/skeleton";
import { ExternalLinkIcon } from "lucide-react";
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

export default async function () {

  const projects: any[] = []; // await getV1Store();


  if (!projects.length) {
    return (
      <span className="text-sm text-muted-foreground">Проекты не найдены</span>
    )
  }
  return (
    <ol className="list-inside list-decimal text-sm/6 text-left space-y-2">
      {
        projects
          .sort((a) => a.public_url ? -1 : 1)
          .map((project) => {

            if (project.public_url) {
              return (
                <li key={project.id} className="tracking-[-.01em]">
                  <Link href={project.public_url} target="_blank" className="hover:underline">
                    <span>{project.name}</span>
                    <ExternalLinkIcon
                      size={14}
                      className="inline-block ml-2"
                    />
                  </Link>
                </li>
              )
            }

            return (
              <li key={project.id} className="tracking-[-.01em]">
                <span>{project.name}</span>
              </li>
            );
          })
      }
    </ol>
  )
}
