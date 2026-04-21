import { z } from "zod"

export {
    createUserSchema,
    loginUserSchema,
    ICreateUserSchema,
    ILoginUserSchema,
}

const createUserSchema = z.object({
    email: z.email().max(255),
    password: z.string().min(8).max(255)
})

const loginUserSchema = z.object({
    email: z.email().max(255),
    password: z.string().max(255)
})

type ICreateUserSchema = z.infer<typeof createUserSchema>
type ILoginUserSchema = z.infer<typeof createUserSchema>