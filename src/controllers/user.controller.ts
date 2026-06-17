import { Request, Response } from "express"
import * as userModel from "../models/user.model"

export {
    deleteUserHandler,
}

async function deleteUserHandler(
    req: Request,
    res: Response
) {
    const userId = (req as any).user.id

    await userModel.deleteUser(userId)

    return res.status(200).json({ message: "User deleted" })
}