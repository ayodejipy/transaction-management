import type { z } from 'zod'
import type { IDataResponse } from './api'

export interface IUser {
    uid: string
    type: string
    email: string
    firstName: string
    lastName: string
    phone: string
    roles: string[]
}
export interface InvitedUserInterface {
    id: number
    email: string
    firstName: string
    lastName: string
    phone: string
    isAccepted: boolean
}

export type InviteUserForm = Omit<InvitedUserInterface, 'id' | 'isAccepted'>

export type InviteUserSchemaType = z.output<typeof InviteUserSchema>

export interface IUserData extends IDataResponse<IUser> {}

export interface IInvitedUsersData
    extends IDataResponse<InvitedUserInterface[]> {}
