import userValidation from "../validations/user.validation"
import db from "@/config/db"
import { ResponseError, validate } from "@/shared/lib/utils"
import storeImage from "@/shared/lib/store-image"
import { UploadedFile } from "express-fileupload"
import { generateHashedPassword } from "@/app/auth/lib/utils"

const createUser = async (data: {
  name: string
  username: string
  email: string
  password: string
  profileImg: UploadedFile | UploadedFile[] | undefined
  phone: string
}) => {
  const payload = validate(userValidation.createUserSchema, {
    name: data.name,
    username: data.username,
    email: data.email,
    password: data.password,
    profileImg: data.profileImg,
    phone: data.phone,
  })

  const emailAlreadyExists = await db.user.findFirst({
    where: {
      deletedAt: null,
      email: payload.email,
    },
  })

  if (emailAlreadyExists) {
    throw new ResponseError(400, "Email already exists")
  }

  const usernameAlreadyExists = await db.user.findFirst({
    where: {
      deletedAt: null,
      username: payload.username,
    },
  })

  if (usernameAlreadyExists) {
    throw new ResponseError(400, "Username already exists")
  }

  const phoneAlreadyExists = await db.user.findFirst({
    where: {
      deletedAt: null,
      phone: payload.phone,
    },
  })

  if (phoneAlreadyExists) {
    throw new ResponseError(400, "Phone number already exists")
  }

  if (payload.profileImg) {
    const responseStoreImage = await storeImage.uploader.upload(payload.profileImg.tempFilePath, {}, (error, result) => {
      if (error) {
        throw new Error(error.message)
      }

      return result
    })

    payload.profileImg = responseStoreImage.url
  }

  const user = await db.user.create({
    data: {
      name: payload.name,
      username: payload.username,
      email: payload.email,
      password: generateHashedPassword(payload.password),
      profileImg: payload.profileImg,
      isAdmin: true,
      phone: payload.phone,
    },
  })

  return user
}

const getUsers = async () => {
  const users = await db.user.findMany({
    where: {
      deletedAt: null,
      isAdmin: true,
    },
  })

  return users
}

const getUser = async (userId: number) => {
  const user = await db.user.findFirst({
    where: {
      deletedAt: null,
      id: userId,
    },
    include: {
      bookingsAdmin: true,
    },
  })

  if (!user) {
    throw new ResponseError(404, "User not found")
  }

  return user
}

const getUsersPagination = async (req: {
  query: {
    page?: number
    perPage?: number
    search?: string
  }
}) => {
  const { page = 1, perPage = 10, search } = req.query

  const data = await db.user.findMany({
    where: search
      ? {
          deletedAt: null,
          OR: [
            {
              name: {
                contains: search,
              },
            },
            {
              username: {
                contains: search,
              },
            },
            {
              email: {
                contains: search,
              },
            },
            {
              phone: {
                contains: search,
              },
            },
          ],
        }
      : {
          deletedAt: null,
        },
    include: {
      bookingsAdmin: true,
    },
    omit: {
      password: true,
      accessToken: true,
      refreshToken: true,
    },
    skip: (Number(page) - 1) * Number(perPage),
    take: Number(perPage),
  })

  const totalRecords = await db.user.count({
    where: search
      ? {
          deletedAt: null,
          OR: [
            {
              name: {
                contains: search,
              },
            },
            {
              username: {
                contains: search,
              },
            },
            {
              email: {
                contains: search,
              },
            },
            {
              phone: {
                contains: search,
              },
            },
          ],
        }
      : {
          deletedAt: null,
        },
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

const updateUser = async (
  userId: number,
  data: {
    name: string
    username: string
    email: string
    password: string
    profileImg: UploadedFile | UploadedFile[] | undefined
    phone: string
  },
) => {
  const payload = validate(userValidation.updateUserSchema, {
    name: data.name,
    username: data.username,
    email: data.email,
    password: data.password,
    profileImg: data.profileImg,
    phone: data.phone,
  })

  const body: {
    name: string
    username: string
    email: string
    password?: string
    profileImg?: string
    phone?: string
  } = {
    name: payload.name,
    username: payload.username,
    email: payload.email,
  }

  if (payload.password) {
    body.password = generateHashedPassword(payload.password)
  }

  const emailAlreadyExists = await db.user.findFirst({
    where: {
      NOT: {
        id: userId,
      },
      email: payload.email,
      deletedAt: null,
    },
  })

  if (emailAlreadyExists) {
    throw new ResponseError(400, "Email already exists")
  }

  const usernameAlreadyExists = await db.user.findFirst({
    where: {
      NOT: {
        id: userId,
      },
      deletedAt: null,
      username: payload.username,
    },
  })

  if (usernameAlreadyExists) {
    throw new ResponseError(400, "Username already exists")
  }

  if (payload.profileImg) {
    const responseStoreImage = await storeImage.uploader.upload(payload.profileImg.tempFilePath, {}, (error, result) => {
      if (error) {
        throw new Error(error.message)
      }

      return result
    })

    body.profileImg = responseStoreImage.url
  }

  if (payload.phone) {
    const phoneAlreadyExists = await db.user.findFirst({
      where: {
        NOT: {
          id: userId,
        },
        deletedAt: null,
        phone: payload.phone,
      },
    })

    if (phoneAlreadyExists) {
      throw new ResponseError(400, "Phone number already exists")
    }

    body.phone = payload.phone
  }

  const res = await db.user.update({
    where: {
      id: userId,
    },
    data: body,
  })

  return res
}

const deleteUser = async (userId: number) => {
  const user = await db.user.update({
    where: {
      id: userId,
    },
    data: {
      deletedAt: new Date(),
    },
  })

  return user
}

export default {
  createUser,
  getUsers,
  getUser,
  getUsersPagination,
  updateUser,
  deleteUser,
}
