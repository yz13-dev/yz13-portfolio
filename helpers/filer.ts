

export const fileChecker = (file: File) => {
    const size = getSize(file.size)
    const type = getType(file.name)
    return {
        name: file.name,
        type: type,
        ...size
    }
}

function getType(name: string) {
    const nameArr = name.split('.')
    const type = nameArr[nameArr.length - 1]
    return type
}

type Scale = 'Bytes' | 'KiB' | 'MiB' | 'GiB' | 'TiB' | 'PiB' | 'EiB' | 'ZiB' | 'YiB'
type ScaleArray = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
function getSize(bytes: number, decimals: number = 2): {
    size: number
    scale:Scale
} {
    if (!+bytes) return { size: 0, scale: 'Bytes'}
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes: ScaleArray = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return { size: parseFloat((bytes / Math.pow(k, i)).toFixed(dm)), scale: sizes[i]}
}