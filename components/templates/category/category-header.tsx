import { Input } from "@/components/ui/input"
import CategoryTabs from "@/components/widgets/category-tabs"
import { BiSearch } from "react-icons/bi"

const CategoryHeader = () => {
    return (
        <div className="px-6 max-w-6xl w-full mx-auto lg:pt-6 py-2 flex md:flex-row flex-col-reverse gap-2 items-center border-b lg:border-b-transparent justify-between">
            <div className="w-full overflow-x-auto">
                <CategoryTabs />
            </div>
            <div className="w-full md:max-w-xs max-w-full h-fit flex items-center gap-2 px-2 border rounded-md">
                <BiSearch className='text-muted-foreground' />
                <Input className="px-0 !border-0 !ring-0" disabled placeholder="Поиск постов" />
            </div>
        </div>
    )
}

export default CategoryHeader