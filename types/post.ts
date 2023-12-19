

export type Post = {
    name: string // can used as id
    description?: string
    category?: string
    authorsId: string[]
    createdAt: number
    updatedAt?: number
    content: string // used in markdown
    thumbnail?: string // image .png .jpg .webp
    tags?: string[]
    pinned?: boolean
}

export type PartialDocPost = { doc_id?: string } & Post

export type DocPost = { doc_id: string } & Post