import express from "express"
import { authMiddleware } from "@/shared/lib/auth-middleware"
import userController from "./controllers/user.controller"
import { adminPermissionMiddleware } from "@/shared/lib/admin-permission-middleware"

const router = express.Router()

router.use(authMiddleware)

router.post("/", adminPermissionMiddleware(["create user"]), userController.createUser)
router.get("/", adminPermissionMiddleware(["view user"]), userController.getUsers)
router.get("/:id", adminPermissionMiddleware(["detail user"]), userController.getUser)
router.put("/:id", adminPermissionMiddleware(["update user"]), userController.updateUser)
router.delete("/:id", adminPermissionMiddleware(["delete user"]), userController.deleteUser)

export default router
