import { blog } from '@/api/blog'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { BiLeftArrowAlt } from 'react-icons/bi'
import PostAuthor from '../(constructor)/_components/Post/post-author'
import { Markdown } from '@/components/shared/markdown'
// import React from 'react'

type Props = {
    params: {
        postId: string
    }
}
const page = async({ params }: Props) => {
    const post = await blog.getById(params.postId)
    if (!post) return null
    return (
        <>
            <div className="w-full p-6 border-b h-fit bg-gradient-to-b from-muted to-transparent">
                <div className="flex flex-col items-start w-full mx-auto max-w-7xl h-fit">
                    <Button variant='link' asChild className='px-0 text-muted-foreground hover:text-accent-foreground hover:no-underline'>
                        <Link href='/' className='flex items-center gap-2'><BiLeftArrowAlt />Вернуться на главную</Link>
                    </Button>
                    <div className="flex flex-col items-center justify-center w-full gap-4 py-12">
                        <h1 className='text-3xl font-semibold text-center normal-case text-accent-foreground'>{post.name}</h1>
                        { post.description && <span className='text-sm text-center text-muted-foreground'>description for post</span> }
                    </div>
                    <div className="flex items-center gap-2 mx-auto w-fit h-fit">
                        <span className='text-muted-foreground'>by</span>
                        { 
                            typeof post.authorId === 'string' && 
                            <PostAuthor uid={post.authorId} />
                        }
                    </div>
                </div>

            </div>
            <div className="w-full p-6 h-fit">
                <div className="w-full mx-auto max-w-7xl">
                    <Markdown pageMode>{post.content}</Markdown>
                </div>
            </div>
        </>
    )
}

export default page