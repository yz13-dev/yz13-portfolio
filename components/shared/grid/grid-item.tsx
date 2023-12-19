import GroupPostAuthorsMini from "@/app/(blog)/_components/post/post-author-group-mini"
import { DocPost } from "@/types/post"
import { DateTime } from "luxon"
import Link from "next/link"

type Props = {
    post: DocPost
    colSpan?: string
    rowSpan?: string
}
const GridItem = ({ post, colSpan, rowSpan }: Props) => {
    const now = DateTime.now()
    const postCreatedAtDate = DateTime.fromSeconds(post.createdAt)
    const isRecent = now.day === postCreatedAtDate.day && now.month === postCreatedAtDate.month && now.year === postCreatedAtDate.year
    const className = `relative w-full h-full md:min-h-full min-h-[24rem] relative ${rowSpan || ''} ${colSpan || ''} cursor-pointer border hover:border-muted-foreground transition-colors duration-500 rounded-lg group`
    return (
        <Link href={`/blog/${post.doc_id}`} className={className}>
            {
                isRecent &&
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg border bg-background text-xs text-muted-foreground">Новое!</span>
            }
            <div className="absolute top-0 left-0 w-full h-full transition-opacity duration-500 rounded-md bg-gradient-to-t from-background to-transparent group-hover:opacity-50" />
            <div className="absolute bottom-0 left-0 z-10 flex flex-col w-full gap-2 p-4 h-fit">
                <span className="text-xl font-semibold text-accent-foreground">{post.name}</span>
                <div className="flex items-center justify-between w-full h-fit">
                    <GroupPostAuthorsMini authors={post.authorsId} />
                    <span className="text-sm capitalize text-muted-foreground">{ DateTime.fromSeconds(post.createdAt).setLocale('ru').toFormat( 'dd LLL yyyy' ) }</span>
                </div>
            </div>
        </Link>
    )
}

export default GridItem