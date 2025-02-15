import Joi from "joi"

const createCourtSessionSchema = Joi.object({
  startHour: Joi.string().required(),
  endHour: Joi.string().required(),
  status: Joi.string().valid("UNAVAILABLE", "AVAILABLE").optional(),
})

export default {
  createCourtSessionSchema,
}
