import dynamic from 'next/dynamic'
const CategoryHeader = dynamic(() => import('./category-header')) 
const CategoryPinnedPosts = dynamic(() => import('./category-pinned-posts'))
const CategoryAllPosts = dynamic(() => import('./category-all-posts'))


type Props = {
    children?: JSX.Element[]
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