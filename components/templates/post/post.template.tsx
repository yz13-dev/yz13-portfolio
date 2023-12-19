import { ReactNode } from 'react'
import PostHeaderWrapper from './post-header-wrapper'
import PostHeader from './post-header'
import PostBody from './post-body'
import PostContent from './post-content'
import PostSide from './post-side'

type Props = {
    children?: ReactNode
}
type Extensions = {
    HeaderWrapper: typeof PostHeaderWrapper
    Header: typeof PostHeader
    Body: typeof PostBody
    Content: typeof PostContent
    Side: typeof PostSide
}
const PostTemplate = ({ children }: Props) => {
    return (
        <>{children}</>
    )
}
const Template = PostTemplate as typeof PostTemplate & Extensions
Template.HeaderWrapper = PostHeaderWrapper
Template.Header = PostHeader
Template.Body = PostBody
Template.Content = PostContent
Template.Side = PostSide
export default Template