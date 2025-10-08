import useProjects from "@/hooks/use-projects";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@yz13/ui/navigation-menu";
import { cn } from "@yz13/ui/utils";
import { ArrowRightIcon, ExternalLinkIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { Link } from "react-router";

// const isDev = import.meta.env.DEV;

export type Props = ComponentProps<"nav">
export default function ({ className = "", ...props }: Props) {

  const [projects, loading] = useProjects();

  const isEven = projects.length % 2 === 0;

  return (
    <nav className={cn("z-10", className)} {...props}>
      <NavigationMenu viewport={true}>
        <NavigationMenuList>
          <NavigationMenuItem className="md:list-item hidden">
            <NavigationMenuTrigger>Проекты</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-lg grid grid-cols-2 gap-3 *:rounded-md *:size-full">
                {
                  projects
                    .sort((a, b) => {
                      if (a.public_url && !b.public_url) return -1;
                      if (!a.public_url && b.public_url) return 1;
                      return (b.description?.length ?? 0) - (a.description?.length ?? 0);
                    })
                    .map(project => {
                      const publicUrl = project.public_url ?? null;
                      return (
                        <li key={project.id} className="hover:bg-secondary bg-secondary/60 transition-colors p-3 relative">
                          {publicUrl && <Link to={publicUrl} className="absolute inset-0" />}
                          <div className="w-full items-center gap-2 flex">
                            <span className="text-lg font-medium">{project.name}</span>
                            {
                              publicUrl &&
                              <ExternalLinkIcon className="size-4" />
                            }
                          </div>
                          <span className="text-sm text-muted-foreground line-clamp-2">{project.description}</span>
                        </li>
                      )
                    })
                }
                {
                  isEven
                    ? <li className="col-span-full hover:bg-secondary bg-secondary/60 transition-colors p-3 relative">
                      <Link to="/apps" className="absolute inset-0" />
                      <div className="size-full flex items-center justify-between">
                        <span className="text-lg font-medium">Все проекты</span>
                        <ArrowRightIcon className="size-4" />
                      </div>
                    </li>
                    : <li className="hover:bg-secondary bg-secondary/60 transition-colors p-3 relative">
                      <Link to="/apps" className="absolute inset-0" />
                      <div className="size-full flex items-center justify-between">
                        <span className="tgext-lg font-medium">Все проекты</span>
                        <ArrowRightIcon className="size-4" />
                      </div>
                    </li>

                }
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="md:hidden list-item">
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link to="/apps">Проекты</Link>
            </NavigationMenuLink>
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
