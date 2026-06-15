import { Request, Response, NextFunction } from "express"
import { validateToken } from "../utils/token"

export default function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        throw new Error("NOT_PROVIDED_TOKEN")
    }
    const token = authHeader.split(" ")[1]

    const decoded = validateToken(token);
    (req as any).user = decoded

    next()
}