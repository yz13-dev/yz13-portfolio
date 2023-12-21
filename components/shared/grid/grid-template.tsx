// import React from 'react'
import { ReactNode } from 'react'

type Props = {
    children?: ReactNode
}
const GridTemplate = ({ children }: Props) => {
    return (
        <div className='flex flex-col w-full grid-cols-3 grid-rows-6 gap-4 md:h-[38rem] lg:my-12 my-2 shrink-0 h-fit md:grid'>
            { children }
        </div>
    )
}

export default GridTemplate