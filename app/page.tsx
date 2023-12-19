import { Suspense } from "react"
import LastPostsSkeleton from "@/components/skeletons/posts-last"
import dynamic from "next/dynamic"
import HeaderSkeleton from "@/components/skeletons/header"
const LastPosts = dynamic(() => import("./(blog)/_components/posts-last"), {
  loading: () => <LastPostsSkeleton />
})
const Header = dynamic(() => import("@/components/widgets/Header"), {
  loading: () => <HeaderSkeleton />
})

const Home = async () => {
    return (
      <>
        <header className="flex items-center justify-between w-full h-16 px-6 shrink-0">
          <Suspense fallback={<HeaderSkeleton />}>
              <Header />
          </Suspense>
        </header>
        <Suspense fallback={<LastPostsSkeleton />}>
          <LastPosts />
        </Suspense>
      </>
    )
}

export default Home