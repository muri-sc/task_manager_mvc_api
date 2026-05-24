import { Router } from "express"
import * as taskController from "../controllers/task.controller"
import isAuthenticated from "../middlewares/auth.middleware"
import validate from "../middlewares/validate.middleware"
import { createTaskSchema, deleteTaskSchema } from "../validators/task.validators"

const router = Router()

router.post("/create",
    isAuthenticated,
    validate({ body: createTaskSchema }),
    taskController.createTaskHandler
)

router.delete("/:id",
    isAuthenticated,
    validate({ params: deleteTaskSchema }),
    taskController.deleteTaskHandler
)

export default router