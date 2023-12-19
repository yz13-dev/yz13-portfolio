import { ReactNode } from 'react'

type Props = {
    children?: ReactNode
}
const PostSide = ({ children }: Props) => {
    return (
        <div className="flex lg:w-1/4 w-full items-start flex-col p-6 gap-2 mx-auto h-fit">
            { children }
        </div>
    )
}

export default PostSide