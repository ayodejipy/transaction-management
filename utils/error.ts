interface CustomError extends Error {
    data?: {
        status?: number
        title?: string
        message?: string
    }
}

export function getErrorObject(error: CustomError) {
    if (
        Object.prototype.hasOwnProperty.call(error, 'data') &&
        typeof error?.data === 'object'
    ) {
        const errorData = error.data

        return errorData
    }
}
