import Header from '@/components/widgets/Header'
import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}
const layout = ({ children }: Props) => {
    return (
        <>
            <header className='w-full h-16 px-6 border-b shrink-0'><Header/></header>
            { children }
        </>
    )
}

export default layout