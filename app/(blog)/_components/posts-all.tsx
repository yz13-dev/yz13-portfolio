import { blog } from "@/api/blog"
import GroupPostAuthorsMini from "./post/post-author-group-mini"
import { DateTime } from "luxon"
import Link from "next/link"

const AllPosts = async() => {
    const posts = await blog.getAll()
    return (
        <div className="w-full max-w-5xl px-6 mx-auto">
            <div className="w-full py-12">
                <h1 className="text-3xl font-bold">Все посты</h1>
            </div>
            <div className="w-full h-fit grid lg:grid-cols-2 grid-cols-1 auto-rows-auto">
            {
                posts
                .map( post => {
                    const now = DateTime.now()
                    const postCreatedAtDate = DateTime.fromSeconds(post.createdAt)
                    const isRecent = now.day === postCreatedAtDate.day && now.month === postCreatedAtDate.month && now.year === postCreatedAtDate.year
                    return <article key={'all' + '-' + post.doc_id} className="relative w-full h-fit flex flex-col gap-4">
                        {
                            isRecent &&
                            <span className="px-2.5 w-fit h-fit py-1 rounded-lg border bg-background text-xs text-muted-foreground">Новое!</span>
                        }
                        <Link href={`/blog/${post.doc_id}`} className="text-2xl font-bold">{post.name}</Link>
                        { post.description && <span className='text-base font-light text-muted-foreground'>{ post.description }</span> }
                        <div className="w-full h-fit flex items-center justify-start gap-4">
                            <GroupPostAuthorsMini authors={post.authorsId} />
                            <span className="text-sm capitalize text-muted-foreground">
                                { DateTime.fromSeconds(post.createdAt).setLocale('ru').toFormat( 'dd LLL yyyy' ) }
                            </span>
                        </div>
                    </article> 
                }
                )
            }
            </div>
        </div>
    )
}

export default AllPosts