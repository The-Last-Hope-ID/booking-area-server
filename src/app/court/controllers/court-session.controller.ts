import { NextFunction, Request, Response } from "express"
import courtSessionService from "../services/court-session.service"

const createSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courtId } = req.params
    const data = await courtSessionService.createSession(Number(courtId), req.body)

    res.status(201).json({
      status: 201,
      message: "Created",
      data,
    })
  } catch (e) {
    next(e)
  }
}

export default {
  createSession,
}
