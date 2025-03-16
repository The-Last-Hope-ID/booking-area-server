import express from "express"
import bookingController from "./controllers/booking.controller"
import { authMiddleware } from "@/shared/lib/auth-middleware"

const router = express.Router()

router.use(authMiddleware)

router.post("/", bookingController.createBooking)
router.put("/:id/settle", bookingController.settleBooking)
router.patch("/:id/complete-payment", bookingController.completePayment)

export default router