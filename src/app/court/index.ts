import express from "express"
import courtController from "./controllers/court.controller"
import courtPriceDayController from "./controllers/court-price-day.controller"
import courtSessionController from "./controllers/court-session.controller"
import courtUnavailableSessionController from "./controllers/court-unavailable.controller"

const router = express.Router()

router.get("/", courtController.getCourts)
router.post("/", courtController.createCourt)
router.put("/:courtId/days/:dayId", courtPriceDayController.updatePriceDay)
router.post("/:courtId/sessions", courtSessionController.createSession)
// router.put("/:courtId/sessions/:sessionId", courtSessionController.updateSession)
router.delete("/:courtId/sessions/:sessionId", courtSessionController.deleteSession)
router.get("/:courtId/unavailables", courtUnavailableSessionController.getUnavailables)
router.post("/:courtId/unavailables", courtUnavailableSessionController.createUnvailableCourt)
router.put("/:courtId/unavailables/:unavailableId", courtUnavailableSessionController.updateUnvailableCourt)
router.delete("/:courtId/unavailables/:unavailableId", courtUnavailableSessionController.deleteUnvailableCourt)
router.put("/:courtId", courtController.updateCourt)
router.delete("/:courtId", courtController.deleteCourt)

export default router
