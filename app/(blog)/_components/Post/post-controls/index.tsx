'use client'
import { blog } from '@/api/blog'
import { Button } from '@/components/ui/button'
import { DocPost } from '@/types/post'
import { auth } from '@/utils/app'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiLeftArrowAlt, BiLoaderAlt, BiPencil, BiTrashAlt } from 'react-icons/bi'

type Props = {
    postId: DocPost['doc_id']
    author: DocPost['authorsId']
}
const PostControls = ({ postId, author }: Props) => {
    const [user] = useAuthState(auth)
    const [loading, setLoading] = useState<boolean>(false)
    const isAuthor = user ? author.includes(user.uid) : false
    const { push } = useRouter()
    const deletePost = async() => {
        if (user) {
            setLoading(true)
            await blog.deleteOne(postId)
            setLoading(false)
            push('/')
        }
    }
    const editPost = () => {
        push(`/upload/post?postId=${postId}`)
    }
    return (
        <div className="flex items-center gap-2 w-fit h-fit">
            {
                isAuthor &&
                <>
                    <Button disabled={loading || !user} className='gap-2' size='sm' variant='outline' onClick={editPost}>
                        {
                            loading
                            ? <BiLoaderAlt className='animate-spin' />
                            : <BiPencil />
                        }
                        <span>Редактировать</span>
                    </Button>
                    <Button disabled={loading || !user} className='gap-2' size='sm' variant='destructive' onClick={deletePost}>
                        {
                            loading
                            ? <BiLoaderAlt className='animate-spin' />
                            : <BiTrashAlt />
                        }
                        <span>Удалить</span>
                    </Button>
                </>
            }
        </div>
    )
}

export default PostControls