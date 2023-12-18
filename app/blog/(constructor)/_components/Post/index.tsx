'use client'

import { Markdown } from "@/components/shared/markdown"
import Textarea from "@/components/shared/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

const PostForm = () => {
    const [name, setName] = useState<string>('')
    const [preview, setPreview] = useState<boolean>(false)
    const [content, setContent] = useState<string>('')
    const regEx = /[\w\[\]`!@#$%\^&*()={}:;<>+'-]*/g
    const nameIdRegExp = /[^a-zA-Z 0-9]+/g
    const postId = JSON.stringify(
        name
        .toLowerCase()
        .replace(nameIdRegExp,'')
        .replaceAll(' ', '-')
        .replaceAll('--', '-')
    )
    const validPostName = regEx.test(name)
    return (
        <>
            <div className="flex flex-col w-full gap-2 py-6">
                <div className="flex items-center justify-between w-full h-fit">
                    <span className="text-muted-foreground">Пост будет доступен по id: {postId}</span>
                    <div className="flex items-center gap-2 w-fit h-fit">
                        <Button onClick={() => setPreview(!preview)} variant={preview ? 'default' : 'outline'}>Предпросмотр</Button>
                        <Button disabled={!validPostName}>Опубликовать</Button>
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