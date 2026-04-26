import { Request, Response } from "express"
import { CreateUserDTO, LoginUserDTO } from "../validators/auth.validators"
import * as authModel from "../models/auth.model"

export {
    createUserHandler,
    loginUserHandler
}

async function createUserHandler(
    req: Request<{}, {}, CreateUserDTO>,
    res: Response<{}>
) {
    try {
        const { email, password } = req.body
        const data = await authModel.createUser(email, password)

        return res.status(201).json({ message: "User created", data: { user: data } })

    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(400).json({ message: "Invalid data request", error: err.message })
        }
        return res.status(500).json({ message: "Internal server error" })
    }
}

async function loginUserHandler(
    req: Request<{}, {}, LoginUserDTO>,
    res: Response<{}>
) {
    try {
        const { email, password } = req.body
        const data = await authModel.loginUser(email, password)

        return res.status(200).json({ message: "Sucessful login", data })

    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(400).json({ message: "Invalid data request", error: err.message })
        }
        return res.status(500).json({ message: "Internal server error" })
    }
}