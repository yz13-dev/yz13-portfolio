import { ReactNode } from 'react'

type Props = {
    children?: ReactNode
}
const CategoryAllPosts = ({ children }: Props) => {
    return (
        <div>
            { children }
        </div>
    )
}

export default CategoryAllPosts