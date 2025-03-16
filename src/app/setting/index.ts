import express from "express";
import settingController from "./controllers/setting.controller";
import {authMiddleware} from "@/shared/lib/auth-middleware";

const router = express.Router()

router.use(authMiddleware)

router.put("/update", settingController.updateSetting)


export default router