// import React from 'react'
import GridItem from './grid-item'

const GridTemplate = () => {
    return (
        <div className='flex flex-col w-full grid-cols-3 grid-rows-6 gap-4 md:h-[36rem] py-6 h-fit md:grid'>
            <GridItem rowSpan='row-span-full' />
            <GridItem rowSpan='row-span-4' />
            <GridItem rowSpan='row-span-3' />
            <GridItem rowSpan='row-span-3' />
            <GridItem rowSpan='row-span-2' />
        </div>
    )
}

export default GridTemplate