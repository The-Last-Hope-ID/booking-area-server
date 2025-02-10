import { NextFunction, Request, Response } from "express"
import { ResponseError } from "@/shared/lib/utils"

const errorMiddleware = async (err: any, req: Request, res: Response, next: NextFunction) => {
  if (!err) {
    next()
    return
  }

  if (err instanceof ResponseError) {
    res
      .status(err.status)
      .json({
        status: err.status,
        errors: err.message,
      })
      .end()
  } else {
    res
      .status(500)
      .json({
        status: 500,
        message: "Internal Server Error",
        errors: err.message,
      })
      .end()
  }
}

export default errorMiddleware
