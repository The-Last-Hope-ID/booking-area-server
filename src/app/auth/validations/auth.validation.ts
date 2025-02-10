import Joi from "joi"

const registerSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  phone: Joi.string().min(12).max(15).optional(),
})

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

export default {
  registerSchema,
  loginSchema,
}
