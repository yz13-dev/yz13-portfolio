'use client'
import DropZone from "@/components/shared/drop-zone"
import { fileChecker } from "@/helpers/filer"
import { Dispatch, SetStateAction, useState } from "react"
import { file as fileAPI } from '@/api/file'
import Image from "next/image"
import { cdn } from "@/helpers/cdn"
import { Button } from "@/components/ui/button"
import { BiTrashAlt } from "react-icons/bi"
type Props = {
    disabled?: boolean
    postId: string
    thumbnail: string | undefined
    setThumbnail?: Dispatch<SetStateAction<string | undefined>>
}
const PostThumbnail = ({ postId, disabled=false, setThumbnail, thumbnail }: Props) => {
    const [localThumbnail, setLocalThumbnail] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const upload = async(file: File) => {
        const fileData = fileChecker(file)
        const uploadLink = 'YZ13/posts/' + postId + '/' + 'thumbnail' + '.' + fileData.type
        revokeThumbnail()
        if (fileData.size <= 5 && fileData.scale === 'MiB' || fileData.scale === 'KiB' || fileData.scale === 'Bytes') {
            try {
                setLoading(true)
                const url = URL.createObjectURL(file)
                setLocalThumbnail(url)
                const link = await fileAPI.upload.file(uploadLink, file)
                if (link && setThumbnail) setThumbnail(link)
            } catch(e) {
                revokeThumbnail()      
            } finally {
                setLoading(false)
            }
        }
    }
    const revokeThumbnail = () => {
        if (localThumbnail) {
            URL.revokeObjectURL(localThumbnail)
            setLocalThumbnail(null)
        }
    }
    const removeThumbnail = async() => {
        try {
            if (thumbnail) {
                await fileAPI.upload.delete(thumbnail)
                revokeThumbnail()
                if (setThumbnail) setThumbnail(undefined)
            } else {
                revokeThumbnail()
                if (setThumbnail) setThumbnail(undefined)
            }
        } catch(e) {
            console.log(e)
        }
    }
    return (
        <div className="relative w-full aspect-video border rounded-lg mb-4 flex items-center justify-center">
            {
                (localThumbnail || thumbnail) &&
                <>
                    <div className="absolute top-3 right-3 flex items-center z-20 justify-end gap-2">
                        <Button onClick={removeThumbnail} disabled={!thumbnail} size='icon' variant='outline'><BiTrashAlt /></Button>
                    </div>
                    <div className="absolute w-full top-0 left-0 h-full">
                        {
                            localThumbnail 
                            ? <Image src={localThumbnail} fill className={`rounded-lg ${loading ? 'brightness-50' :'brightness-100'}`} alt='post-thumbnail' />
                            : thumbnail
                            ? <Image src={cdn(thumbnail)} fill className={`rounded-lg ${loading ? 'brightness-50' :'brightness-100'}`} alt='post-thumbnail' />
                            : null
    
                        }
                    </div>
                </>
            }
            {
                !thumbnail &&
                <>
                    <span className="text-sm text-muted-foreground text-center">
                        {
                            disabled
                            ? 'Укажите название поста для загрузки обложки'
                            : 'Загрузите обложку для поста'
                        }
                    </span>
                    <div className="absolute w-full h-full"><DropZone disabled={disabled || !setThumbnail} onFile={file => upload(file)} /></div>
                </>
            }
        </div>
    )
}

export default PostThumbnail