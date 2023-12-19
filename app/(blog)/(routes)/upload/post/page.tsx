import { blog } from '@/api/blog'
import PostForm from '../../../_components/Post'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { compareAuthor } from '@/helpers/author'
import { have_access } from '@/const/access-to-publish'

type Props = {
    searchParams: {
        postId?: string
    }
}
const page = async ({ searchParams }: Props) => {
    const cookiesList = cookies()
    const uidCookie = cookiesList.get('uid')
    const uid = uidCookie ? uidCookie.value : null
    const postId = searchParams.postId
    const post = postId ? await blog.getById(postId) : null
    // console.log(post, postId)
    if (!uid) redirect('/')
    if (uid && postId && !post) redirect('/upload/post')
    if (uid && post && postId && compareAuthor(uid, post.authorId) === false) redirect('/upload/post')
    if (uid && !have_access.includes(uid)) redirect('/')
    return (
        <div className='w-full h-full max-w-5xl px-6 mx-auto'>
            <PostForm preloadPost={post} postId={postId} />
        </div>
    )
}

export default page