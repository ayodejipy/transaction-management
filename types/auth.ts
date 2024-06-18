import type { z } from 'zod'
import type { IDataResponse } from "./api"
import type { IUser } from './user'

export interface ITokenData {
    token: string
    refreshToken: string
    expiresAt: string
}

export interface IAuth extends ITokenData {
    user: IUser
}
export type TSchema = z.output<typeof acceptInviteSchema>

export type TForgotPasswordSchema = z.output<typeof ForgotPasswordSchema>

export interface IAuthData extends IDataResponse<IAuth> {}