import { z } from "zod"

export {
    createUserSchema,
    loginUserSchema,
    CreateUserDTO,
    LoginUserDTO,
}

const noSpaces = (text: string) => !text.includes(" ")

const createUserSchema = z.object({
    email: z
        .email()
        .max(255)
        .refine(
            noSpaces, { message: "Expected string to not have spaces" }
        ),
    password: z
        .string()
        .min(8)
        .max(255)
        .refine(
            noSpaces, { message: "Expected string to not have spaces" }
        )
})

const loginUserSchema = z.object({
    email: z
        .email()
        .max(255),
    password: z
        .string()
        .max(255)
})

type CreateUserDTO = z.infer<typeof createUserSchema>
type LoginUserDTO = z.infer<typeof loginUserSchema>