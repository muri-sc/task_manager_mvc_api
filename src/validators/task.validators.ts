import { z } from "zod"

export {
    createTaskSchema,
    CreateTaskDTO,
    updateTaskParamsSchema,
    updateTaskSchema,
    UpdateTaskDTO,
    deleteTaskParamsSchema
}

const createTaskSchema = z.object({
    title: z
    .string()
    .max(255)
})

const updateTaskParamsSchema = z.object({
    id: z
    .coerce.number()
})

const updateTaskSchema = z.object({
    title: z
    .string()
    .max(255)
})

const deleteTaskParamsSchema = z.object({
    id: z
    .coerce.number()
})

type CreateTaskDTO = z.infer<typeof createTaskSchema>
type UpdateTaskDTO = z.infer<typeof updateTaskSchema>