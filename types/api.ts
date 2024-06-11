export interface IPaging {
    pageIndex: number
    pageSize: number
    totalPages: number
    totalItems: number
    hasPreviousPage: boolean
    hasNextPage: boolean
}

export interface IDataResponse<C> {
    message: string
    status: number
    success: boolean
    title: string
    content: C
    paging?: IPaging
}
