import useProjects from "@/hooks/use-projects";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@yz13/ui/navigation-menu";
import { cn } from "@yz13/ui/utils";
import { ExternalLinkIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { Link } from "react-router";

const isDev = import.meta.env.DEV;

export type Props = ComponentProps<"nav">
export default function ({ className = "", ...props }: Props) {

  const [projects, loading] = useProjects();

  if (!isDev) return;
  return (
    <nav className={cn("z-10", className)} {...props}>
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Продукты</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-lg grid grid-cols-2 gap-3 *:rounded-md">
                {
                  projects
                    .map(project => {
                      return (
                        <li key={project.id} className="w-full h-fit bg-secondary p-2">
                          <div className="w-full items-center gap-2 flex">
                            <span className="text-lg font-medium">{project.name}</span>
                            <ExternalLinkIcon className="size-4" />
                          </div>
                          <span className="text-sm text-muted-foreground line-clamp-2">{project.description}</span>
                        </li>
                      )
                    })
                }
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link to="/pricing">Цены</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}
