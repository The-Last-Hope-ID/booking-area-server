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

const updateCourt = async (
  id: number,
  court: {
    name: string
    description?: string
    image?: string
  },
) => {
  const payload = validate(courtValidation.updateCourtSchema, court)

  if (payload.image) {
    const responseStoreImage = await storeImage.uploader.upload(payload.image.tempFilePath, {}, (error, result) => {
      if (error) {
        throw new Error(error.message)
      }
      return result
    })

    payload.image = responseStoreImage.url
  }

  const data = await db.court.update({
    where: {
      id,
    },
    data: payload,
  })

  return data
}

const deleteCourt = async (id: number) => {
  const court = await db.court.findUnique({
    where: {
      id,
    },
  })

  if (!court) {
    throw new Error("Court not found")
  }

  const data = await db.court.delete({
    where: {
      id,
    },
  })

  return data
}

export default {
  createCourt,
  updateCourt,
  deleteCourt,
}
