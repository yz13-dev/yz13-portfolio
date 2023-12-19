import { blog } from '@/api/blog'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
const PostPage = dynamic(() => import('@/app/(blog)/_components/post/page'), {
    loading: () => <Loading />
}) 
import { Suspense } from 'react'
import Loading from './loading'
// import React from 'react'

type Props = {
    params: {
        postId: string
    }
}

export const generateMetadata = async({ params }: Props): Promise<Metadata> => {
    const post = await blog.getById(params.postId)
    if (!post) return {
        title: 'Not Found'
    }
    return {
        title: post.name,
        description: post.description,
    }

}

const page = async({ params }: Props) => {
    return (
        <Suspense fallback={<Loading />}>
            <PostPage postId={params.postId} />
        </Suspense>
    )
}

export default page