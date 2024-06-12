import { z } from 'zod'
import type { IDataResponse } from "./api"

export interface IUser {
	uid: string
	type: string
	email: string
	firstName: string
	lastName: string
	phone: string
}
export interface ITokenData {
    token: string
    refreshToken: string
    expiresAt: string
}

export interface IAuth extends ITokenData {
    user: IUser
}
export type TSchema = z.output<typeof acceptInviteSchema>

export interface IAuthData extends IDataResponse<IAuth> {}