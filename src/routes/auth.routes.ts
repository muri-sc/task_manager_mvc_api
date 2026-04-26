import { Router } from "express"
import validate from "../middlewares/validate.middleware"
import { createUserSchema, loginUserSchema } from "../validators/auth.validators"
import * as authController from "../controllers/auth.controller"

const router = Router()

router.post("/register",
    validate({ body: createUserSchema }),
    authController.createUserHandler
)

router.post("/login",
    validate({ body: loginUserSchema }),
    authController.loginUserHandler
)

export default router