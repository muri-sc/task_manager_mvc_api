import { Router } from "express"
import validate from "../middlewares/validate.middleware"
import { createUserSchema } from "../validators/auth.validators"
import * as authController from "../controllers/auth.controller"

const router = Router()

router.post("/register",
    validate({ body: createUserSchema }),
    authController.createUserHandler
)

export default router