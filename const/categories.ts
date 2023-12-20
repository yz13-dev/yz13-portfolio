import { AllPostsRatio, Categories, PickedCategory } from "@/types/common"

export const categories = [
    "all",
    "dev",
    "community",
    "projects",
    "YZ13",
    "updates",
    "other"
]

export const AllPostsGridRatio: AllPostsRatio = '6-4-3-3-2'


const CategoriesRUS: Categories = {
    "all": "Все посты",
    "dev": "Разработка",
    "community": "Сообщество",
    "projects": "Проекты",
    "YZ13": "YZ13",
    "updates": "Обновления",
    "other": "Другие",
}

export const getCategoryName = <K extends keyof Categories>(category: K): PickedCategory<K> => CategoriesRUS[category]
