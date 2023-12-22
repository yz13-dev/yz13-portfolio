import CategoryTemplate from "@/components/templates/category/category.template"

type Props = {
    children: JSX.Element
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