import Joi from "joi"

const createRoleSchema = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.array().items(Joi.number()).required(),
})

const updateRoleSchema = Joi.object({
  name: Joi.string(),
  permissions: Joi.array().items(Joi.number()).required(),
})

export default { createRoleSchema, updateRoleSchema }
