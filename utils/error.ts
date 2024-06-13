export function getErrorObject(error: any) {
    if (error.hasOwnProperty('data') && typeof error.data === 'object') {
        const errorData = error.data as { status?: number; title?: string }

        return errorData
    }
}
