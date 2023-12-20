import { DocPost } from "@/types/post"
import { DateTime } from "luxon"
import Link from "next/link"
import GroupPostAuthorsMini from "../post/post-author-group-mini"

type Props = {
    post: DocPost
}
const PostCard = ({ post }: Props) => {
    const now = DateTime.now()
    const postCreatedAtDate = DateTime.fromSeconds(post.createdAt)
    const isRecent = now.day === postCreatedAtDate.day && now.month === postCreatedAtDate.month && now.year === postCreatedAtDate.year
    return (
        <article className="relative w-full h-fit flex flex-col gap-4">
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
    )
}

export default PostCard