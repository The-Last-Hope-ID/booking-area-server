import Joi from "joi"

const updatePriceDaySchema = Joi.object({
  price: Joi.number().required(),
  downPayment: Joi.number().required().max(Joi.ref("price")),
})

export default {
  updatePriceDaySchema,
}
