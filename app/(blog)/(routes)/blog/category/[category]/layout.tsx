import CategoryTemplate from "@/components/templates/category/category.template"
import { ReactNode } from "react"

type Props = {
    children: ReactNode
}
const layout = ({ children }: Props) => {
    return (
        <>
            <CategoryTemplate.Header />
            { children }
        </>
    )
}

export default layout