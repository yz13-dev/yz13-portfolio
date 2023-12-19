import PostAuthor from "./post-author"

type Props = {
    authors: string[]
    max?: number
}
const GroupPostAuthors = ({ authors, max=3 }: Props) => {
    const limited = authors.filter( (_, index) => max === 0 ? _ : index < max )
    return (
        <div className="w-full flex lg:flex-col flex-row lg:items-start items-center gap-2 overflow-x-auto">
            {
                limited.map(uid => <PostAuthor key={uid} uid={uid} />)
            }
        </div>
    )
}

export default GroupPostAuthors