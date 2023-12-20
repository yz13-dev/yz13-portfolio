import { blog } from "@/api/blog"
import PostCard from "./post-card"
import Controller from "./controller"
import { Post } from "@/types/post"

type Props = {
    category?: Post['category']
}
const AllPosts = async({ category }: Props) => {
    const { count, data, next } = await blog.getAll(category)
    return (
        <div className="w-full max-w-6xl px-6 mx-auto">
            <div className="w-full py-12">
                <h1 className="text-3xl font-bold">Все посты</h1>
            </div>
            <div className="w-full h-fit grid lg:grid-cols-2 grid-cols-1 gap-y-6 gap-x-4 auto-rows-auto">
                {
                    data && data
                    .map(post => <PostCard key={'all' + '-' + post.doc_id} post={post} />)
                }
                <Controller count={count} next={next} />
            </div>
        </div>
    )
}

export default AllPosts