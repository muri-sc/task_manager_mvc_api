import { Router } from "express"
import * as authController from "../controllers/auth.controller"
import validate from "../middlewares/validate.middleware"
import { createUserSchema, loginUserSchema } from "../validators/auth.validators"

const router = Router()

router.post("/register",
    validate({ body: createUserSchema }),
    authController.createUserHandler
)

router.post("/",
    validate({ body: loginUserSchema }),
    authController.loginUserHandler
)

export default router