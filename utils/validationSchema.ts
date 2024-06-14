import { z } from 'zod'

export const acceptInviteSchema = z
    .object({
        email: z.string().email('Please provide a valid email'),
        password: z
            .string()
            .min(8, 'Must be at least 8 characters')
            .refine((val) => /[0-9!?#$.*]/.test(val), {
                message:
                    'Your password must contain at least one of (!?#$ *.).',
            }),
        confirmPassword: z.string().min(8, 'Must be at least 8 characters'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    })


export const TransactionTypeSchema = z
    .object({
        name: z.string(),
        description: z
            .string().optional(),
    })


export const AddTransactionSchema = z.object({
    amount: z.number(),
    typeId: z.number(),
    categoryId: z.number(),
    transactionDate: z.string(),
    description: z.string(),
})
