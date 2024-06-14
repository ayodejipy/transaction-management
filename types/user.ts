import type { IDataResponse } from './api'

export interface IUser {
    uid: string
    type: string
    email: string
    firstName: string
    lastName: string
    phone: string
}

export interface IUserData extends IDataResponse<IUser> {}
