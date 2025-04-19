import express from "express"
import roleController from "./controllers/role.controller"
import { authMiddleware } from "@/shared/lib/auth-middleware"
import { adminPermissionMiddleware } from "@/shared/lib/admin-permission-middleware"

const router = express.Router()

router.use(authMiddleware)

router.get("/", adminPermissionMiddleware(["view role"]), roleController.getRoles)
router.get("/:roleId", adminPermissionMiddleware(["detail role"]), roleController.getRole)
router.post("/", adminPermissionMiddleware(["create role"]), roleController.createRole)
router.put("/:roleId", adminPermissionMiddleware(["update role"]), roleController.updateRole)
router.delete("/:roleId", adminPermissionMiddleware(["delete role"]), roleController.deleteRole)

export default router
