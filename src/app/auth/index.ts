import express from "express"
import "@/app/auth/lib/passport-google"
import "@/app/auth/lib/passport-local"
import authController from "@/app/auth/controllers/auth.controller"
import authMiddleware from "@/app/auth/middlewares/auth.middleware"

const router = express.Router()

router.get("/google", authMiddleware.googleAuth())
router.get("/google/callback", authMiddleware.googleAuthCallback(), authController.googleAuthCallback)
router.post("/login", authController.loginAuth)
router.post("/register", authController.registerAuth)

export default router
