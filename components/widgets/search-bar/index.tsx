'use client'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { BiLoaderAlt, BiSearch } from 'react-icons/bi'
import SearchResult from './search-result'
import { useState } from 'react'
import { DocPost } from '@/types/post'
import { useDebounceEffect } from 'ahooks'
import { blog } from '@/api/blog'

const SearchBar = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [query, setQuery] = useState<string>('')
    const [debouncedQuery, setDebouncedQuery] = useState<string>('')
    const [result, setResult] = useState<DocPost[]>([])
    const fetchResults = async(query: string) => {
        setLoading(true)
        const results = await blog.search(query)
        setResult(results)
        setOpen(true)
        setLoading(false)
    }
    useDebounceEffect(() => {
        if (debouncedQuery !== query && query !== '') {
            fetchResults(query)
            setDebouncedQuery(query)
        }
    },[query], { wait: 1000, maxWait: 2000 })
    return (
        <Popover open={open} onOpenChange={open => setOpen(open)}>
            <PopoverTrigger disabled className='w-full md:max-w-md max-w-full h-fit flex items-center gap-2 px-2 border rounded-md'>
                {
                    loading
                    ? <BiLoaderAlt className='text-muted-foreground animate-spin' />
                    : <BiSearch className='text-muted-foreground' />
                }
                <Input value={query} onChange={e => setQuery(e.target.value)} 
                className="px-0 !border-0 !ring-0" placeholder="Поиск постов" />
            </PopoverTrigger>
            <PopoverContent className='lg:w-[35vw] md:w-[50vw] sm:w-[75vw] w-[90vw]'>
                {
                    result.length !== 0
                    ? result.map( post => <SearchResult key={'result-' + post.doc_id} post={post} /> )
                    : null
                }
                
            </PopoverContent>
        </Popover>
    )
}

export default SearchBar