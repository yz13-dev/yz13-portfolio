import useProjects from "@/hooks/use-projects"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@yz13/ui/navigation-menu"
import type { ComponentProps } from "react"
import { Link } from "react-router"

const isDev = import.meta.env.NODE_ENV === "development"

export type Props = ComponentProps<"nav">
export default function ({ className = "", ...props }: Props) {

  const [projects, loading] = useProjects();

  if (!isDev) return;
  return (
    <nav className={className} {...props}>
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Продукты</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-md grid grid-cols-2 gap-3 *:rounded-md">
                <li className="w-full h-16 bg-secondary"></li>
                <li className="w-full h-16 bg-secondary"></li>
                <li className="w-full h-16 bg-secondary"></li>
                <li className="w-full h-16 bg-secondary"></li>
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
