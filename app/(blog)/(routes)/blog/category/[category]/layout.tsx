import CategoryTabs from "@/components/widgets/category-tabs"
import { ReactNode } from "react"

type Props = {
    children: ReactNode
}
const layout = ({ children }: Props) => {
    return (
        <>
            <div className=" px-6 max-w-7xl w-full mx-auto pt-24">
                <CategoryTabs />
            </div>
            { children }
        </>
    )
}

export default layout