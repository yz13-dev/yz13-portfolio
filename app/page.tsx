import { Suspense } from "react"
import LastPostsSkeleton from "@/components/skeletons/posts-last"
import dynamic from "next/dynamic"
import HeaderSkeleton from "@/components/skeletons/header"
import AllPosts from "./(blog)/_components/posts-all"
import Footer from "@/components/shared/footer"
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
        <div style={{ height: 'calc(100dvh - 64px)' }}>
          <Suspense fallback={<LastPostsSkeleton />}>
            <LastPosts />
          </Suspense>
        </div>
        <AllPosts />
        <Footer />
      </>
    )
}

export default Home