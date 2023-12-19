import { Separator } from "@/components/ui/separator"

const Loading = () => {
    return (
        <div style={{ height: 'calc(100dvh - 64px)' }} className='w-full mx-auto'>
            <div className="relative w-full min-h-[30vh] h-fit pt-6">
                <div className="z-20 flex flex-col px-6 max-w-7xl items-start w-full mx-auto h-fit">
                    <button className="w-44 h-9 rounded-md bg-muted animate-pulse" />
                    <div className="flex flex-col w-full gap-4 py-4">
                        <span className="w-44 h-5 rounded-md bg-muted animate-pulse" />
                    </div>
                    <div className="flex flex-col w-full gap-4 pt-4 pb-12">
                        <h1 className="w-1/2 lg:h-12 h-8 rounded-lg bg-muted animate-pulse" />
                        <span className="w-1/3 lg:h-7 h-6 rounded-md bg-muted animate-pulse"></span>
                    </div>
                </div>
            </div>
            <div className="w-full h-full flex mx-auto max-w-7xl lg:flex-row-reverse flex-col">
                <div className="flex lg:w-1/4 w-full items-start flex-col p-6 gap-2 mx-auto h-fit">
                    <div className="w-1/2 h-5 rounded-md bg-muted animate-pulse" />
                    <div className="w-full flex lg:flex-col flex-row lg:items-start items-center gap-2 overflow-x-auto">
                        <div className="w-fit h-9 flex items-center gap-2">
                            <div className="shrink-0 w-9 h-9 rounded-full bg-muted animate-pulse" />
                            <div className="w-full h-full gap-1 flex flex-col">
                                <div className="w-36 h-6 rounded-md bg-muted animate-pulse" />
                                <div className="w-24 h-4 rounded-sm bg-muted animate-pulse" />
                            </div>
                        </div>
                        <div className="w-full h-9 flex items-center gap-2">
                            <div className="shrink-0 w-9 h-9 rounded-full bg-muted animate-pulse" />
                            <div className="w-full h-full gap-1 flex flex-col">
                                <div className="w-36 h-6 rounded-md bg-muted animate-pulse" />
                                <div className="w-24 h-4 rounded-sm bg-muted animate-pulse" />
                            </div>
                        </div>
                        <div className="w-full h-9 flex items-center gap-2">
                            <div className="shrink-0 w-9 h-9 rounded-full bg-muted animate-pulse" />
                            <div className="w-full h-full gap-1 flex flex-col">
                                <div className="w-36 h-6 rounded-md bg-muted animate-pulse" />
                                <div className="w-24 h-4 rounded-sm bg-muted animate-pulse" />
                            </div>
                        </div>
                        <div className="w-full h-9 flex items-center gap-2">
                            <div className="shrink-0 w-9 h-9 rounded-full bg-muted animate-pulse" />
                            <div className="w-full h-full gap-1 flex flex-col">
                                <div className="w-36 h-6 rounded-md bg-muted animate-pulse" />
                                <div className="w-24 h-4 rounded-sm bg-muted animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
                <Separator className='lg:hidden block ' orientation='horizontal' />
                <div className="w-3/4 lg:border-r flex flex-col gap-1 px-6 pt-6 border-0">
                    <div className="w-1/2 h-6 rounded-md bg-muted animate-pulse" />
                    <div className="w-1/3 h-6 rounded-md bg-muted animate-pulse" />
                    <div className="w-1/2 h-6 rounded-md bg-muted animate-pulse" />
                    <div className="w-2/3 h-6 rounded-md bg-muted animate-pulse" />
                    <div className="w-1/3 h-6 rounded-md bg-muted animate-pulse" />
                    <div className="w-1/2 h-6 rounded-md bg-muted animate-pulse" />
                    <div className="w-2/3 h-6 rounded-md bg-muted animate-pulse" />
                </div>
            </div>
        </div>
    )
}

export default Loading