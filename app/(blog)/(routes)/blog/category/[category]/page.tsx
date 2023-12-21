import LastPostsSkeleton from "@/components/skeletons/posts-last"
import { categories } from "@/const/categories"
import { Categories } from "@/types/common"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import AllPostsSkeleton from "@/components/skeletons/posts-all"
import CategoryTemplate from "@/components/templates/category/category.template"
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
        <>
            <CategoryTemplate.PinnedPosts>
                <Suspense fallback={<LastPostsSkeleton />}>
                    <LastPosts category={params.category as keyof Categories} />
                </Suspense>
            </CategoryTemplate.PinnedPosts>
            <CategoryTemplate.AllPosts>
                <Suspense fallback={<AllPostsSkeleton />}>
                    <AllPosts category={params.category as keyof Categories} />
                </Suspense>
            </CategoryTemplate.AllPosts>
        </>
    )
}

export default page