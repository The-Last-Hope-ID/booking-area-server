import express from "express"
import courtController from "./controllers/court.controller"
import courtPriceDayController from "./controllers/court-price-day.controller"
import courtSessionController from "./controllers/court-session.controller"
import courtUnavailableSessionController from "./controllers/court-unavailable.controller"
import { authMiddleware } from "@/shared/lib/auth-middleware"
import { adminPermissionMiddleware } from "@/shared/lib/admin-permission-middleware"

const router = express.Router()

router.use(authMiddleware)

router.get("/", adminPermissionMiddleware(["view court"], true), courtController.getCourts)
router.post("/", adminPermissionMiddleware(["create court"]), courtController.createCourt)
router.get("/:courtId", adminPermissionMiddleware(["detail court"], true), courtController.getCourt)
router.put("/:courtId", adminPermissionMiddleware(["update court"]), courtController.updateCourt)
router.delete("/:courtId", adminPermissionMiddleware(["delete court"]), courtController.deleteCourt)

router.get("/:courtId/price-days", adminPermissionMiddleware(["view court price days"], true), courtPriceDayController.getPriceDays)
router.put("/:courtId/price-days/:priceDayId", adminPermissionMiddleware(["update court price days"]), courtPriceDayController.updatePriceDay)

router.get("/:courtId/sessions", adminPermissionMiddleware(["view court sessions"], true), courtSessionController.getSession)
router.post("/:courtId/sessions", adminPermissionMiddleware(["create court sessions"]), courtSessionController.createSession)
// router.put("/:courtId/sessions/:sessionId", courtSessionController.updateSession)
router.delete("/:courtId/sessions/:sessionId", adminPermissionMiddleware(["delete court sessions"]), courtSessionController.deleteSession)

router.get("/:courtId/unavailables", adminPermissionMiddleware(["view court unavailables"], true), courtUnavailableSessionController.getUnavailables)
router.post(
  "/:courtId/unavailables",
  adminPermissionMiddleware(["create court unavailables"]),
  courtUnavailableSessionController.createUnvailableCourt,
)
router.put(
  "/:courtId/unavailables/:unavailableId",
  adminPermissionMiddleware(["update court unavailables"]),
  courtUnavailableSessionController.updateUnvailableCourt,
)
router.delete(
  "/:courtId/unavailables/:unavailableId",
  adminPermissionMiddleware(["delete court unavailables"]),
  courtUnavailableSessionController.deleteUnvailableCourt,
)

export default router
