import express from "express"
import settingController from "./controllers/setting.controller"
import { authMiddleware } from "@/shared/lib/auth-middleware"
import { adminPermissionMiddleware } from "@/shared/lib/admin-permission-middleware"

const router = express.Router()

router.use(authMiddleware)

router.put("/update", adminPermissionMiddleware(["update setting"]), settingController.updateSetting)

export default router
