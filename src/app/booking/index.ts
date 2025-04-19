import express from "express"
import bookingController from "./controllers/booking.controller"
import { authMiddleware } from "@/shared/lib/auth-middleware"
import { adminPermissionMiddleware } from "@/shared/lib/admin-permission-middleware"

const router = express.Router()

router.use(authMiddleware)

router.get("/", bookingController.getBookings)
router.post("/", bookingController.createBooking)
router.put("/:id/settle", adminPermissionMiddleware(["update booking"]), bookingController.settleBooking)
router.patch("/:id/complete-payment", bookingController.completePayment)
router.delete("/:id", adminPermissionMiddleware(["delete booking"]), bookingController.deleteBooking)

export default router
