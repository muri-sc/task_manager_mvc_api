import { Request, Response } from "express"
import { CreateTaskDTO, UpdateTaskDTO, updateTaskParamsSchema, deleteTaskParamsSchema } from "../validators/task.validators"
import * as taskModel from "../models/task.model"

export {
    createTaskHandler,
    updateTaskHandler,
    deleteTaskHandler
}

async function createTaskHandler(
    req: Request<{}, {}, CreateTaskDTO>,
    res: Response
) {
    const { title } = req.body
    const userId = (req as any).user.id

    const data = await taskModel.createTask(title, userId)

    return res.status(201).json({ message: "Task created", data: data })
}

async function updateTaskHandler(
    req: Request<{ id: string }, {}, UpdateTaskDTO>,
    res: Response
) {
    const { title } = req.body
    const { id } = updateTaskParamsSchema.parse(req.params)
    const userId = (req as any).user.id

    const data = await taskModel.updateTask(title, id, userId)

    return res.status(200).json({ message: "Task updated", data: data })
}

async function deleteTaskHandler(
    req: Request<{ id: string }, {}, {}>,
    res: Response
) {
    const { id } = deleteTaskParamsSchema.parse(req.params)
    const userId = (req as any).user.id

    await taskModel.deleteTask(id, userId)

    return res.status(204).send()
}
