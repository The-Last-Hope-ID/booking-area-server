import Joi from "joi"

const courtUnavailableSchema = Joi.object({
  date: Joi.string().required(),
})

export default {
  courtUnavailableSchema,
}
