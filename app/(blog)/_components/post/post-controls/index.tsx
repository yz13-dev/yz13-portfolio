'use client'
import { blog } from '@/api/blog'
import { Button } from '@/components/ui/button'
import { DocPost, PartialDocPost } from '@/types/post'
import { auth } from '@/utils/app'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BiLoaderAlt, BiPencil, BiPin, BiTrashAlt } from 'react-icons/bi'

type Props = {
    postId: DocPost['doc_id']
    author: DocPost['authorsId']
    pinned: DocPost['pinned']
}
const PostControls = ({ postId, author, pinned }: Props) => {
    const [user] = useAuthState(auth)
    const [isPinned, setIsPinned] = useState<boolean>(pinned || false)
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
    const pinPost = async() => {
        setLoading(true)
        const post = await blog.getById(postId)
        if (post) {
            const updatedPost: PartialDocPost = {
                ...post,
                pinned: typeof post.pinned === 'boolean' ? !post.pinned : true
            }
            delete updatedPost.doc_id
            const approvedPost = await blog.updateOne(postId, updatedPost)
            setLoading(false)
            if (approvedPost && approvedPost.pinned !== undefined) setIsPinned(approvedPost.pinned)
        } else setLoading(false)
    }
    const editPost = () => {
        push(`/upload/post?postId=${postId}`)
    }
    return (
        <div className="flex items-center gap-2 w-fit h-fit">
            {
                isAuthor &&
                <>
                    <Button disabled={loading || !user} size='icon' variant={isPinned ? 'default' : 'outline'} onClick={pinPost}>
                        {
                            loading
                            ? <BiLoaderAlt className='animate-spin' />
                            : <BiPin />
                        }
                    </Button>
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