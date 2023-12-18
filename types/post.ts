

export type Post = {
    name: string // can used as id
    description?: string
    category?: string
    authorId: string | string[]
    createdAt: number
    content: string // used in markdown
    thumbnail?: string // image .png .jpg .webp
    tags?: string[]
}

export type DocPost = { doc_id: string } & Post