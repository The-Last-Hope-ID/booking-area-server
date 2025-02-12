import { validate } from "@/shared/lib/utils"
import courtValidation from "../validations/court.validation"
import db from "@/config/db"
import storeImage from "@/shared/lib/store-image"

const createCourt = async (court: {
  name: string
  description?: string
  image: string
}): Promise<{
  id: number
  name: string
  image: string
}> => {
  const payload = validate(courtValidation.createCourtSchema, court)

  const responseStoreImage = await storeImage.uploader.upload(payload.image.tempFilePath, {}, (error, result) => {
    if (error) {
      throw new Error(error.message)
    }
    return result
  })

  const data = await db.court.create({
    data: {
      name: payload.name,
      description: payload.description,
      image: responseStoreImage.url,
    },
  })

  return data
}

export default {
  createCourt,
}
