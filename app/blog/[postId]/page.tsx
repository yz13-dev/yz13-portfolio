import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { BiLeftArrowAlt } from 'react-icons/bi'
// import React from 'react'

type Props = {
    params: {
        postId: string
    }
}
const page = ({ params }: Props) => {
    return (
        <>
            <div className="flex flex-col w-full p-6 border-b h-fit bg-gradient-to-b from-muted to-transparent">
                <div className="flex flex-col items-start w-full h-fit">
                    <Button variant='link' asChild className='px-0 text-muted-foreground hover:text-accent-foreground hover:no-underline'>
                        <Link href='/' className='flex items-center gap-2'><BiLeftArrowAlt />Вернуться на главную</Link>
                    </Button>
                    <div className="flex flex-col items-center justify-center w-full gap-4 py-12">
                        <h1 className='text-3xl font-semibold text-center text-accent-foreground'>{params.postId}</h1>    
                        <span className='text-sm text-center text-muted-foreground'>description for post</span>
                    </div>
                    <div className="flex items-center gap-2 mx-auto w-fit h-fit">
                        <span className='text-muted-foreground'>by</span>
                        <div className="flex items-center gap-2 w-fit h-fit">
                            <div aria-label="profile-photo" className="rounded-full w-7 h-7 shrink-0 bg-muted" />
                            <span className="text-sm text-muted-foreground">YZ13</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full p-6 h-fit">
                some text
            </div>
        </>
    )
}

export default page