import Joi from "joi"

const createBookingSchema = Joi.object({
  invoiceNumber: Joi.string().required(),
  courtSessionId: Joi.number().required(),
  bookingDate: Joi.string().required(),
  paymentType: Joi.string().required(),
  downPayment: Joi.number().required(),
})

const settleBookingSchema = Joi.object({
  price: Joi.number().required(),
})

export default {
  createBookingSchema,
  settleBookingSchema,
}
