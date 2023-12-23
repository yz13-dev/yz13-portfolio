import dynamic from "next/dynamic"
import { Suspense } from "react"
import type { Categories } from "@/types/common"
import AllPostsSkeleton from "@/components/skeletons/posts-all"
import LastPostsSkeleton from "@/components/skeletons/posts-last"
import { categories } from "@/const/categories"
import CategoryTemplate from "@/components/templates/category/category.template"
import Loading from "./loading"
const AllPosts = dynamic(() => import("@/app/(blog)/_components/posts-all"), {
    loading: () => <AllPostsSkeleton />
})
const LastPosts = dynamic(() => import("@/app/(blog)/_components/posts-last"), {
    loading: () => <LastPostsSkeleton />
})

type Props =  {
    params: {
        category: string
    }
}
const page = ({ params }: Props) => {
    if (!(categories.includes(params.category))) return null
    return (
        <Suspense fallback={<Loading />}>
            <Suspense fallback={<LastPostsSkeleton />}>
                <CategoryTemplate.PinnedPosts>
                        <LastPosts category={params.category as keyof Categories} />
                </CategoryTemplate.PinnedPosts>
            </Suspense>
            <Suspense fallback={<AllPostsSkeleton />}>
                <CategoryTemplate.AllPosts>
                        <AllPosts category={params.category as keyof Categories} />
                </CategoryTemplate.AllPosts>
            </Suspense>
        </Suspense>
    )
}

export default page