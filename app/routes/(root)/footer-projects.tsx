import { ProjectLogo } from "@/components/project-logo";
import { Skeleton } from "@yz13/ui/skeleton";
import { ExternalLinkIcon, MessageCircleWarningIcon } from "lucide-react";
import { Link } from "react-router";
import type { Project } from "./page";




type Props = {
  projects?: Project[]
}

export const FooterProjectsError = () => {
  return (
    <ul className="space-y-1">
      <li>
        <div className="size-9">
          <MessageCircleWarningIcon />
          <span>Ошибка при загрузке</span>
        </div>
      </li>
    </ul>
  )
}

export const FooterProjectsSkeleton = () => {
  return (
    <ul className="space-y-1">
      <li>
        <Skeleton className="w-full h-9" />
      </li>
      <li>
        <Skeleton className="w-full h-9" />
      </li>
      <li>
        <Skeleton className="w-full h-9" />
      </li>
    </ul>
  )
}

export default function ({ projects = [] }: Props) {
  return (
    <ul className="space-y-1">
      {
        projects
          .filter(project => !!project.public_url)
          .map(project => {
            return (
              <li key={project.id} className="flex items-center gap-2 h-9 group relative">
                <Link to={project.public_url!} className="absolute inset-0" />
                <div className="size-6 relative">
                  <ProjectLogo project={project} />
                </div>
                <span className="text-sm group-hover:underline text-muted-foreground group-hover:text-foreground">{project.name}</span>
                <ExternalLinkIcon size={12} />
              </li>
            )
          })
      }
    </ul>
  )
}
