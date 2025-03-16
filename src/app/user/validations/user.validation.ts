import Joi, { required } from "joi";

const createUserSchema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required().max(50),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    profileImg: Joi.string().required(),
})

const updateUserSchema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    profileImg: Joi.string().required(),
    phone: Joi.string().required(),
})

export default {
    createUserSchema,
    updateUserSchema,
}