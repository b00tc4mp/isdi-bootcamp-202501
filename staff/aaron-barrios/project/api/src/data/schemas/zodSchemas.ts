import { object, z } from "zod"

//DEFAULT LAYER (WORKS IN TIME COMPILATION) THAT
//PREVENTS US TO MAKE AN API CALL IF THROWS AN ERROR
export const registerUserSchema = object({
    name: z
        .string()
        .min(1, 'Name must be at least 1 character')
        .max(20, 'Name must be at last 20 characters'),
    lastName: z
        .string()
        .min(3, 'Last Name must be at least 3 characters')
        .max(20, 'Last Name must be at least 20 characters'),
    email: z
        .string()
        .email('Invalid email address')
        .max(30, 'Email must be at last 30 characters'),
    alias: z
        .string()
        .min(1, 'Alias must be at least 1 character')
        .max(16, 'Alias must be at last 16 characters'),
    password: z
        .string()
        .min(3, 'Password must be at least 6 characters')
        .max(50, 'Password must be at last 50 characters')
})

export const authenticateUserSchema = object({
    alias: z
        .string()
        .min(1, 'Alias must be at least 1 character')
        .max(16, 'Alias must be at last 16 characters'),
    password: z
        .string()
        .min(3, 'Password must be at least 6 characters')
        .max(50, 'Password must be at last 50 characters')
})

export type RegisterUserInput = z.infer<typeof registerUserSchema>
export type userAuthInput = z.infer<typeof authenticateUserSchema>
