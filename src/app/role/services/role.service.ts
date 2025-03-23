import { ResponseError, validate } from "@/shared/lib/utils"
import roleValidation from "../validations/role.validation"
import db from "@/config/db"

const getRolesPagination = async (req: {
  query: {
    page?: number
    perPage?: number
    search?: string
  }
}) => {
  const { page = 1, perPage = 10, search } = req.query

  const data = await db.role.findMany({
    where: search
      ? {
          deletedAt: null,
          name: {
            contains: search,
          },
        }
      : {
          deletedAt: null,
        },
    include: {
      permissions: {
        include: {
          permission: true,
        },
      },
    },
    skip: (Number(page) - 1) * Number(perPage),
    take: Number(perPage),
  })
  const totalRecords = await db.role.count({
    where: search
      ? {
          deletedAt: null,
          name: {
            contains: search,
          },
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

const createRole = async (data: { name: string; permissions: number[] }) => {
  const payload = validate(roleValidation.createRoleSchema, data)

  const existingRole = await db.role.findFirst({
    where: { name: payload.name },
  })

  if (existingRole) {
    throw new ResponseError(400, "Role already exists")
  }

  const role = await db.role.create({
    data: {
      name: payload.name,
    },
    include: { permissions: true },
  })

  await db.rolePermission.createMany({
    data: payload.permissions.map((permission: number) => ({
      roleId: role.id,
      permissionId: permission,
    })),
  })

  const res = await db.role.findUnique({
    where: { id: role.id },
    include: {
      permissions: {
        include: {
          permission: true,
        },
      },
    },
  })

  return res
}

const updateRole = async (id: number, data: { name: string; permissions: number[] }) => {
  const payload = validate(roleValidation.updateRoleSchema, data)

  const existingRole = await db.role.findUnique({
    where: { id },
  })

  if (!existingRole) {
    throw new ResponseError(404, "Role not found")
  }

  const nameAlreadyExists = await db.role.findFirst({
    where: { name: payload.name, NOT: { id } },
  })

  if (nameAlreadyExists) {
    throw new ResponseError(400, "Role already exists")
  }

  const res = await db.role.update({
    where: { id },
    data: {
      name: payload.name,
      permissions: {
        deleteMany: {},
        createMany: {
          data: payload.permissions.map((permission: number) => ({
            permissionId: permission,
          })),
        },
      },
    },
    include: {
      permissions: {
        include: {
          permission: true,
        },
      },
    },
  })

  return res
}

const deleteRole = async (id: number) => {
  const existingRole = await db.role.findUnique({
    where: { id },
  })

  if (!existingRole) {
    throw new ResponseError(404, "Role not found")
  }

  const res = await db.role.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
    include: {
      permissions: {
        include: {
          permission: true,
        },
      },
    },
  })

  return res
}

const getRole = async (id: number) => {
  const res = await db.role.findUnique({
    where: { id, deletedAt: null },
    include: {
      permissions: {
        include: {
          permission: true,
        },
      },
    },
  })

  if (!res) {
    throw new ResponseError(404, "Role not found")
  }

  return res
}

export default { createRole, updateRole, deleteRole, getRolesPagination, getRole }
