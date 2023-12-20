export type ChunkResponse<T> = {
    count: number
    data: T
    next: string
}