'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { auth } from "@/utils/app"
import Link from "next/link"
import { useAuthState } from "react-firebase-hooks/auth"

const User = () => {
    const [user, loading] = useAuthState(auth)
    if (loading) return null
    if (!user) return <Button size='sm' asChild variant='outline'>
        <Link href='/login'>Войти</Link>
    </Button>
    return (
        <Avatar>
            <AvatarImage src={user.photoURL || undefined} alt="@shadcn" />
            <AvatarFallback>{user.displayName ? user.displayName?.slice(0, 2) : 'UR'}</AvatarFallback>
        </Avatar>
    )
}

export default User