import { Request, Response } from "express"
import { CreateTaskDTO, DeleteTaskDTO, deleteTaskSchema } from "../validators/task.validators"
import * as taskModel from "../models/task.model"

export {
    createTaskHandler,
    deleteTaskHandler
}

async function createTaskHandler(
    req: Request<{}, {}, CreateTaskDTO>,
    res: Response<{}>,
) {
    try {
        const { title } = req.body
        const userId = (req as any).user.id

        const data = await taskModel.createTask(title, userId)

        return res.status(201).json({ message: "Task created", data: { task: data } })

    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(400).json({ message: "Invalid data request", error: err.message })
        }
        return res.status(500).json({ message: "Internal server error" })
    }
}

async function deleteTaskHandler(
    req: Request<{ id: string }, {}, {}>,
    res: Response<{}>,
) {
    try {
        const { id } = deleteTaskSchema.parse(req.params)
        const userId = (req as any).user.id

        await taskModel.deleteTask(id, userId)

        return res.status(204).json()

    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(400).json({ message: "Invalid data request", error: err.message })
        }
        return res.status(500).json({ message: "Internal server error" })
    }
}