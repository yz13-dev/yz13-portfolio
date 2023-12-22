'use client'
import { Button } from "@/components/ui/button"
import { auth } from "@/utils/app"
import Link from "next/link"
import UserDropdown from "./user-dropdown"
import { useCookieState } from 'ahooks'
import { useEffect } from "react"
import { useAuthState } from "@/hooks/useAuthState"

const User = () => {
    const [user] = useAuthState(auth)
    const [_, setCookie] = useCookieState('uid')
    useEffect(() => {
        if (user) {
            setCookie(user.uid)
        } else setCookie('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user])
    if (!user) return <Button size='sm' asChild variant='outline'>
        <Link href='/login'>Войти</Link>
    </Button>
    return (
        <UserDropdown user={user} />
    )
}

export default User