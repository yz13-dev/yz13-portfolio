import GridTemplate from "../shared/grid/grid-template"

const LastPostsSkeleton = () => {
    return (
      <div className="w-full max-w-5xl px-6 mx-auto">
        <div className="w-full py-6">
            <div className="w-1/2 rounded-md h-9 bg-muted animate-pulse" />
        </div>
        <GridTemplate>
            <div className="w-full h-full md:min-h-full min-h-[24rem] row-span-full cursor-pointer border bg-muted animate-pulse rounded-lg" />
            <div className="w-full h-full md:min-h-full min-h-[24rem] row-span-4 cursor-pointer border bg-muted animate-pulse rounded-lg" />
            <div className="w-full h-full md:min-h-full min-h-[24rem] row-span-3 cursor-pointer border bg-muted animate-pulse rounded-lg" />
            <div className="w-full h-full md:min-h-full min-h-[24rem] row-span-3 cursor-pointer border bg-muted animate-pulse rounded-lg" />
            <div className="w-full h-full md:min-h-full min-h-[24rem] row-span-2 cursor-pointer border bg-muted animate-pulse rounded-lg" />
        </GridTemplate>
      </div>
    )
}

export default LastPostsSkeleton