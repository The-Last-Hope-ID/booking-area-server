import { NextFunction, Request, Response } from "express"
import bookingService from "../services/booking.service"
import { User } from "@/shared/types"

const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as User
    console.log({ date: new Date().toISOString() })
    const booking = await bookingService.createBooking({
      userId: user.id,
      invoiceNumber: req.body.invoiceNumber,
      courtSessionId: req.body.courtSessionId,
      bookingDate: req.body.bookingDate,
      paymentType: req.body.paymentType,
      downPayment: req.body.downPayment,
    })

    res.json({
      message: "Created",
      status: 201,
      data: booking,
    })
  } catch (e) {
    next(e)
  }
}

const completePayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booking = await bookingService.completePayment(Number(req.params.id))

    res.json({
      message: "OK",
      status: 200,
      data: booking,
    })
  } catch (e) {
    next(e)
  }
}

const settleBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as User
    const booking = await bookingService.settleBooking({
      adminId: user.id,
      bookingId: Number(req.params.id),
      price: req.body.price,
    })

    res.json({
      message: "OK",
      status: 200,
      data: booking,
    })
  } catch (e) {
    next(e)
  }
}

export default {
  createBooking,
  settleBooking,
  completePayment,
}
