'use client'

import { blog } from "@/api/blog"
import { Markdown } from "@/components/shared/markdown"
import Textarea from "@/components/shared/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Post } from "@/types/post"
import { auth } from "@/utils/app"
import { DateTime } from "luxon"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { BiLoaderAlt } from "react-icons/bi"

const PostForm = () => {
    const [user] = useAuthState(auth)
    const [name, setName] = useState<string>('')
    const [preview, setPreview] = useState<boolean>(false)
    const [content, setContent] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const { push } = useRouter()
    const regEx = /[\w\[\]`!@#$%\^&*()={}:;<>+'-]*/g
    const nameIdRegExp = /[^a-zA-Z 0-9 -]+/g
    const postId = name
        .toLowerCase()
        .replace(nameIdRegExp,'')
        .replaceAll(' ', '-')
        .replaceAll('--', '-')

    const validPostName = regEx.test(name)
    const clearForm = () => {
        setName('')
        setPreview(false)
        setContent('')
    }
    const createPost = async() => {
        if (user) {
            setLoading(true)
            const post: Post = {
                name: name,
                authorId: user.uid,
                createdAt: DateTime.now().toSeconds(),
                content: content,
            }
            const createdPost = await blog.addOne(postId, post)
            if (createdPost) {
                setLoading(false)
                clearForm()
                push(`/blog/${createdPost.doc_id}`)
            } else setLoading(false)
        }
    }
    return (
        <>
            <div className="flex flex-col w-full gap-2 py-6">
                <div className="flex items-center justify-between w-full h-fit">
                    { process.env.NODE_ENV === 'development' ? <span className="text-muted-foreground">Пост будет доступен по id: {postId}</span> : <div></div> }
                    <div className="flex items-center gap-2 w-fit h-fit">
                        <Button onClick={() => setPreview(!preview)} variant={preview ? 'default' : 'outline'}>Предпросмотр</Button>
                        <Button onClick={createPost} disabled={!name || !validPostName || !user} className="gap-2">
                            { loading && <BiLoaderAlt className='animate-spin' /> }
                            Опубликовать
                        </Button>
                    </div>
                </div>
                <Input placeholder='Введите название поста' className="px-0 text-3xl border-0 h-fit !ring-0"
                value={name} onChange={ e => setName(e.target.value ) } />
                <Separator />
                {
                    preview
                    ? <Markdown pageMode>{content}</Markdown>
                    : <Textarea value={content} onChange={ e => setContent(e.target.value) } placeholder="Введите содержание поста"  />
                }
            </div>
        </>
    )
}

export default PostForm