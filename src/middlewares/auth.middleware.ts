import { Request, Response, NextFunction } from "express"
import { validateToken } from "../utils/token"

export default function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: "Invalid token" })
    }
    const token = authHeader.split(" ")[1]

    try {
        const decoded = validateToken(token)
        ;(req as any).user = decoded

        next()
    } catch {
        return res.status(401).json({ message: "Invalid token" })
    }
}