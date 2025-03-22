import db from "@/config/db"
import { validate } from "@/shared/lib/utils"
import bookingValidation from "../validations/booking.validation"

const getBookingsPagination = async (req: {
  query: {
    page?: number
    perPage?: number
    search?: string
    to?: string
    from?: string
  }
}) => {
  const { page = 1, perPage = 10, to = new Date(), from = new Date() } = req.query

  const data = await db.booking.findMany({
    where: {
      AND: [
        {
          bookingDate: {
            lte: to,
          },
        },
        {
          bookingDate: {
            gte: from,
          },
        },
      ],
      deletedAt: null,
    },
    include: {
      user: true,
      admin: true,
      session: true,
    },
    skip: (Number(page) - 1) * Number(perPage),
    take: Number(perPage),
  })
  const totalRecords = await db.booking.count({
    where: {
      AND: [
        {
          bookingDate: {
            lte: to,
          },
        },
        {
          bookingDate: {
            gte: from,
          },
        },
      ],
      deletedAt: null,
    },
  })
  const totalPages = Math.ceil(totalRecords / Number(perPage))

  return {
    data,
    meta: {
      page: Number(page),
      perPage: Number(perPage),
      totalPages,
    },
  }
}

const createBooking = async (data: {
  userId: number
  invoiceNumber: string
  courtSessionId: number
  bookingDate: string
  paymentType: string
  downPayment: number
}) => {
  const payload = validate(bookingValidation.createBookingSchema, {
    invoiceNumber: data.invoiceNumber,
    courtSessionId: data.courtSessionId,
    bookingDate: data.bookingDate,
    paymentType: data.paymentType,
    downPayment: data.downPayment,
  })

  const booking = await db.booking.create({
    data: {
      userId: data.userId,
      invoiceNumber: payload.invoiceNumber,
      courtSessionId: payload.courtSessionId,
      bookingDate: payload.bookingDate,
      paymentType: payload.paymentType,
      downPayment: payload.downPayment,
    },
  })

  return booking
}

const completePayment = async (bookingId: number) => {
  const isBookingExist = await db.booking.findUnique({
    where: {
      id: bookingId,
    },
  })

  if (!isBookingExist) {
    throw new Error("Booking not found")
  }

  const booking = await db.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      paymentCompleted: true,
    },
  })

  return booking
}

/**
 * Settle a booking by updating its status to "COMPLETED" and calculating the total price.
 *
 * This function is used to finalize a booking that was previously partially paid (down payment).
 * It validates the input data against the settleBookingSchema, checks if the booking exists,
 * and then updates the booking with the total price and status.
 */
const settleBooking = async (data: { adminId: number; bookingId: number; price: number }) => {
  const payload = validate(bookingValidation.settleBookingSchema, { price: data.price })

  const isBookingExist = await db.booking.findUnique({
    where: {
      id: data.bookingId,
    },
  })

  if (!isBookingExist) {
    throw new Error("Booking not found")
  }

  const booking = await db.booking.update({
    where: {
      id: data.bookingId,
    },
    data: {
      totalPrice: Number(isBookingExist.downPayment) + Number(payload.price),
      status: "COMPLETED",
      adminId: data.adminId,
    },
  })

  return booking
}

const deleteBooking = async (bookingId: number) => {
  const isBookingExist = await db.booking.findUnique({
    where: {
      id: bookingId,
    },
  })

  if (!isBookingExist) {
    throw new Error("Booking not found")
  }

  const booking = await db.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      deletedAt: new Date(),
    },
  })

  return booking
}

export default {
  createBooking,
  settleBooking,
  completePayment,
  deleteBooking,
  getBookingsPagination,
}
