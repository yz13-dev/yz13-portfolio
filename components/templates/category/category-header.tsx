import CategoryTabs from "@/components/widgets/category-tabs"

const CategoryHeader = () => {
    return (
        <div className="px-6 max-w-6xl w-full mx-auto lg:pt-6 py-2 flex md:flex-row flex-col-reverse gap-2 items-center border-b lg:border-b-transparent justify-start">
            <div className="w-full overflow-x-auto">
                <CategoryTabs />
            </div>
        </div>
    )
}

export default CategoryHeader