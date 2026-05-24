import { z } from "zod"

export {
    createTaskSchema,
    deleteTaskSchema,
    CreateTaskDTO,
    DeleteTaskDTO
}

const createTaskSchema = z.object({
    title: z
    .string()
    .max(255)
})

const deleteTaskSchema = z.object({
    id: z
    .coerce.number()
})

type CreateTaskDTO = z.infer<typeof createTaskSchema>
type DeleteTaskDTO = z.infer<typeof deleteTaskSchema>