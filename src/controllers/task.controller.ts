import { Request, Response } from "express"
import { CreateTaskDTO } from "../validators/task.validators"
import * as taskModel from "../models/task.model"

export {
    createTaskHandler
}

async function createTaskHandler(
    req: Request<{}, {}, CreateTaskDTO>,
    res: Response<{}>,
) {
    try {
        const { title } = req.body

    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(400).json({ message: "Invalid data request", error: err.message })
        }
        return res.status(500).json({ message: "Internal server error" })
    }
}