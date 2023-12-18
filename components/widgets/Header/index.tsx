import React from 'react'
import YZ13Mark from '../../shared/yz13-mark'
import { Button } from '../../ui/button'
import Link from 'next/link'

const Header = () => {
    return (
        <div className='flex items-center justify-between w-full h-full'>
            <YZ13Mark />
            <div className="flex items-center h-full gap-2 w-fit">

            </div>
        </div>
    )
}

export default Header