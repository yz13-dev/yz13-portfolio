import { config } from '@/app.config'
import RemoteLogo from '@/components/shared/remote-logo'
import { ReactNode } from 'react'

type Props = {
    children: ReactNode
}
const layout = ({ children }: Props) => {
    return (
        <div className='flex flex-col w-full h-full'>
            <header className='w-full h-16 px-6 border-b shrink-0'>
                <div className="flex items-center h-full gap-2 w-fit">
                    <RemoteLogo dark={config.remote.logo.dark} light={config.remote.logo.light} size={28} alt="dm-logo" />
                    <h1 className="text-2xl font-semibold text-center text-accent-foreground">YZ13</h1>
                </div>
            </header>
            <div className="w-full max-w-5xl mx-auto h-fit">
                {children}
            </div>
        </div>
    )
}

export default layout