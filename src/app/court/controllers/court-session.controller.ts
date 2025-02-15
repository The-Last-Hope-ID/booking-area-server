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

const updateSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sessionId } = req.params
    const data = await courtSessionService.updateSession(Number(sessionId), req.body)

    res.status(200).json({
      status: 200,
      message: "OK",
      data,
    })
  } catch (e) {
    next(e)
  }
}

const deleteSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sessionId } = req.params
    const session = await courtSessionService.deleteSession(Number(sessionId))

    res.status(200).json({
      status: 200,
      message: "OK",
      data: session,
    })
  } catch (e) {
    next(e)
  }
}

export default {
  createSession,
  updateSession,
  deleteSession,
}
