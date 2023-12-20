'use client'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { categories, getCategoryName } from "@/const/categories"
import { Categories } from "@/types/common"
import { usePathname } from "next/navigation"
import { motion } from 'framer-motion'
import { useMemo } from "react"
import Link from "next/link"

const CategoryTabs = () => {
    const path = usePathname()
    const selectedTab = useMemo(() => {
        if (path === '/') return 'all'
        const shortPath = path.replace('/blog/category/', '')
        return shortPath
    },[path])
    return (
        <Tabs>
            <TabsList className="bg-transparent p-0 rounded-none">
                {
                    categories
                    .map(category => {
                        const href = category === 'all' ? '/' : `/blog/category/${category}`
                        return (
                            <TabsTrigger asChild value={category}
                            key={'tab-' + category} className="relative">
                                <Link href={href}>
                                    <span className="z-10">{ getCategoryName(category as keyof Categories) }</span>
                                    { 
                                        selectedTab === category && 
                                        <motion.div layoutId="category-tab"
                                        className="w-full h-full rounded-md bg-muted absolute left-0 top-0" /> 
                                    }
                                </Link>
                            </TabsTrigger>
                        )
                    })
                }
            </TabsList>
        </Tabs>
    )
}

export default CategoryTabs