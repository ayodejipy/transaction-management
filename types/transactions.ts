import { z } from 'zod'
import { Dayjs } from 'dayjs'

import type { IDataResponse } from './api'

export interface IDaysOptionFilter {
    label: string
    value: string | Date | Dayjs
}

export interface ITypes {
    id?: number
    name: string
    description?: string
    toSubtract?: boolean
    isDeleted?: boolean
}
export interface ICategory {
    id?: number
    name: string
    description?: string
    isDeleted?: boolean
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

export interface TCategoryData extends IDataResponse<ICategory> {}

export interface TTypeData extends IDataResponse<ITypes> {}

export interface ITotalTransaction
    extends IDataResponse<TotalTransactionType> {}

export interface ITransactionPercentage
	extends IDataResponse<TransactionPercentageType> { }
	
export interface IMonthlyTotal extends IDataResponse<MonthlyTotalType[]> {}
