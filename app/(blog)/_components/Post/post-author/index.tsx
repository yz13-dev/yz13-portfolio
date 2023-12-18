import { user as userAPI } from "@/api/user"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Props = {
    uid: string
}
const PostAuthor = async({ uid }: Props) => {
    const user = await userAPI.byId.short(uid)
    if (!user) return null
    return (
      <div className="flex items-center gap-2 w-fit h-fit">
        <Avatar className="w-7 h-7">
          <AvatarImage src={user.photoUrl} alt={'@' + user.displayName} />
          <AvatarFallback>{user.displayName ? user.displayName?.slice(0, 2) : 'UR'}</AvatarFallback>
        </Avatar>
        <span className="text-base font-medium text-accent-foreground">{user.displayName}</span>
    </div>
    )
}

export default PostAuthor