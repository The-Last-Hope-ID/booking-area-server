import express from "express"
import courtController from "./controllers/court.controller"
import courtPriceDayController from "./controllers/court-price-day.controller"
import courtSessionController from "./controllers/court-session.controller"
import courtUnavailableSessionController from "./controllers/court-unavailable.controller"
import { authMiddleware } from "@/shared/lib/auth-middleware"

const router = express.Router()

router.use(authMiddleware)

router.get("/", courtController.getCourts)
router.post("/", courtController.createCourt)
router.get("/:courtId", courtController.getCourt)
router.put("/:courtId", courtController.updateCourt)
router.delete("/:courtId", courtController.deleteCourt)

router.get("/:courtId/price-days", courtPriceDayController.getPriceDays)
router.put("/:courtId/price-days/:priceDayId", courtPriceDayController.updatePriceDay)

router.get("/:courtId/sessions", courtSessionController.getSession)
router.post("/:courtId/sessions", courtSessionController.createSession)
// router.put("/:courtId/sessions/:sessionId", courtSessionController.updateSession)
router.delete("/:courtId/sessions/:sessionId", courtSessionController.deleteSession)

router.get("/:courtId/unavailables", courtUnavailableSessionController.getUnavailables)
router.post("/:courtId/unavailables", courtUnavailableSessionController.createUnvailableCourt)
router.put("/:courtId/unavailables/:unavailableId", courtUnavailableSessionController.updateUnvailableCourt)
router.delete("/:courtId/unavailables/:unavailableId", courtUnavailableSessionController.deleteUnvailableCourt)

export default router
