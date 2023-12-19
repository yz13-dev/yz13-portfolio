import { api_host } from "@/const/host"
import { authorizationHeader } from "@/helpers/headers"

export const file = {
    static: {
        get: async(path: string) => {
            try {
                const headers = new Headers()
                const authHeader = authorizationHeader()
                headers.append('authorization', authHeader || '')
                const stablePath = path.startsWith('/') ? path : `/${path}`
                const url = `${api_host}${stablePath}`
                const res = await fetch(url, { headers: headers })
                if (res.ok) {
                    const body = res.body ? res.body.getReader() : null
                    if (body) {
                        const file = await body.read()
                        const content_type = res.headers.get('content-type')
                        if (file.value && content_type) {
                            const base64String = btoa(String.fromCharCode(...new Uint8Array(file.value)))
                            if (!base64String) throw new Error('Error')
                            const result = `data:${content_type};base64,${base64String}`
                            return result
                        } else throw new Error('Error')
                    } else throw new Error('Error')
                } return null
            } catch(e) {
                console.log(e)
                return null
            }
        }
    }
}