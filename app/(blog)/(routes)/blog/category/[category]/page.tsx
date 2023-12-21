import LastPostsSkeleton from "@/components/skeletons/posts-last"
import { categories } from "@/const/categories"
import { Categories } from "@/types/common"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import AllPostsSkeleton from "@/components/skeletons/posts-all"
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
            <Suspense fallback={<LastPostsSkeleton />}>
                <LastPosts category={params.category as keyof Categories} />
            </Suspense>
            <Suspense fallback={<AllPostsSkeleton />}>
                <AllPosts category={params.category as keyof Categories} />
            </Suspense>
        </>
    )
}

export default page