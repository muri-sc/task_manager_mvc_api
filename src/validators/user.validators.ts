import { z } from "zod"

export const createTaskSchema = z.object({
    title: z
    .string()
    .max(255)
})

export const updateTaskParamsSchema = z.object({
    id: z
    .coerce.number()
})

export const updateTaskSchema = z.object({
    title: z
    .string()
    .max(255)
})

export const deleteTaskParamsSchema = z.object({
    id: z
    .coerce.number()
})

export type CreateTaskDTO = z.infer<typeof createTaskSchema>
export type UpdateTaskDTO = z.infer<typeof updateTaskSchema>