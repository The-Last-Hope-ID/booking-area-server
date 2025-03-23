import { NextFunction, Request, Response } from "express"
import roleService from "../services/role.service"

const getRoles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await roleService.getRolesPagination(req)

    res.status(200).json({
      message: "OK",
      status: 200,
      ...data,
    })
  } catch (e) {
    next(e)
  }
}

const getRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await roleService.getRole(Number(req.params.roleId))

    res.status(200).json({
      message: "OK",
      status: 200,
      data: data,
    })
  } catch (e) {
    next(e)
  }
}

const createRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await roleService.createRole(req.body)

    res.status(201).json({
      message: "Created",
      status: 201,
      data: data,
    })
  } catch (e) {
    next(e)
  }
}

const updateRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await roleService.updateRole(Number(req.params.roleId), req.body)

    res.status(200).json({
      message: "OK",
      status: 200,
      data: data,
    })
  } catch (e) {
    next(e)
  }
}

const deleteRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await roleService.deleteRole(Number(req.params.roleId))

    res.status(200).json({
      message: "OK",
      status: 200,
      data: data,
    })
  } catch (e) {
    next(e)
  }
}

export default { createRole, updateRole, deleteRole, getRoles, getRole }
