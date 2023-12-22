import { getCategoryName } from "@/const/categories"
import { Categories } from "@/types/common"
import Link from "next/link"


type Props = {
    category: keyof Categories
    asLink?: boolean
}
const CategoryBadge = ({ category, asLink=false }: Props) => {
    const isAllPosts = category === 'all'
    if (asLink) return <Link href={isAllPosts ? '/' :`/blog/category/${category}`} 
    className="w-fit h-fit px-2.5 py-1 rounded-lg border bg-background text-xs text-muted-foreground">{getCategoryName(category)}</Link>
    return (
        <span className="w-fit h-fit px-2.5 py-1 rounded-lg border bg-background text-xs text-muted-foreground">{getCategoryName(category)}</span>
    )
}

export default CategoryBadge