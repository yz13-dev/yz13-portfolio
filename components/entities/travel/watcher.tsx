'use client'

import { auth } from "@/utils/app"
import { signInWithCustomToken } from "firebase/auth"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const TravelWatcher = () => {
    const { push } = useRouter()
    const path = usePathname()
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const paramsString = searchParams.toString()
    const updatedParams = paramsString.replace(`token=${token}`, '')
    const clearedUrl = `${path}?${updatedParams}`
    const signWithToken = async(token: string) => {
        await signInWithCustomToken(auth, token)
    }
    if (token) {
        signWithToken(token)
        push(clearedUrl)
    }
    return <></>
}

export default TravelWatcher