import db from "@/config/db"
import { validate } from "@/shared/lib/utils"
import settingValidation from "../validations/setting.validation"


const updateSetting = async (data: {
    companyName: string
    companyDescription: string
    companyLogo: string
    companyAddress: string
    updateBy: number
}) => {
   const payload = validate(settingValidation.updateSettingSchema, {
        companyName: data.companyName,
        companyDescription: data.companyDescription,
        companyLogo: data.companyLogo,
        companyAddress: data.companyAddress,
    })

    const setting = await db.setting.findFirst()
    
    const res = await db.setting.update({
        where: {
            id: setting?.id,
        },
        data: {
            companyName: payload.companyName,
            companyDescription: payload.companyDescription,
            companyLogo: payload.companyLogo,
            companyAddress: payload.companyAddress,
            updatedBy: payload.updateBy,
        }
    })

    return res
}
export default {
    updateSetting
} 



