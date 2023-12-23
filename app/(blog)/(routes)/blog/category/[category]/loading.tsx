import AllPostsSkeleton from '@/components/skeletons/posts-all'
import LastPostsSkeleton from '@/components/skeletons/posts-last'

const Loading = () => {
    return (
        <>
            <LastPostsSkeleton />
            <AllPostsSkeleton />
        </>
    )
}

export default Loading