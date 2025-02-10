import { User } from "@/shared/types"
import { NextFunction, Request, Response } from "express"
import passport from "passport"
import { generateAccessToken } from "../lib/utils"
import { ResponseError, validate } from "@/shared/lib/utils"
import authValidation from "../validations/auth.validation"
import db from "@/config/db"

const googleAuthCallback = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as { user: User }

    res.status(200).json({
      message: "OK",
      status: 200,
      data: user.user,
    })
  } catch (e) {
    next(e)
  }
}

const loginAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validate(authValidation.loginSchema, req.body)

    passport.authenticate("login", (err: any, user: User, info: any) => {
      if (err || !user) {
        const error = new ResponseError(401, info.message)
        return next(error)
      }

      req.logIn(user, { session: false }, async (err) => {
        if (err) return next(err)

        const token = generateAccessToken(user)

        await db.user.update({
          where: { id: user.id },
          data: { accessToken: token },
        })

        res.status(200).json({
          message: "OK",
          status: 200,
          data: { user, token },
        })
      })
    })(req, res, next)
  } catch (e) {
    next(e)
  }
}

const registerAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = validate(authValidation.registerSchema, req.body)
    const isUsernameAlreadyExist = await db.user.findUnique({
      where: { username: body.username },
    })

    if (isUsernameAlreadyExist) {
      throw new ResponseError(400, "Username already exist")
    }

    const isEmailAlreadyExist = await db.user.findUnique({
      where: { email: body.email },
    })

    if (isEmailAlreadyExist) {
      throw new ResponseError(400, "Email already exist")
    }

    const isPhoneAlreadyExist = await db.user.findUnique({
      where: { phone: body.phone },
    })

    if (isPhoneAlreadyExist) {
      throw new ResponseError(400, "Phone already exist")
    }

    passport.authenticate("signup", { session: false }, (err: any, user: User, info: any) => {
      if (err) {
        return next(err)
      }

      res.status(201).json({
        message: "OK",
        status: 201,
        data: user,
      })
    })(req, res, next)
  } catch (e) {
    next(e)
  }
}

export default { googleAuthCallback, loginAuth, registerAuth }
