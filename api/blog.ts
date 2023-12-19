import { api_host } from "@/const/host"
import { authorizationHeader } from "@/helpers/headers"
import { DocPost, Post } from "@/types/post"

export const blog = {
    getLast: async() => {
        try {
            const headers = new Headers()
            const authHeader = authorizationHeader()
            headers.append('authorization', authHeader || '')
            const url = `${api_host}/portfolio/last?limit=5`
            const res = await fetch(url, { method: "GET", headers: headers, cache: 'no-store' })
            if (res.ok) {
                const posts = await res.json() as DocPost[]
                return posts
            }
            return []
        } catch(e) {
            console.log(e)
            return []
        }
    },
    getById: async(postId: string) => {
        try {
            const headers = new Headers()
            const authHeader = authorizationHeader()
            headers.append('authorization', authHeader || '')
            const url = `${api_host}/portfolio/${postId}`
            const res = await fetch(url, { method: "GET", headers: headers, cache: 'no-store' })
            if (res.ok) return await res.json() as DocPost | null
            return null
        } catch(e) {
            console.log(e)
            return null
        }
    },
    deleteOne: async(postId: string): Promise<true | null> => {
        try {
            const headers = new Headers()
            const authHeader = authorizationHeader()
            headers.append('authorization', authHeader || '')
            const url = `${api_host}/portfolio/${postId}`
            const res = await fetch(url, { method: "DELETE", headers: headers })
            if (res.ok) return Boolean(await res.text()) as true | null
            return null
        } catch(e) {
            console.log(e)
            return null
        }
    },
    updateOne: async(postId: string, post: Post) => {
        try {
            const headers = new Headers()
            const authHeader = authorizationHeader()
            headers.append('Content-Type', 'application/json')
            headers.append('authorization', authHeader || '')
            const body = JSON.stringify(post, null, 2)
            const url = `${api_host}/portfolio/${postId}`
            const res = await fetch(url, { method: "PATCH", body: body, headers: headers })
            if (res.ok) return await res.json() as DocPost | null
            return null
        } catch(e) {
            console.log(e)
            return null
        }
    },
    addOne: async(postId: string, post: Post) => {
        try {
            const headers = new Headers()
            const authHeader = authorizationHeader()
            headers.append('Content-Type', 'application/json')
            headers.append('authorization', authHeader || '')
            const body = JSON.stringify(post, null, 2)
            const url = `${api_host}/portfolio/${postId}`
            const res = await fetch(url, { method: "POST", body: body, headers: headers })
            if (res.ok) return await res.json() as DocPost | null
            return null
        } catch(e) {
            console.log(e)
            return null
        }
    }
}