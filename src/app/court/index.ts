import express from "express"
import courtController from "./controllers/court.controller"
import courtPriceDayController from "./controllers/court-price-day.controller"

const router = express.Router()

router.get("/", courtController.getCourts)
router.post("/", courtController.createCourt)
router.put("/days/:id", courtPriceDayController.updatePriceDay)
router.put("/:id", courtController.updateCourt)
router.delete("/:id", courtController.deleteCourt)

export default router
