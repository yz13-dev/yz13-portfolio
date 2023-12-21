import { ReactNode } from 'react'

type Props = {
    children?: ReactNode
}
const CategoryPinnedPosts = ({ children }: Props) => {
    return (
        <div>
            { children }
        </div>
    )
}

export default CategoryPinnedPosts