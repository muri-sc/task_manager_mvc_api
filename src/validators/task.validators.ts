import { z } from "zod"

export {
    CreateTaskDTO
}

const createTaskSchema = z.object({
    

})

type CreateTaskDTO = z.infer<typeof createTaskSchema>