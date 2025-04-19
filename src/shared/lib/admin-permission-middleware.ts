import { NextFunction, Request, Response } from "express"
import db from "@/config/db"

const adminPermissionMiddleware = (permissions: string[], allowNonAdminAccess: boolean = false) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as Request & { user: { id: number } }).user.id
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    })

    if (!user) {
      res
        .status(401)
        .json({
          status: 401,
          errors: "Unauthorized",
        })
        .end()
      return
    }

    if (!user?.isAdmin) {
      if (!allowNonAdminAccess) {
        res
          .status(403)
          .json({
            status: 403,
            errors: "Forbidden",
          })
          .end()
        return
      }
    } else {
      const userPermissions = user?.role?.permissions.map((permission) => permission.permission.name)

      const hasPermission = permissions.some((permission) => userPermissions?.includes(permission))

      if (!hasPermission) {
        res
          .status(403)
          .json({
            status: 403,
            errors: "Forbidden",
          })
          .end()
        return
      }
    }

    next()
  }
}

export { adminPermissionMiddleware }
