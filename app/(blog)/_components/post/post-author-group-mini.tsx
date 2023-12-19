import PostAuthor from "./post-author"

type Props = {
    authors: string[]
    max?: number
}
const GroupPostAuthorsMini = ({ authors, max=3 }: Props) => {
    const limited = authors.filter( (_, index) => max === 0 ? _ : index < max )
    const howManyLeft = authors.length - max
    const groupWidth = limited.map( (_, index) => index === 0 ? 28 : 28 / 2 ).reduce( (a, b) => a + b )
    return (
        <div className="w-fit h-fit flex items-center gap-2">
            <div style={{ width: `${groupWidth}px` }} className="w-fit h-fit flex items-center">
                {/* {groupWidth} */}
                {
                    limited.map((uid, index) => {
                        const margin = index * (28 / 2)
                        return <div key={uid} className="relative" style={{ left: `-${margin}px` }}>
                            <PostAuthor uid={uid} hideName className="w-7 h-7" />
                        </div>
                    })
                }
            </div>
            {
                howManyLeft > 0 &&
                <div className="w-7 h-7 rounded-full border shrink-0 bg-background flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">+{howManyLeft}</span>
                </div>
            }
        </div>
    )
}

export default GroupPostAuthorsMini