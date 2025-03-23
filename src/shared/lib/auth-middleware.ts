import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get("Authorization")
    const accessToken = authHeader?.split(" ")[1] as string

    if (accessToken) {
      jwt.verify(accessToken, process.env.JWT_SECRET || "", (err: any, user: any) => {
        if (err) {
          return res.status(403).json({ message: "Unauthorized" })
        }
        req.user = user
        return next()
      })
    } else {
      res.status(403).json({ message: "Unauthorized" })
    }
  } catch (e) {
    next(e)
  }
}

export { authMiddleware }
