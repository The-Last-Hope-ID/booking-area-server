import Joi from "joi"

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required().max(50),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  profileImg: Joi.object({
    size: Joi.number().max(5242880).required(), // example max size 5MB
    mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
  })
    .optional()
    .unknown(true),
  phone: Joi.string().optional(),
})

const updateUserSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).optional(),
  profileImg: Joi.object({
    size: Joi.number().max(5242880).required(), // example max size 5MB
    mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
  })
    .optional()
    .unknown(true),
  phone: Joi.string().optional(),
})

export default {
  createUserSchema,
  updateUserSchema,
}
