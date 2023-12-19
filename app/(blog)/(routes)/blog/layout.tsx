import Footer from '@/components/shared/footer'
import HeaderSkeleton from '@/components/skeletons/header'
import dynamic from 'next/dynamic'
import { ReactNode, Suspense } from 'react'
const Header = dynamic(() => import("@/components/widgets/Header"), {
    loading: () => <HeaderSkeleton />
})
type Props = {
    children: ReactNode
}
const layout = ({ children }: Props) => {
    return (
        <>
            <header className='w-full h-16 px-6 border-b shrink-0'>
                <Suspense fallback={<HeaderSkeleton />}>
                    <Header />
                </Suspense>
            </header>
            <div style={{ minHeight: 'calc(100dvh - 64px)' }} className='w-full h-fit'>
                { children }
            </div>
            <Footer />
        </>
    )
}

export default layout