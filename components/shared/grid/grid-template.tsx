// import React from 'react'
import GridItem from './grid-item'

const GridTemplate = () => {
    return (
        <div className='flex flex-col w-full h-full grid-cols-3 grid-rows-3 gap-4 md:grid'>
            <GridItem rowSpan='row-span-3' />
            <GridItem rowSpan='row-span-2' />
            <GridItem rowSpan='row-span-1' />
            <GridItem rowSpan='row-span-2' />
            <GridItem rowSpan='row-span-1' />
        </div>
    )
}

export default GridTemplate