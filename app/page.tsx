import { blog } from "@/api/blog"
import GridItem from "@/components/shared/grid/grid-item"
import GridTemplate from "@/components/shared/grid/grid-template"
import Header from "@/components/widgets/Header"

const Home = async () => {
    const posts = await blog.getLast()
    console.log(posts)
    return (
      <>
        <header className="flex items-center justify-between w-full h-16 px-6 shrink-0">
          <Header />
        </header>
        <div className="w-full max-w-5xl px-6 mx-auto">
            <div className="w-full py-6">
              <h1 className="text-3xl font-bold">Последние новости</h1>
            </div>
            {/* <GridItem rowSpan='row-span-full' /> */}
            {/* <GridItem rowSpan='row-span-4' /> */}
            {/* <GridItem rowSpan='row-span-3' /> */}
            {/* <GridItem rowSpan='row-span-3' /> */}
            {/* <GridItem rowSpan='row-span-2' /> */}
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
      </>
    )
}

export default Home