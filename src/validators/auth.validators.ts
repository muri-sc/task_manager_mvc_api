import { z } from "zod"

const noSpaces = (text: string) => !text.includes(" ")

export const createUserSchema = z.object({
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

export const loginUserSchema = z.object({
    email: z
        .email()
        .max(255),
    password: z
        .string()
        .max(255)
})

export type CreateUserDTO = z.infer<typeof createUserSchema>
export type LoginUserDTO = z.infer<typeof loginUserSchema>