import Header from "@/components/widgets/Header"
import { Suspense } from "react"
import LastPostsSkeleton from "@/components/skeletons/posts-last"
import dynamic from "next/dynamic"
const LastPosts = dynamic(() => import("./(blog)/_components/posts-last"), {
  loading: () => <LastPostsSkeleton />
})

const Home = async () => {
    return (
      <>
        <header className="flex items-center justify-between w-full h-16 px-6 shrink-0">
          <Header />
        </header>
        <Suspense fallback={<LastPostsSkeleton />}>
          <LastPosts />
        </Suspense>
      </>
    )
}

export default Home