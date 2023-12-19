import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkBreaks from "remark-breaks"

type Props = {
    children: string
    className?: string
    pageMode?: boolean
}
const Markdown = ({ children, className, pageMode=false }: Props) => {
    return (
        <div className={`w-full h-fit ${className}`}>
            <ReactMarkdown
                remarkPlugins={[remarkBreaks]}
                components={{
                    h1: ({ node, children }) => <h1 className={`${ pageMode ? 'text-4xl' : 'text-base' } font-bold normal-case text-accent-foreground`}>{children}</h1>,
                    h2: ({ node, children }) => <h2 className={`${ pageMode ? 'text-3xl' : 'text-base' } font-bold normal-case text-accent-foreground`}>{children}</h2>,
                    h3: ({ node, children }) => <h3 className={`${ pageMode ? 'text-2xl' : 'text-base' } font-bold normal-case text-accent-foreground`}>{children}</h3>,
                    h4: ({ node, children }) => <h4 className={`${ pageMode ? 'text-xl' : 'text-base' } font-bold normal-case text-accent-foreground`}>{children}</h4>,
                    h5: ({ node, children }) => <h5 className={`${ pageMode ? 'text-lg' : 'text-base' } font-bold normal-case text-accent-foreground`}>{children}</h5>,
                    h6: ({ node, children }) => <h6 className={`${ pageMode ? 'text-base' : 'text-base' } font-bold normal-case text-accent-foreground`}>{children}</h6>,
                    ol: ({ node, children }) => <ol className="list-decimal list-inside text-muted-foreground">{children}</ol>,
                    ul: ({ node, children }) => <ul className="m-2 ml-4 list-none list-inside text-muted-foreground">{children}</ul>,
                    li: ({ node, children }) =>  <li className={`${ pageMode ? 'text-base' : 'text-sm' } relative mb-2 
                    before:content-['–'] before:text-muted-foreground before:-left-3 before:absolute text-accent-foreground`}>{children}</li>,
                    blockquote: ({ node, children }) => <blockquote className="p-2 my-2 rounded-lg h-fit bg-card">{children}</blockquote>,
                    mark: ({ node, children }) => <mark className="px-2 py-1 rounded-md text-primary-foreground bg-primary">{children}</mark>, 
                    span: ({ node, children }) => <span className={`shrink-0 ${ pageMode ? 'text-base' : 'text-sm' } font-light text-secondary-foreground`}>{children}</span>,
                    text: ({ node, children }) => <span className={`shrink-0 ${ pageMode ? 'text-base' : 'text-sm' } font-light text-secondary-foreground`}>{children}</span>,
                    strong: ({ node, children }) => <strong className={`shrink-0 font-bold  text-accent-foreground`}>{children}</strong>,
                    p: ({ node, children }) => <p className={`shrink-0  ${ pageMode ? 'text-base' : 'text-sm' } font-light text-secondary-foreground`}>{children}</p>,
                    a: ({ node, href, children }) => <Link className='underline text-accent-foreground' href={href || '/'}>{children}</Link>
                }}
            >{children.replace(/\n/gi, "&nbsp; \n")}</ReactMarkdown>
        </div>
    )
}

export { Markdown }