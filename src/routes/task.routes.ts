import { Router } from "express"
import * as taskController from "../controllers/task.controller"
import isAuthenticated from "../middlewares/auth.middleware"
import validate from "../middlewares/validate.middleware"
import { createTaskSchema, updateTaskParamsSchema, updateTaskSchema, deleteTaskParamsSchema } from "../validators/task.validators"

const router = Router()

router.post("/",
    isAuthenticated,
    validate({ body: createTaskSchema }),
    taskController.createTaskHandler
)

router.put("/:id",
    isAuthenticated,
    validate({ params: updateTaskParamsSchema, body: updateTaskSchema }),
    taskController.updateTaskHandler
)

router.delete("/:id",
    isAuthenticated,
    validate({ params: deleteTaskParamsSchema }),
    taskController.deleteTaskHandler
)

export default router