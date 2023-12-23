import PostAuthorSkeleton from "./post-author"

const AllPostsSkeleton = () => {
    return (
        <div className="w-full max-w-6xl px-6 mx-auto">
            <div className="w-full py-6">
                <div className="w-1/2 rounded-md h-9 bg-muted animate-pulse" />
            </div>
            <div className="w-full h-fit grid md:grid-cols-2 grid-cols-1 gap-y-16 gap-x-8 my-6 auto-rows-auto">
                <div className="relative w-full h-fit flex flex-col gap-4">
                    <div className="w-24 h-6 rounded-md bg-muted animate-pulse" />
                    <div className="w-1/2 rounded-md h-9 bg-muted animate-pulse" />
                    <div className="w-2/3 rounded-md h-6 bg-muted animate-pulse" />
                    <div className="w-full h-fit flex items-center justify-start gap-4">
                        <PostAuthorSkeleton hideName />
                        <div className="w-24 h-6 rounded-md bg-muted animate-pulse" />
                    </div>
                </div>

                <div className="relative w-full h-fit flex flex-col gap-4">
                    <div className="w-24 h-6 rounded-md bg-muted animate-pulse" />
                    <div className="w-1/2 rounded-md h-9 bg-muted animate-pulse" />
                    <div className="w-2/3 rounded-md h-6 bg-muted animate-pulse" />
                    <div className="w-full h-fit flex items-center justify-start gap-4">
                        <PostAuthorSkeleton hideName />
                        <div className="w-24 h-6 rounded-md bg-muted animate-pulse" />
                    </div>
                </div>

                <div className="relative w-full h-fit flex flex-col gap-4">
                    <div className="w-24 h-6 rounded-md bg-muted animate-pulse" />
                    <div className="w-1/2 rounded-md h-9 bg-muted animate-pulse" />
                    <div className="w-2/3 rounded-md h-6 bg-muted animate-pulse" />
                    <div className="w-full h-fit flex items-center justify-start gap-4">
                        <PostAuthorSkeleton hideName />
                        <div className="w-24 h-6 rounded-md bg-muted animate-pulse" />
                    </div>
                </div>

                <div className="relative w-full h-fit flex flex-col gap-4">
                    <div className="w-24 h-6 rounded-md bg-muted animate-pulse" />
                    <div className="w-1/2 rounded-md h-9 bg-muted animate-pulse" />
                    <div className="w-2/3 rounded-md h-6 bg-muted animate-pulse" />
                    <div className="w-full h-fit flex items-center justify-start gap-4">
                        <PostAuthorSkeleton hideName />
                        <div className="w-24 h-6 rounded-md bg-muted animate-pulse" />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AllPostsSkeleton