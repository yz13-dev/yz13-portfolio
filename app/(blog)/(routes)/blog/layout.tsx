import Footer from '@/components/shared/footer'
import HeaderSkeleton from '@/components/skeletons/header'
import dynamic from 'next/dynamic'
import { ReactNode, Suspense } from 'react'
const Header = dynamic(() => import("@/components/widgets/header"), {
    loading: () => <HeaderSkeleton />
})
type Props = {
    children: ReactNode
}
const layout = ({ children }: Props) => {
    return (
        <>
            <header className="border-b w-full h-16 shrink-0">
                <div className="w-full max-w-7xl h-full px-6 mx-auto flex items-center justify-between">
                    <Suspense fallback={<HeaderSkeleton />}>
                        <Header />
                    </Suspense>
                </div>
            </header>
            <div style={{ minHeight: 'calc(100dvh - 64px)' }} className='w-full h-fit'>
                { children }
            </div>
            <Footer />
        </>
    )
}

export default layout