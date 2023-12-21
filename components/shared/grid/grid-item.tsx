import { file } from "@/api/file"
import GroupPostAuthorsMini from "@/app/(blog)/_components/post/post-author-group-mini"
import { getCategoryName } from "@/const/categories"
import { Categories } from "@/types/common"
import { DocPost } from "@/types/post"
import { DateTime } from "luxon"
import Image from "next/image"
import Link from "next/link"

type Props = {
    post: DocPost
    colSpan?: string
    rowSpan?: string
}
const GridItem = async({ post, colSpan, rowSpan }: Props) => {
    const thumbnail = await file.static.get('placeholders/article-thumbnail-placeholder.jpg') 
    const now = DateTime.now()
    const postCreatedAtDate = DateTime.fromSeconds(post.createdAt)
    const isRecent = now.day === postCreatedAtDate.day && now.month === postCreatedAtDate.month && now.year === postCreatedAtDate.year
    const className = `relative w-full h-full md:min-h-full min-h-[24rem] shrink-0 overflow-hidden relative ${colSpan || ''} cursor-pointer border hover:border-muted-foreground transition-colors duration-500 rounded-lg group`
    return (
        <Link style={{ gridRow: rowSpan }}
        href={`/blog/${post.doc_id}`} className={className}>
            <div className="w-fit gap-2 h-fit z-20 flex items-center justify-end top-3 right-3 absolute">
                {
                    isRecent &&
                    <span className="w-fit h-fit  px-2.5 py-1 rounded-lg border bg-background text-xs text-muted-foreground">Новое!</span>
                }
                {
                    post.category &&
                    <span className="w-fit h-fit px-2.5 py-1 rounded-lg border bg-background text-xs text-muted-foreground">{getCategoryName(post.category as keyof Categories)}</span>
                }
            </div>
            <div className="relative w-full h-full rounded-md flex items-center justify-center">
                { 
                    thumbnail && 
                    <Image src={thumbnail} fill alt='article thumbnail'
                    className="object-center group-hover:scale-110 duration-500 transition-transform object-cover"/>
                }
            </div>
            <div className="absolute top-0 left-0 w-full h-full transition-opacity duration-500 rounded-md bg-gradient-to-t from-background to-transparent group-hover:opacity-50" />
            <div className="absolute bottom-0 left-0 z-10 flex flex-col w-full gap-2 p-4 h-fit">
                <h2 className="text-xl font-semibold text-accent-foreground">{post.name}</h2>
                { post.description && <span className="lg:inline hidden text-base text-muted-foreground">{post.description}</span> }
                <div className="flex items-center justify-between w-full h-fit">
                    <GroupPostAuthorsMini authors={post.authorsId} />
                    <span className="text-sm capitalize text-muted-foreground">{ DateTime.fromSeconds(post.createdAt).setLocale('ru').toFormat( 'dd MMMM yyyy' ) }</span>
                </div>
            </div>
        </Link>
    )
}

export default GridItem