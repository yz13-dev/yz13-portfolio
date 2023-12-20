'use client'
import { Button } from "@/components/ui/button"
import { DocPost } from "@/types/post"
import { useState } from "react"
import { BiLoaderAlt } from "react-icons/bi"
import PostCard from "./post-card"
import { authorizationHeader } from "@/helpers/headers"
import { api_host } from "@/const/host"
import { ChunkResponse } from "@/types/common"

type Props = {
    next: string
    count: number
}
const Controller = ({ count, next }: Props) => {
    const [data, setData] = useState<DocPost[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [nextLink, setNextLink] = useState<string>(next)
    const fetchNext = async() => {
        try {
            if (!nextLink) throw new Error('next link is empty')
            setLoading(true)
            const headers = new Headers()
            const authHeader = authorizationHeader()
            headers.append('authorization', authHeader || '')
            const url = nextLink.startsWith('/') ? `${api_host}${nextLink}` : `${api_host}/${nextLink}`
            const res = await fetch(url, { headers: headers })
            if (res.ok) {
                const fetched = await res.json() as ChunkResponse<DocPost[]>
                setData([...data, ...fetched.data])
                setNextLink(fetched.next)
            }
        } catch(e) {
            setNextLink('')
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            { data && data.map(post => <PostCard key={'all' + '-' + post.doc_id} post={post} />) }
            {
                count > 10 &&
                <div className="w-full col-span-full flex py-6 items-center justify-center">
                    <Button onClick={fetchNext} disabled={loading || count <= 10} size='sm' variant='outline' className="gap-2">
                        { loading && <BiLoaderAlt className='animate-spin' /> }
                        { loading ? 'Подгружаем...' : 'Загрузить больше' }
                    </Button>
                </div>
            }
        </>
    )
}

export default Controller