import express from "express"
import roleController from "./controllers/role.controller"
import { authMiddleware } from "@/shared/lib/auth-middleware"

const router = express.Router()

router.use(authMiddleware)

router.get("/", roleController.getRoles)
router.get("/:roleId", roleController.getRole)
router.post("/", roleController.createRole)
router.put("/:roleId", roleController.updateRole)
router.delete("/:roleId", roleController.deleteRole)

export default router
