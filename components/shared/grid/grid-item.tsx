
type Props = {
    colSpan?: string
    rowSpan?: string
}
const GridItem = ({ colSpan, rowSpan }: Props) => {
    const className = `w-full h-full ${rowSpan || ''} ${colSpan || ''} row-span-3 border rounded-lg`
    return (
        <div className={className}></div>
    )
}

export default GridItem