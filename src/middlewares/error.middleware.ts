import { Request, Response, NextFunction } from "express"
import { ZodError } from "zod"
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken"

export default function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {

    if (err instanceof ZodError) {
        return res.status(400).json({
            message: "Validation error",
            error: err.issues.map(issue => ({
                field: issue.path.join("."),
                message: issue.message
            }))
        })
    }

    if (err instanceof JsonWebTokenError) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }

    if (err instanceof TokenExpiredError) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }

    if (err instanceof Error) {
        switch (err.message) {

            case "USER_ALREADY_EXISTS":
                return res.status(409).json({
                    message: "A user with this email already exists"
                })
            case "INVALID_CREDENTIALS":
                return res.status(401).json({
                    message: "Invalid email or password"
                })
            case "USER_NOT_FOUND":
                return res.status(404).json({
                    message: "User not found"
                })
            case "TASK_NOT_FOUND":
                return res.status(404).json({
                    message: "Task not found"
                })
            case "NOT_PROVIDED_TOKEN":
                return res.status(401).json({
                    message: "Not provided token"
                })
        }
    }

    console.error(err)
    return res.status(500).json({
        message: "Internal server error"
    })
}