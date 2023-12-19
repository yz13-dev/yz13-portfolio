import { ReactNode } from 'react'

type Props = {
    children?: ReactNode
}
const PostBody = ({ children }: Props) => {
    return (
        <div className="w-full h-full flex mx-auto max-w-7xl lg:flex-row-reverse flex-col">
            { children }
        </div>
    )
}

export default PostBody