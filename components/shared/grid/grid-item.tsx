import { DateTime } from "luxon"

type Props = {
    colSpan?: string
    rowSpan?: string
}
const GridItem = ({ colSpan, rowSpan }: Props) => {
    const className = `w-full h-full md:min-h-full min-h-[24rem] relative ${rowSpan || ''} ${colSpan || ''} cursor-pointer row-span-3 border hover:border-muted-foreground transition-colors duration-500 rounded-lg group`
    return (
        <div className={className}>
            <div className="absolute top-0 left-0 w-full h-full transition-opacity duration-500 rounded-md bg-gradient-to-t from-background to-transparent group-hover:opacity-50" />
            <div className="absolute bottom-0 left-0 z-10 flex flex-col w-full gap-2 p-4 h-fit">
                <span className="text-xl font-semibold text-accent-foreground">Проверочный заголовок</span>
                <div className="flex items-center justify-between w-full h-fit">
                    <div className="flex items-center gap-2 w-fit h-fit">
                        <div aria-label="profile-photo" className="rounded-full w-7 h-7 shrink-0 bg-muted" />
                        <span className="text-sm text-muted-foreground">YZ13</span>
                    </div>
                    <span className="text-sm capitalize text-muted-foreground">{ DateTime.now().setLocale('ru').toFormat( 'dd LLL yyyy' ) }</span>
                </div>
            </div>
        </div>
    )
}

export default GridItem