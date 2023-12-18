'use client'
import { blog } from '@/api/blog'
import { Button } from '@/components/ui/button'
import { DocPost } from '@/types/post'
import { auth } from '@/utils/app'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiLeftArrowAlt, BiLoaderAlt, BiTrashAlt } from 'react-icons/bi'

type Props = {
    postId: DocPost['doc_id']
    author: DocPost['authorId']
}
const PostControls = ({ postId, author }: Props) => {
    const [user] = useAuthState(auth)
    const [loading, setLoading] = useState<boolean>(false)
    const isAuthor = user ? typeof author === 'string' ? author === user.uid : author.includes(user.uid) : false
    const { push } = useRouter()
    const deletePost = async() => {
        if (user) {
            setLoading(true)
            await blog.deleteOne(postId)
            setLoading(false)
            push('/')
        }
    }
    return (
        <div className="flex items-center justify-between w-full h-fit">
            <Button variant='link' asChild className='px-0 text-muted-foreground hover:text-accent-foreground hover:no-underline'>
                <Link href='/' className='flex items-center gap-2'><BiLeftArrowAlt />Вернуться на главную</Link>
            </Button>
            <div className="flex items-center gap-2 w-fit h-fit">
                {
                    isAuthor &&
                    <Button onClick={deletePost} disabled={!user} variant='destructive' size='icon'>
                        {
                            loading
                            ? <BiLoaderAlt className='animate-spin' />
                            : <BiTrashAlt />
                        }
                    </Button>
                }
            </div>
        </div>
    )
}

export default PostControls