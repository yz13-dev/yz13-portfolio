import useUser, { useRefreshUser } from "@/hooks/use-user"
import { postAuthV1Logout } from "@yz13/api"
import { Avatar, AvatarFallback, AvatarImage } from "@yz13/ui/avatar"
import { Button } from "@yz13/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@yz13/ui/dropdown-menu"
import { Skeleton } from "@yz13/ui/skeleton"
import { LogInIcon, LogOutIcon } from "lucide-react"
import type { ReactNode } from "react"
import { Link, useNavigate } from "react-router"


export default function () {

  const [user, loading] = useUser()

  if (loading) return <Skeleton className="h-12 w-28" />
  if (!user)
    return (
      <Button disabled className="h-12 text-lg w-fit [&>svg]:!size-5" size="lg" asChild>
        <Link to="/auth/signin">
          Войти
          <LogInIcon />
        </Link>
      </Button>
    )
  return (
    <UserDropdown>
      <Avatar className="size-12">
        <AvatarImage src={user?.avatar_url ?? undefined} alt={user.username} />
        <AvatarFallback className="uppercase">{user.username.slice(0, 2)}</AvatarFallback>
      </Avatar>
    </UserDropdown>
  )
}


type UserDropdownProps = {
  children: ReactNode
}
const UserDropdown = ({ children }: UserDropdownProps) => {

  const [refresh] = useRefreshUser()
  const nav = useNavigate()

  const signout = async () => {
    try {
      await postAuthV1Logout()

      refresh()

      nav("/")

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={!!children}>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 *:h-10 *:text-base *:[&>svg]:!size-5">
        {/*<DropdownMenuItem>
          <SettingsIcon />
          <span>Настройки</span>
        </DropdownMenuItem>*/}
        <DropdownMenuItem onClick={signout}>
          <LogOutIcon />
          <span>Выйти</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
