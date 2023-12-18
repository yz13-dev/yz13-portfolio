import { config } from '@/app.config'
import RemoteLogo from '@/components/shared/remote-logo'
import PostForm from '../../_components/Post'
import Link from 'next/link'
// import React from 'react'

const page = () => {
    return (
        <>
            <header className='w-full h-16 px-6 border-b shrink-0'>
                <div className="flex items-center h-full w-fit">
                    <Link href='/'><RemoteLogo dark={config.remote.logo.dark} light={config.remote.logo.light} size={28} alt="dm-logo" /></Link>
                </div>
            </header>
            <div className='w-full h-full max-w-5xl px-6 mx-auto'>
                <PostForm />
            </div>
        </>
    )
}

export default page