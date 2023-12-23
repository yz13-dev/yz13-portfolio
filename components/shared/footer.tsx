import YZ13Mark from './yz13-mark'

type Props = {
    maxWidth?: string
}
const Footer = ({ maxWidth }: Props) => {
    return (
        <footer className="w-full border-t bg-card mt-24 pt-12 pb-6 h-fit">
            <div className={`${maxWidth ? maxWidth : 'max-w-5xl'} w-full mx-auto px-6 flex items-center justify-center gap-4`}>
                <YZ13Mark /><span className="text-muted-foreground text-sm">@2023</span>
            </div>
        </footer>
    )
}

export default Footer