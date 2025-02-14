import Joi from "joi"

const createCourtSchema = Joi.object({
  name: Joi.string().max(100).required(),
  description: Joi.string().optional(),
  image: Joi.object({
    size: Joi.number().max(5242880).required(), // example max size 5MB
    mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
  })
    .required()
    .unknown(true),
})

const updateCourtSchema = Joi.object({
  name: Joi.string().max(100).required(),
  description: Joi.string().optional(),
  image: Joi.object({
    size: Joi.number().max(5242880).required(), // example max size 5MB
    mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
  })
    .optional()
    .unknown(true),
})

export default {
  createCourtSchema,
  updateCourtSchema,
}
