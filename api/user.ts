import { api_host } from "@/const/host"
import { authorizationHeader } from "@/helpers/headers"
import { ShortUserData } from "@/types/user"

export const user = {
    byId: {
        short: async(userId: string): Promise<ShortUserData | null> => {
            try {
                const headers = new Headers()
                const authHeader = authorizationHeader()
                headers.append('authorization', authHeader || '')
                const userRes = await fetch(`${api_host}/users/uid/${userId}`, { method: 'GET', cache: 'no-store', headers: headers })
                const user: ShortUserData | null = await userRes.json()
                return user
            } catch(e) {
                console.log(e)
                return null
            }
        },
    }
}