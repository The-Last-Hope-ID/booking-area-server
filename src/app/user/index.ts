import express from "express"
import authMiddleware from "../auth/middlewares/auth.middleware"
import userController from "./controllers/user.controller"

const router = express.Router()

router.post("/", userController.createUser)
router.get("/",userController.getUsers )
router.put("/:id", userController.updateUser)
router.delete("/:id", userController.deleteUser)

export default router