import { ReactNode, Suspense } from "react"
import dynamic from "next/dynamic"
import HeaderSkeleton from "@/components/skeletons/header"
const Header = dynamic(() => import("@/components/widgets/header"), {
    loading: () => <HeaderSkeleton />
})

type Props = {
    children: ReactNode
}
const layout = ({ children }: Props) => {
    return (
        <div className="flex flex-col w-full h-screen">
            <header className="w-full h-16 px-6 border-b shrink-0">
                <div className="h-full max-w-5xl mx-auto">
                    <Suspense fallback={<HeaderSkeleton />}>
                        <Header />
                    </Suspense>
                </div>
            </header>
            {children}
        </div>
    )
}

export default layout