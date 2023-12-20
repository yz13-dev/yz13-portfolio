'use client'

import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { categories, getCategoryName } from "@/const/categories"
import { Categories } from "@/types/common"
import { Dispatch, SetStateAction, useState } from "react"


type Props = {
    category: string 
    setCategory: Dispatch<SetStateAction<string>>
}
const PostCategory = ({ category, setCategory }: Props) => {
    return (
        <Select defaultValue="YZ13" onValueChange={value => setCategory(value)}>
            <SelectTrigger className="w-36">
                { getCategoryName(category as keyof Categories) }
            </SelectTrigger>
            <SelectContent>
                {
                    categories
                    .filter( category => category !== 'all' )
                    .map( category =>
                        <SelectItem key={category} value={category}>
                            { getCategoryName(category as keyof Categories) }
                        </SelectItem>
                    )
                }
            </SelectContent>
        </Select>
        )
}

export default PostCategory