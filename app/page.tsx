import { Suspense } from "react"
import LastPostsSkeleton from "@/components/skeletons/posts-last"
import dynamic from "next/dynamic"
import HeaderSkeleton from "@/components/skeletons/header"
import AllPosts from "./(blog)/_components/posts-all"
import Footer from "@/components/shared/footer"
import CategoryTabs from "@/components/widgets/category-tabs"
const LastPosts = dynamic(() => import("./(blog)/_components/posts-last"), {
  loading: () => <LastPostsSkeleton />
})
const Header = dynamic(() => import("@/components/widgets/header"), {
  loading: () => <HeaderSkeleton />
})

const Home = async () => {
    return (
      <>
        <header className="border-b w-full h-16 shrink-0">
          <div className="w-full max-w-7xl h-full px-6 mx-auto flex items-center justify-between">
            <Suspense fallback={<HeaderSkeleton />}>
                <Header />
            </Suspense>
          </div>
        </header>
        <div className="px-6 max-w-6xl w-full mx-auto pt-24">
          <CategoryTabs />
        </div>
        <div style={{ height: 'calc(100dvh - 64px)' }}>
          <Suspense fallback={<LastPostsSkeleton />}>
            <LastPosts />
          </Suspense>
        </div>
        <AllPosts  />
        <Footer />
      </>
    )
}

export default Home