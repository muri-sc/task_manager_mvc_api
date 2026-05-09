import { Router } from "express"
import { Request, Response } from "express"
import * as taskController from "../controllers/task.controller"
import isAuthenticated from "../middlewares/auth.middleware"

const router = Router()

router.get("/test",
    isAuthenticated,
    (req: Request, res: Response) => { res.json({ message: "Ok" }) })

export default router