import { blog } from '@/api/blog'
import GridItem from '@/components/shared/grid/grid-item'
import GridTemplate from '@/components/shared/grid/grid-template'

const LastPosts = async() => {
    const posts = await blog.getLast()
    return (
      <div className="w-full max-w-5xl p-6 mx-auto">
        <div className="w-full py-6">
          <h1 className="text-3xl font-bold">Последние посты</h1>
        </div>
        <GridTemplate>
          {
            posts.map((post, index) => {
              const span = index === 0 
              ? 'row-span-full'
              : index === 1
              ? 'row-span-4'
              : index === 2
              ? 'row-span-3'
              : index === 3
              ? 'row-span-3'
              : index === 4
              ? 'row-span-2'
              : 'row-span-3'
              return <GridItem key={post.doc_id} post={post} rowSpan={span} />
            })
          }
        </GridTemplate>
    </div>
    )
}

export default LastPosts