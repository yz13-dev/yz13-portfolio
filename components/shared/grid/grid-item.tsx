import PostAuthor from "@/app/(blog)/_components/Post/post-author"
import { DocPost } from "@/types/post"
import { DateTime } from "luxon"
import Link from "next/link"

type Props = {
    post: DocPost
    colSpan?: string
    rowSpan?: string
}
const GridItem = ({ post, colSpan, rowSpan }: Props) => {
    const className = `w-full h-full md:min-h-full min-h-[24rem] relative ${rowSpan || ''} ${colSpan || ''} cursor-pointer border hover:border-muted-foreground transition-colors duration-500 rounded-lg group`
    return (
        <Link href={`/blog/${post.doc_id}`} className={className}>
            <div className="absolute top-0 left-0 w-full h-full transition-opacity duration-500 rounded-md bg-gradient-to-t from-background to-transparent group-hover:opacity-50" />
            <div className="absolute bottom-0 left-0 z-10 flex flex-col w-full gap-2 p-4 h-fit">
                <span className="text-xl font-semibold text-accent-foreground">{post.name}</span>
                <div className="flex items-center justify-between w-full h-fit">
                    { 
                        typeof post.authorId === 'string' 
                        ? <PostAuthor uid={post.authorId} />
                        : <></>
                     }
                    <span className="text-sm capitalize text-muted-foreground">{ DateTime.fromSeconds(post.createdAt).setLocale('ru').toFormat( 'dd LLL yyyy' ) }</span>
                </div>
            </div>
        </Link>
    )
}

export default GridItem