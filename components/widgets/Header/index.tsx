import React from 'react'
import YZ13Mark from '../../shared/yz13-mark'
import User from './ui/user'
import Link from 'next/link'

const Header = () => {
    return (
        <div className='flex items-center justify-between w-full h-full'>
            <Link href='/'><YZ13Mark /></Link>
            <div className="flex items-center h-full gap-2 w-fit">
                <User />
            </div>
        </div>
    )
}

export default Header