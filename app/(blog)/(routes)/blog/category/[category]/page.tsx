import LastPostsSkeleton from "@/components/skeletons/posts-last"
import { categories } from "@/const/categories"
import { Categories } from "@/types/common"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import AllPosts from "@/app/(blog)/_components/posts-all"
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
            <AllPosts category={params.category as keyof Categories} />
        </>
    )
}

export default page