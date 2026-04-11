import { Router } from "express"
import { Request, Response } from "express"
import * as authController from "../controllers/auth.controller"

const router = Router()

router.get("/test", (req: Request, res: Response) => {

    res.json({ message: "Ok" })
})

export default router