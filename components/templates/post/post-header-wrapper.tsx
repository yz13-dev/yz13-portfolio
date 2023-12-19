import { ReactNode } from 'react'

type Props = {
    children?: ReactNode
}
const PostHeaderWrapper = ({ children }: Props) => {
    return (
        <div className="relative w-full min-h-[30vh] h-fit pt-6">
            { children }
        </div>
    )
}

export default PostHeaderWrapper