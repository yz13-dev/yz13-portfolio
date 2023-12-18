'use client'
import { Button } from "@/components/ui/button"
import { auth } from "@/utils/app"
import Link from "next/link"
import { useAuthState } from "react-firebase-hooks/auth"
import UserDropdown from "./user-dropdown"

const User = () => {
    const [user, loading] = useAuthState(auth)
    if (loading) return null
    if (!user) return <Button size='sm' asChild variant='outline'>
        <Link href='/login'>Войти</Link>
    </Button>
    return (
        <UserDropdown user={user} />
    )
}

export default User