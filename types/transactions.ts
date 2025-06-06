import type { z } from 'zod'
import type { Dayjs } from 'dayjs'

import type { IDataResponse } from './api'

export interface IDaysOptionFilter {
    label: string
    value?: string | Date | Dayjs | object
    start: Date | Dayjs | null
    end: Date | Dayjs | null
}

export type RangeDuration = {
    days?: number
    months?: number
    years?: number
    start?: Date
    end?: Date
}

export type RangeOption = {
    label: string
    duration: RangeDuration
}

export interface ITransactionForm {
    description: string
    amount: number
    type: string
    categoryId: number
    subCategoryId: number
    transactionDate: string
}

interface ICreatedby {
    uid: string
    firstName: string
    lastName: string
}
export interface ITransaction {
    id: number
    amount: number | string
    categoryId: number
    categoryName: string
    createdAtUtc: string
    description: string
    transactionDateUtc: Date
    type: string
    subCategoryId: number
    subCategoryName: string
    createdBy: ICreatedby
}

export interface ITypes {
    id: number
    name: string
    description: string
    toSubtract: boolean
    isDeleted: boolean
}

export type TSubCategory = {
    id?: number
    name: string
}
export interface ICategory extends ITypes {
    subCategories: TSubCategory[]
}

export type TActiveType = Omit<ITypes, 'isDeleted' | 'toSubtract'>

export interface ICategory {
    id: number
    name: string
    description: string
    isDeleted: boolean
}

export interface TotalTransactionType {
    totalTransactions: number
    totalCredits: number
    totalDebits: number
    netTotal: number
}
export interface TransactionPercentageType {
    totalCreditsPercentage: number
    totalDebitsPercentage: number
}

export interface MonthlyTotalType {
    monthName: string
    totalCredits: number
    totalDebits: number
    netTotal: number
}

export type TransactionTypeSchemaType = z.output<typeof TransactionTypeSchema>
export type AddTransactionSchemaType = z.output<typeof AddTransactionSchema>

export interface ITransactionData extends IDataResponse<ITransaction> {}
export interface ITransactionsData extends IDataResponse<ITransaction[]> {}

export interface TCategoryData extends IDataResponse<ICategory> {}
export interface ICategoriesData extends IDataResponse<ICategory[]> {}

export interface TTypeData extends IDataResponse<ITypes> {}
export interface ITypesData extends IDataResponse<ITypes[]> {}

export interface ITotalTransaction
    extends IDataResponse<TotalTransactionType> {}

export interface ITransactionPercentage
    extends IDataResponse<TransactionPercentageType> {}

export interface IMonthlyTotal extends IDataResponse<MonthlyTotalType[]> {}
