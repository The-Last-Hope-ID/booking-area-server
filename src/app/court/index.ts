import express from "express"
import courtController from "./controllers/court.controller"
import courtPriceDayController from "./controllers/court-price-day.controller"

const router = express.Router()

router.post("/", courtController.createCourt)
router.put("/days/:id", courtPriceDayController.updatePriceDay)

export default router
