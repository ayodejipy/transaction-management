import type { IColumn } from '~/types'

export const columns: IColumn[] = [
    {
        key: 'id',
        label: 'Transaction ID',
    },
    {
        key: 'typeName',
        label: 'Transaction Type',
    },
    {
        key: 'categoryName',
        label: 'Transaction Category',
    },
    {
        key: 'transactionDateUtc',
        label: 'Transaction Date',
    },
    {
        key: 'amount',
        label: 'Amount',
    },
    {
        key: 'description',
        label: 'Description',
    },
]

export const userRoles = {
    SuperAdmin: 'SuperAdmin',
    User: 'User',
}
export const userTypes = {
    admin: 'admin',
    user: 'user',
}

