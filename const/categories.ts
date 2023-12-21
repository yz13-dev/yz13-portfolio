import { AllPostsRatio, Categories, GridRatioByCategory, PickedCategory } from "@/types/common"

export const categories = [
    "all",
    "dev",
    "community",
    "projects",
    "YZ13",
    "updates",
    "other"
]

export const defaultRatio: string = '6-4-3-3-2'


const CategoriesRUS: Categories = {
    "all": "Все посты",
    "dev": "Разработка",
    "community": "Сообщество",
    "projects": "Проекты",
    "YZ13": "YZ13",
    "updates": "Обновления",
    "other": "Другое",
}



export const CategoriesGridRatio: GridRatioByCategory = {
    all: "6-4-3-3-2",
    dev: "6-3-4-2-3",
    community: "6-3-2-4-3",
    projects: "6-4-3-3-2",
    YZ13: "6-3-4-2-3",
    updates: "6-3-2-4-3",
    other: "6-4-3-3-2"
}

export const getCategoryName = <K extends keyof Categories>(category: K): PickedCategory<K> => CategoriesRUS[category]
