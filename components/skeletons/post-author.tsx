
type Props = {
    hideName?: boolean
}
const PostAuthorSkeleton = ({ hideName=false }: Props) => {
    return (
        <div className="w-fit h-9 flex items-center gap-2">
            <div className="shrink-0 w-9 h-9 rounded-full bg-muted animate-pulse" />
            {
                !hideName &&
                <div className="w-full h-full gap-1 flex flex-col">
                    <div className="w-36 h-6 rounded-md bg-muted animate-pulse" />
                    <div className="w-24 h-4 rounded-sm bg-muted animate-pulse" />
                </div>
            }
        </div>
    )
}

export default PostAuthorSkeleton