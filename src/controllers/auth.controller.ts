import { Request, Response } from "express"

export {
    createUserHandler,
    loginUserHandler
}

function createUserHandler(
    req: Request,
    res: Response
) {
    res.status(201).json("ok")
}

function loginUserHandler(
    req: Request,
    res: Response
) {
    
}