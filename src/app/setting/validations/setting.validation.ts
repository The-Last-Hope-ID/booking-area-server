import joi from "joi"


const updateSettingSchema = joi.object({
    companyName: joi.string().required(),
    companyDescription: joi.string().required(),
    companyLogo: joi.string().required(),
    companyAddress: joi.string().required(),
})

export default{
    updateSettingSchema
}
