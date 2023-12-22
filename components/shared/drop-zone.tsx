'use client'

import { ChangeEvent, DragEvent } from "react"

type Props = {
    disabled?: boolean
    onFile?: (file: File) => void
}
const DropZone = ({ onFile, disabled=false }: Props) => {
    const onDrop = (e: DragEvent<HTMLInputElement>) => {
        e.stopPropagation()
        if (e.currentTarget.files) {
            const file = e.currentTarget.files[0]
            if (file && onFile) onFile(file)
        }
    }
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation()
        if (e.currentTarget.files) {
            const file = e.currentTarget.files[0]
            if (file && onFile) onFile(file)
        }
    }
    return (
        <input type="file" disabled={disabled} multiple={false} onDrop={onDrop} onChange={onChange} className='w-full h-full opacity-0' />
    )
}

export default DropZone