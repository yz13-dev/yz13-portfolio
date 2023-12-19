import { ReactNode } from 'react'

type Props = {
    children?: ReactNode
}
const PostHeader = ({ children }: Props) => {
    return (
        <div className="z-20 flex flex-col px-6 max-w-7xl items-start w-full mx-auto h-fit">
            { children }
        </div>
    )
}

export default PostHeader