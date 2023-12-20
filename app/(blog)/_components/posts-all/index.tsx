import { blog } from "@/api/blog"
import PostCard from "./post-card"
import Controller from "./controller"

const AllPosts = async() => {
    const { count, data, next } = await blog.getAll()
    return (
        <div className="w-full max-w-7xl px-6 mx-auto">
            <div className="w-full py-12">
                <h1 className="text-3xl font-bold">Все посты</h1>
            </div>
            <div className="w-full h-fit grid lg:grid-cols-2 grid-cols-1 auto-rows-auto">
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