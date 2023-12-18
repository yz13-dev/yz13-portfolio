'use client'
import { Button } from "@/components/ui/button"
import { auth } from "@/utils/app"
import Link from "next/link"
import { useAuthState } from "react-firebase-hooks/auth"
import UserDropdown from "./user-dropdown"

const User = () => {
    const [user, loading] = useAuthState(auth)
    if (loading) return <div className="rounded-full w-9 h-9 bg-muted animate-pulse shrink-0" />
    if (!user) return <Button size='sm' asChild variant='outline'>
        <Link href='/login'>Войти</Link>
    </Button>
    return (
        <UserDropdown user={user} />
    )
}

export default User