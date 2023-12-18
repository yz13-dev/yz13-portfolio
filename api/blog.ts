import { api_host } from "@/const/host"
import { authorizationHeader } from "@/helpers/headers"
import { DocPost, Post } from "@/types/post"

export const blog = {
    getLast: async() => {},
    getById: async(postId: string) => {
        try {
            const headers = new Headers()
            const authHeader = authorizationHeader()
            headers.append('authorization', authHeader || '')
            const url = `${api_host}/portfolio/${postId}`
            const res = await fetch(url, { method: "GET", headers: headers })
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