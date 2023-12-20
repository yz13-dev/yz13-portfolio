import { ReactNode } from 'react'
import PostHeaderWrapper from './post-header-wrapper'
import PostHeader from './post-header'
import PostBody from './post-body'
import PostContent from './post-content'
import PostSide from './post-side'
import PostSeparator from './post-separator'

type Props = {
    children?: ReactNode
}
type Extensions = {
    HeaderWrapper: typeof PostHeaderWrapper
    Header: typeof PostHeader
    Body: typeof PostBody
    Content: typeof PostContent
    Separator: typeof PostSeparator
    Side: typeof PostSide
}
const Template = ({ children }: Props) => {
    return (
        <>{children}</>
    )
}
const PostTemplate = Template as typeof Template & Extensions
PostTemplate.HeaderWrapper = PostHeaderWrapper
PostTemplate.Header = PostHeader
PostTemplate.Body = PostBody
PostTemplate.Content = PostContent
PostTemplate.Separator = PostSeparator
PostTemplate.Side = PostSide
export default PostTemplate