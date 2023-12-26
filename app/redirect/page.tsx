import { auth } from '@/api/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type Props = {
    searchParams: {
        path?: string
        link: string
    }
}
const page = async({ searchParams }: Props) => {
    const cookiesList = cookies()
    const uidCookie = cookiesList.get('uid')
    const uid = uidCookie ? uidCookie.value : null
    // generate token from current uid in cookies
    // after add query param into url like, {url}?token={token}
    // then redirect to target url with new params
    // on other side, i need to add token watcher that read data from token param, save it and remove it from url

    const token = uid ? await auth.travel(uid) : null
    if (!token) return redirect(searchParams.link + (searchParams.path ? searchParams.path : ''))
    return redirect(searchParams.link + (searchParams.path ? searchParams.path : '') + `?token=${token}`)
}

export default page