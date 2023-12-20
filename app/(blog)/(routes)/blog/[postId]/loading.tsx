import PostAuthor from "@/components/skeletons/post-author"
import PostTemplate from "@/components/templates/post/post.template"

const Loading = () => {
    return (
        <div style={{ height: 'calc(100dvh - 64px)' }} className='w-full mx-auto'>
            <PostTemplate>
                <PostTemplate.HeaderWrapper>
                    <PostTemplate.Header>
                        <button className="w-44 h-9 rounded-md bg-muted animate-pulse" />
                        <div className="flex flex-col w-full gap-4 py-4">
                            <span className="w-44 h-5 rounded-md bg-muted animate-pulse" />
                        </div>
                        <div className="flex flex-col w-full gap-4 pt-4 pb-12">
                            <h1 className="w-1/2 lg:h-12 h-8 rounded-lg bg-muted animate-pulse" />
                            <span className="w-1/3 lg:h-7 h-6 rounded-md bg-muted animate-pulse"></span>
                        </div>
                    </PostTemplate.Header>
                </PostTemplate.HeaderWrapper>
                <PostTemplate.Body>
                    <PostTemplate.Side>
                        <div className="w-1/2 h-5 rounded-md bg-muted animate-pulse" />
                        <div className="w-full flex lg:flex-col flex-row lg:items-start items-center gap-2 overflow-x-auto">
                            <PostAuthor />
                            <PostAuthor />
                            <PostAuthor />
                            <PostAuthor />
                        </div>
                    </PostTemplate.Side>
                    <PostTemplate.Separator />
                    <PostTemplate.Content>
                        <div className="w-1/2 h-6 rounded-md bg-muted animate-pulse" />
                        <div className="w-1/3 h-6 rounded-md bg-muted animate-pulse" />
                        <div className="w-1/2 h-6 rounded-md bg-muted animate-pulse" />
                        <div className="w-2/3 h-6 rounded-md bg-muted animate-pulse" />
                        <div className="w-1/3 h-6 rounded-md bg-muted animate-pulse" />
                        <div className="w-1/2 h-6 rounded-md bg-muted animate-pulse" />
                        <div className="w-2/3 h-6 rounded-md bg-muted animate-pulse" />
                    </PostTemplate.Content>
                </PostTemplate.Body>
            </PostTemplate>
        </div>
    )
}

export default Loading