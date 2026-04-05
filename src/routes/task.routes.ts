import { Router } from "express"
import { Request, Response } from "express"

const router = Router()

router.get("/test", (req: Request, res: Response) => {
    
    res.json({ message: "Ok" })
})

export default router