import useUser from "@/hooks/use-user"
import { Avatar, AvatarFallback, AvatarImage } from "@yz13/ui/avatar"
import { Button } from "@yz13/ui/button"
import { Link } from "react-router"

const isDev = import.meta.env.DEV


export default function () {

  const [user] = useUser()
  console.log(user)

  if (!user) {
    if (isDev) return (
      <Button asChild>
        <Link to="/auth/signin">
          Войти
        </Link>
      </Button>
    )
    return (
      <Button disabled>
        Войти
      </Button>
    )
  }
  return (
    <Avatar>
      <AvatarImage src={user?.avatar_url ?? undefined} alt={user.username} />
      <AvatarFallback className="uppercase">{user.username.slice(0, 2)}</AvatarFallback>
    </Avatar>
  )
}
