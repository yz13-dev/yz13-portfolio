
const HeaderSkeleton = () => {
    return (
        <div className='flex items-center justify-between w-full h-full'>
            <div className="flex items-center gap-2 w-fit h-fit">
                <div className="w-6 h-6 rounded-full bg-muted animate-pulse" />
                <span className="text-xl text-muted animate-pulse">\</span>
                <h1 className="text-xl font-semibold text-center text-muted animate-pulse">YZ13</h1>
            </div>
            <div className="flex items-center h-full gap-2 w-fit">
                <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />
            </div>
        </div>
    )
}

export default HeaderSkeleton