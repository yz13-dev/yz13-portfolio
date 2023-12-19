import { Post } from "@/types/post";

export const compareAuthor = (val: string, author: Post['authorsId']) => {
    return author.includes(val)
}