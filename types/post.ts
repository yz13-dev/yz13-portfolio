

export type Post = {
    name: string // can used as id
    authorId: string | string[]
    createdAt: number
    thumbnail?: string
    content: string // used in markdown
}