import { Request, Response, NextFunction } from "express"
import { ZodType, ZodError } from "zod"

type ValidationDTO = {
    body?: ZodType
    params?: ZodType
    query?: ZodType
}

export default function validate(schema: ValidationDTO) {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            if (schema.body) req.body = schema.body.parse(req.body)
            if (schema.params) req.params = schema.params.parse(req.params) as any
            if (schema.query) req.query = schema.query.parse(req.query) as any

            return next()

        } catch (err: unknown) {
            if (err instanceof ZodError) {
                return res.status(400).json({ message: "Invalid data request", error: err.message })
            }
            return res.status(500).json({ message: "Internal server error" })
        }
    }
}
