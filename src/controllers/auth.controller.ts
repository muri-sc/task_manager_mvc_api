import { Request, Response } from "express"
import { ICreateUserSchema, ILoginUserSchema } from "../validators/auth.validators"
import * as authModel from "../models/auth.model"

export {
    createUserHandler,
    loginUserHandler
}

async function createUserHandler(
    req: Request<{}, {}, ICreateUserSchema>,
    res: Response<{}>
) {
    try {
        const { email, password } = req.body
        const user = await authModel.createUser(email, password)

        return res.status(201).json({ message: "User created", user: user })

    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(400).json({ message: "Invalid data request", error: err.message })
        }
        return res.status(500).json({ message: "Internal server error" })
    }
}

async function loginUserHandler(
    req: Request<{}, {}, ILoginUserSchema>,
    res: Response<{}>
) {
    try {
        const { email, password } = req.body

    } catch (err: unknown) {

    }
}