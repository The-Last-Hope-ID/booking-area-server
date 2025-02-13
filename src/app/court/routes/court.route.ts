import express from "express"
import courtController from "../controllers/court.controller"

const router = express.Router()

router.post("/", courtController.createCourt)

export default router
