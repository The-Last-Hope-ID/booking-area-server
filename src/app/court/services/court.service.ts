import { validate } from "@/shared/lib/utils"
import courtValidation from "../validations/court.validation"
import db from "@/config/db"
import storeImage from "@/shared/lib/store-image"

const getCourtsPagination = async (req: {
  query: {
    page?: number
    perPage?: number
    search?: string
  }
}) => {
  const { page = 1, perPage = 10, search } = req.query

  const data = await db.court.findMany({
    where: search
      ? {
          OR: [
            {
              name: {
                contains: search,
              },
            },
            {
              description: {
                contains: search,
              },
            },
          ],
        }
      : {},
    skip: (Number(page) - 1) * Number(perPage),
    take: Number(perPage),
  })
  const totalRecords = await db.court.count({
    where: search
      ? {
          OR: [
            {
              name: {
                contains: search,
              },
            },
            {
              description: {
                contains: search,
              },
            },
          ],
        }
      : {},
  })
  const totalPages = Math.ceil(totalRecords / Number(perPage))

  return {
    data,
    meta: {
      page: Number(page),
      perPage: Number(perPage),
      totalPages,
    },
  }
}

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
  getCourtsPagination,
  createCourt,
  updateCourt,
  deleteCourt,
}
