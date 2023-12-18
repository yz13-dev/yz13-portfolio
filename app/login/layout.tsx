import Header from "@/components/widgets/Header"
import { ReactNode } from "react"

type Props = {
    children: ReactNode
}
const layout = ({ children }: Props) => {
    return (
        <div className="flex flex-col w-full h-screen">
            <header className="w-full h-16 px-6 border-b shrink-0">
                <div className="h-full max-w-5xl mx-auto">
                    <Header />
                </div>
            </header>
            {children}
        </div>
    )
}

export default layout