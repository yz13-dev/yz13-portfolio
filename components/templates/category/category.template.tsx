import { ReactNode } from 'react'
import CategoryHeader from './category-header'
import CategoryPinnedPosts from './category-pinned-posts'
import CategoryAllPosts from './category-all-posts'


type Props = {
    children?: ReactNode
}
type Extensions = {
    Header: typeof CategoryHeader
    PinnedPosts: typeof CategoryPinnedPosts
    AllPosts: typeof CategoryAllPosts
}
const Template = ({ children }: Props) => {
    return (
        <div className='max-w-6xl w-full min-h-screen mx-auto h-fit'>
            { children }
        </div>
    )
}

const CategoryTemplate = Template as typeof Template & Extensions
CategoryTemplate.Header = CategoryHeader
CategoryTemplate.PinnedPosts = CategoryPinnedPosts
CategoryTemplate.AllPosts = CategoryAllPosts
export default CategoryTemplate