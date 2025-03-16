import express from "express"
import bookingController from "./controllers/booking.controller"
import { authMiddleware } from "@/shared/lib/auth-middleware"

const router = express.Router()

router.use(authMiddleware)

router.get("/", bookingController.getBookings)
router.post("/", bookingController.createBooking)
router.put("/:id/settle", bookingController.settleBooking)
router.patch("/:id/complete-payment", bookingController.completePayment)
router.delete("/:id", bookingController.deleteBooking)

export default router