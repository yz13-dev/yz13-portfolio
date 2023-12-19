import { Post } from "@/types/post";

export const compareAuthor = (val: string, author: Post['authorId']) => {
    const typeOfAuthor = typeof author
    if (typeOfAuthor === 'string') {
        return val === author
    } else return author.includes(val)
}